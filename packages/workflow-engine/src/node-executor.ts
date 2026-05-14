import { WorkflowNode } from "./types";

export interface NodeExecutionContext {
  previousResults: Record<string, unknown>;
}

export interface NodeExecutionResult {
  success: boolean;
  output?: unknown;
  error?: string;
}

export interface WorkflowNodeExecutor {
  execute(
    node: WorkflowNode,
    context: NodeExecutionContext,
  ): Promise<NodeExecutionResult>;
}
