import Fastify from "fastify";
import { prisma } from "./lib/prisma";

import {
  validateWorkflow,
  topologicalSort,
  WorkflowExecutor,
  NodeRegistry,
  LogExecutor,
  DelayExecutor,
} from "@flowforge/workflow-engine";

const app = Fastify({
  logger: true,
});

const registry = new NodeRegistry();

registry.register("log", new LogExecutor());

registry.register("delay", new DelayExecutor());

const executor = new WorkflowExecutor(registry);

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

app.get("/run-workflow", async () => {
  const workflow = {
    nodes: [
      {
        id: "A",
        type: "log",
        config: {
          message: "Workflow started",
        },
      },
      {
        id: "B",
        type: "delay",
        config: {
          duration: 2000,
        },
      },
      {
        id: "C",
        type: "log",
        config: {
          message: "Workflow finished",
        },
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

  const result = await executor.execute(workflow);

  return result;
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
