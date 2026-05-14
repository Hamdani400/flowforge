export type WorkflowNodeType = "http" | "delay" | "condition" | "log";
export interface WorkflowNode {
    id: string;
    type: WorkflowNodeType;
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
