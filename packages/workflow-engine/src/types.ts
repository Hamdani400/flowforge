export type WorkflowNodeType = "http" | "delay" | "condition" | "log";

export interface RetryPolicy {
  maxRetries: number;
  backoffMs: number;
}

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;

  retryPolicy?: RetryPolicy;

  timeoutMs?: number;

  config: Record<string, unknown>;
}

export interface WorkflowEdge {
  source: string;
  target: string;
}

export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}
