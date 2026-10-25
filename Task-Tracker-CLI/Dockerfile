FROM gcc:14 AS build
WORKDIR /src
COPY . .
RUN make task-server

FROM debian:bookworm-slim
WORKDIR /app
COPY --from=build /src/task-server /app/task-server
ENV HOST=0.0.0.0 \
    PORT=8080 \
    TASKS_FILE=/data/tasks.json
VOLUME /data
EXPOSE 8080
CMD ["/app/task-server"]
