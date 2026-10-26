#include <gtest/gtest.h>
#include <filesystem>
#include "task_manager.h"
TEST(PersistenceFailure, FailedSaveRollsBackAllMutations) {
  const std::string path = "persistence_failure_test.json";
  std::filesystem::remove_all(path);
  TaskManager tm(path);
  ASSERT_TRUE(tm.addTask("Keep me"));
  std::filesystem::remove(path);
  std::filesystem::create_directory(path);
  EXPECT_FALSE(tm.addTask("Cannot save"));
  EXPECT_FALSE(tm.updateTask(1, "changed"));
  EXPECT_FALSE(tm.markDone(1));
  EXPECT_FALSE(tm.markInProgress(1));
  EXPECT_FALSE(tm.markTodo(1));
  EXPECT_FALSE(tm.deleteTask(1));
  auto tasks = tm.getAllTasks();
  ASSERT_EQ(tasks.size(), 1u);
  EXPECT_EQ(tasks[0].desc, "Keep me");
  EXPECT_EQ(tasks[0].status, "todo");
  std::filesystem::remove_all(path);
}
