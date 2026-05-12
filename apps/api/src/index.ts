import Fastify from "fastify";
import { prisma } from "./lib/prisma";

import { validateWorkflow, topologicalSort } from "@flowforge/workflow-engine";

const app = Fastify({
  logger: true,
});

app.get("/health", async () => {
  await prisma.$queryRaw`SELECT 1`;

  return {
    status: "ok",
    database: "connected",
  };
});

app.get("/test-workflow", async () => {
  const workflow = {
    nodes: [
      {
        id: "A",
        type: "http",
        config: {},
      },
      {
        id: "B",
        type: "delay",
        config: {},
      },
      {
        id: "C",
        type: "log",
        config: {},
      },
    ],
    edges: [
      {
        source: "A",
        target: "B",
      },
      {
        source: "B",
        target: "C",
      },
    ],
  };

  validateWorkflow(workflow);

  const order = topologicalSort(workflow);

  return {
    executionOrder: order,
  };
});

const start = async () => {
  try {
    await app.listen({
      port: 3001,
      host: "0.0.0.0",
    });

    console.log("API running on port 3001");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
