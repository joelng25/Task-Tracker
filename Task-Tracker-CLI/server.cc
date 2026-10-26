#include <cstdlib>
#include <iostream>
#include <mutex>
#include <string>

#include "httplib.h"
#include "json.hpp"
#include "task_manager.h"
#include "task_id.h"

using json = nlohmann::json;

namespace {

std::string envOr(const char* name, const std::string& fallback) {
  const char* value = std::getenv(name);
  return (value && *value) ? value : fallback;
}

void sendJson(httplib::Response& res, int status, const json& body) {
  res.status = status;
  res.set_content(body.dump(2), "application/json");
}

void sendError(httplib::Response& res, int status, const std::string& message) {
  sendJson(res, status, {{"success", false}, {"error", message}});
}

bool isValidStatus(const std::string& s) {
  return s == "todo" || s == "in-progress" || s == "done";
}

}  // namespace

int main() {
  const std::string host = envOr("HOST", "localhost");
  const int port = std::stoi(envOr("PORT", "8080"));
  const std::string allowed_origin = envOr("CORS_ORIGIN", "http://localhost:3000");
  const std::string data_file = envOr("TASKS_FILE", "tasks.json");

  httplib::Server svr;
  TaskManager manager(data_file);
  // httplib handles requests on a thread pool; TaskManager is not thread-safe.
  std::mutex manager_mutex;

  // CORS headers on every response, and a single handler for preflight requests.
  svr.set_default_headers({
      {"Access-Control-Allow-Origin", allowed_origin},
      {"Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"},
      {"Access-Control-Allow-Headers", "Content-Type"},
  });
  svr.Options(R"(/api/.*)", [](const httplib::Request&, httplib::Response& res) {
    res.status = 204;
  });

  svr.Get("/", [](const httplib::Request&, httplib::Response& res) {
    sendJson(res, 200,
             {{"message", "Task Tracker API Server"},
              {"version", "1.1"},
              {"endpoints",
               {{"GET", "/api/tasks", "List all tasks (optional: ?status=todo|in-progress|done)"},
                {"POST", "/api/tasks", "Add new task (body: {\"description\": \"...\"})"},
                {"PUT", "/api/tasks/:id",
                 "Update task status (body: {\"status\": \"done|in-progress|todo\"})"},
                {"DELETE", "/api/tasks/:id", "Delete task"}}}});
  });

  svr.Get("/api/tasks", [&](const httplib::Request& req, httplib::Response& res) {
    std::lock_guard<std::mutex> lock(manager_mutex);
    std::string status = req.has_param("status") ? req.get_param_value("status") : "";

    std::vector<Task> tasks;
    if (status == "done") {
      tasks = manager.getDoneTasks();
    } else if (status == "in-progress") {
      tasks = manager.getInProgressTasks();
    } else if (status == "todo") {
      tasks = manager.getTodoTasks();
    } else {
      tasks = manager.getAllTasks();
    }

    json data = json::array();
    for (const auto& task : tasks) data.push_back(task.toJson());
    sendJson(res, 200, {{"success", true}, {"data", data}});
  });

  svr.Post("/api/tasks", [&](const httplib::Request& req, httplib::Response& res) {
    json body = json::parse(req.body, nullptr, false);
    if (body.is_discarded() || !body.contains("description") || !body["description"].is_string()) {
      return sendError(res, 400, "Body must be JSON with a \"description\" string");
    }
    std::string description = body["description"];
    if (description.find_first_not_of(" \t\n") == std::string::npos) {
      return sendError(res, 400, "Description cannot be empty");
    }

    std::lock_guard<std::mutex> lock(manager_mutex);
    if (!manager.addTask(description)) {
      return sendError(res, 500, "Failed to save task");
    }
    // The new task has the highest id, so it is the last one.
    sendJson(res, 201, {{"success", true}, {"data", manager.getAllTasks().back().toJson()}});
  });

  svr.Put(R"(/api/tasks/(\d+))", [&](const httplib::Request& req, httplib::Response& res) {
    int id;
    try { id = parseTaskId(req.matches[1].str()); }
    catch (const std::invalid_argument&) { return sendError(res, 400, "Invalid task ID"); }
    json body = json::parse(req.body, nullptr, false);
    if (body.is_discarded() || !body.contains("status") || !body["status"].is_string() ||
        !isValidStatus(body["status"])) {
      return sendError(res, 400, "Body must be JSON with status: todo | in-progress | done");
    }
    std::string status = body["status"];

    std::lock_guard<std::mutex> lock(manager_mutex);
    if (!manager.findTaskById(id)) return sendError(res, 404, "Task not found");
    bool found = status == "done"          ? manager.markDone(id)
                 : status == "in-progress" ? manager.markInProgress(id)
                                           : manager.markTodo(id);
    if (!found) return sendError(res, 500, "Failed to save task");
    sendJson(res, 200, {{"success", true}, {"message", "Task updated"}});
  });

  svr.Delete(R"(/api/tasks/(\d+))", [&](const httplib::Request& req, httplib::Response& res) {
    int id;
    try { id = parseTaskId(req.matches[1].str()); }
    catch (const std::invalid_argument&) { return sendError(res, 400, "Invalid task ID"); }
    std::lock_guard<std::mutex> lock(manager_mutex);
    if (!manager.findTaskById(id)) return sendError(res, 404, "Task not found");
    if (!manager.deleteTask(id)) return sendError(res, 500, "Failed to save task");
    sendJson(res, 200, {{"success", true}, {"message", "Task deleted"}});
  });

  std::cout << "Server started on http://" << host << ":" << port
            << " (CORS origin: " << allowed_origin << ")" << std::endl;
  if (!svr.listen(host, port)) {
    std::cerr << "Could not listen on " << host << ":" << port << std::endl;
    return 1;
  }
  return 0;
}
