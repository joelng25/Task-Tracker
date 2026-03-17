#include <iostream>

#include "httplib.h"
#include "json.hpp"
#include "task_manager.h"

using json = nlohmann::json;

int main() {
  httplib::Server svr;
  TaskManager manager("tasks.json");

  // Handle preflight requests
  svr.Options("/api/tasks", [](const httplib::Request&, httplib::Response& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.set_header("Access-Control-Allow-Headers", "Content-Type");
    res.status = 200;
    return true;
  });

  // Handle preflight requests for /api/tasks/:id
  svr.Options("/api/tasks/(\\d+)", [](const httplib::Request&, httplib::Response& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.set_header("Access-Control-Allow-Headers", "Content-Type");
    res.status = 200;
    return true;
  });

  // GET /api/tasks - List all tasks (with optional status filter)
  svr.Get("/api/tasks", [&manager](const httplib::Request& req, httplib::Response& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Content-Type", "application/json");

    std::vector<Task> tasks;

    if (req.has_param("status")) {
      std::string status = req.get_param_value("status");
      if (status == "done") {
        tasks = manager.getDoneTasks();
      } else if (status == "in-progress") {
        tasks = manager.getInProgressTasks();
      } else if (status == "todo") {
        tasks = manager.getTodoTasks();
      } else {
        tasks = manager.getAllTasks();
      }
    } else {
      tasks = manager.getAllTasks();
    }

    json response;
    response["success"] = true;
    response["data"] = json::array();

    for (const auto& task : tasks) {
      response["data"].push_back(task.toJson());
    }

    res.set_content(response.dump(2), "application/json");
    res.status = 200;
  });

  // GET / - Welcome page
  svr.Get("/", [](const httplib::Request&, httplib::Response& res) {
    res.set_header("Content-Type", "application/json");
    json welcome;
    welcome["message"] = "Task Tracker API Server";
    welcome["version"] = "1.0";
    welcome["endpoints"] = {
        {"GET", "/api/tasks", "List all tasks (optional: ?status=todo|in-progress|done)"},
        {"POST", "/api/tasks", "Add new task (body: {\"description\": \"...\"})"},
        {"PUT", "/api/tasks/:id",
         "Update task status (body: {\"status\": \"done|in-progress|todo\"})"},
        {"DELETE", "/api/tasks/:id", "Delete task"}};
    res.set_content(welcome.dump(2), "application/json");
  });

  // POST /api/tasks - Add new task
  svr.Post("/api/tasks", [&manager](const httplib::Request& req, httplib::Response& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Content-Type", "application/json");

    try {
      auto body = json::parse(req.body);
      std::string description = body["description"];

      bool success = manager.addTask(description);

      if (!success) {
        json error;
        error["success"] = false;
        error["error"] = "Failed to add task";
        res.set_content(error.dump(2), "application/json");
        res.status = 400;
        return;
      }

      // Get the newly added task (it's the last one with max ID)
      std::vector<Task> allTasks = manager.getAllTasks();
      Task newTask = allTasks.back();

      json response;
      response["success"] = true;
      response["data"] = newTask.toJson();

      res.set_content(response.dump(2), "application/json");
      res.status = 201;
    } catch (const std::exception& e) {
      json error;
      error["success"] = false;
      error["error"] = e.what();
      res.set_content(error.dump(2), "application/json");
      res.status = 400;
    }
  });

  // PUT /api/tasks/:id - Update task status
  svr.Put("/api/tasks/(\\d+)", [&manager](const httplib::Request& req, httplib::Response& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Content-Type", "application/json");

    try {
      int id = std::stoi(req.matches[1]);
      auto body = json::parse(req.body);
      std::string newStatus = body["status"];

      bool success = false;
      if (newStatus == "done") {
        success = manager.markDone(id);
      } else if (newStatus == "in-progress") {
        success = manager.markInProgress(id);
      } else if (newStatus == "todo") {
        // No direct method for todo, update with updateTask
        Task* task = manager.findTaskById(id);
        if (task) {
          task->status = "todo";
          success = true;
        }
      }

      if (!success) {
        json error;
        error["success"] = false;
        error["error"] = "Task not found or status update failed";
        res.set_content(error.dump(2), "application/json");
        res.status = 404;
        return;
      }

      json response;
      response["success"] = true;
      response["message"] = "Task updated";

      res.set_content(response.dump(2), "application/json");
      res.status = 200;
    } catch (const std::exception& e) {
      json error;
      error["success"] = false;
      error["error"] = e.what();
      res.set_content(error.dump(2), "application/json");
      res.status = 400;
    }
  });

  // DELETE /api/tasks/:id - Delete task
  svr.Delete("/api/tasks/(\\d+)", [&manager](const httplib::Request& req, httplib::Response& res) {
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Content-Type", "application/json");

    try {
      int id = std::stoi(req.matches[1]);
      bool success = manager.deleteTask(id);

      if (!success) {
        json error;
        error["success"] = false;
        error["error"] = "Task not found";
        res.set_content(error.dump(2), "application/json");
        res.status = 404;
        return;
      }

      json response;
      response["success"] = true;
      response["message"] = "Task deleted";

      res.set_content(response.dump(2), "application/json");
      res.status = 200;
    } catch (const std::exception& e) {
      json error;
      error["success"] = false;
      error["error"] = e.what();
      res.set_content(error.dump(2), "application/json");
      res.status = 400;
    }
  });

  std::cout << "Server started on http://localhost:8080" << std::endl;
  svr.listen("localhost", 8080);

  return 0;
}