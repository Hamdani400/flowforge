import {
  NodeExecutionContext,
  NodeExecutionResult,
  WorkflowNodeExecutor,
} from "../node-executor";

import { WorkflowNode } from "../types";

export class LogExecutor implements WorkflowNodeExecutor {
  async execute(
    node: WorkflowNode,
    context: NodeExecutionContext,
  ): Promise<NodeExecutionResult> {
    console.log("LOG NODE:", node.config.message);

    return {
      success: true,
      output: node.config.message,
    };
  }
}
