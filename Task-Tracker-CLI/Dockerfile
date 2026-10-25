FROM gcc:14 AS build
WORKDIR /src
COPY . .
# Link the C++ runtime statically: the gcc:14 libstdc++ is newer than the one in debian slim.
RUN make task-server CXXFLAGS="-std=c++17 -O2 -Wall -Wextra -static-libstdc++ -static-libgcc"

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=build /src/task-server /app/task-server
ENV HOST=0.0.0.0 \
    PORT=8080 \
    TASKS_FILE=/data/tasks.json
VOLUME /data
EXPOSE 8080
CMD ["/app/task-server"]
