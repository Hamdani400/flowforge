import {
  NodeExecutionContext,
  NodeExecutionResult,
  WorkflowNodeExecutor,
} from "../node-executor";

import { WorkflowNode } from "../types";

export class DelayExecutor implements WorkflowNodeExecutor {
  async execute(
    node: WorkflowNode,
    context: NodeExecutionContext,
  ): Promise<NodeExecutionResult> {
    const duration = Number(node.config.duration) || 1000;

    await new Promise((resolve) => setTimeout(resolve, duration));

    return {
      success: true,
      output: `Waited ${duration}ms`,
    };
  }
}
