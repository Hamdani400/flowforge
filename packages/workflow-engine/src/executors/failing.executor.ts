import {
  NodeExecutionContext,
  NodeExecutionResult,
  WorkflowNodeExecutor,
} from "../node-executor";

import { WorkflowNode } from "../types";

export class FailingExecutor implements WorkflowNodeExecutor {
  async execute(
    node: WorkflowNode,
    context: NodeExecutionContext,
  ): Promise<NodeExecutionResult> {
    throw new Error("Simulated node failure");
  }
}
