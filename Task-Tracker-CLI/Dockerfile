# Build and run on the same Debian release so the C/C++ runtime versions match.
FROM debian:trixie-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends g++ make \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /src
COPY . .
RUN make task-server

FROM debian:trixie-slim
WORKDIR /app
COPY --from=build /src/task-server /app/task-server
ENV HOST=0.0.0.0 \
    PORT=8080 \
    TASKS_FILE=/data/tasks.json
VOLUME /data
EXPOSE 8080
CMD ["/app/task-server"]
