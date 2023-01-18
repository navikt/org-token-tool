import type { Express } from "express";

export function setupActuators(server: Express) {
  server.get("/internal/health/liveness", (request, response) => {
    response.send({
      status: "UP",
    });
  });
  console.log("Liveness available on /internal/health/liveness");

  server.get("/internal/health/readiness", (request, response) => {
    response.send({
      status: "UP",
    });
  });
  console.log("Readiness available on /internal/health/readiness");
}
