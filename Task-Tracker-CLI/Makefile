CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra

all: task-server

# Server target (HTTP API)
task-server: server.cc task_manager.cpp
	$(CXX) $(CXXFLAGS) -o task-server server.cc task_manager.cpp -pthread

# Keep CLI for reference
task-cli: main.cc task_manager.cpp
	$(CXX) $(CXXFLAGS) -o task-cli main.cc task_manager.cpp

run-server: task-server
	./task-server

run-tests: test
	./test_runner

test: test_task_manager.cpp task_manager.cpp
	$(CXX) $(CXXFLAGS) -o test_runner test_task_manager.cpp task_manager.cpp -lgtest -pthread

clean:
	rm -f task-server task-cli test_runner test_tasks.json

.PHONY: all task-server task-cli run-server run-tests test clean

help:
	@echo "========================================"
	@echo "    TASK TRACKER CLI - MAKE TARGETS    "
	@echo "========================================"
	@echo ""
	@echo "Targets:"
	@echo "  make task-server   Build HTTP API server"
	@echo "  make run-server    Run the server"
	@echo "  make task-cli      Build CLI (legacy)"
	@echo "  make clean         Remove generated files"
	@echo ""