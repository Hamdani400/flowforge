import { NodeExecutionContext, NodeExecutionResult, WorkflowNodeExecutor } from "../node-executor";
import { WorkflowNode } from "../types";
export declare class DelayExecutor implements WorkflowNodeExecutor {
    execute(node: WorkflowNode, context: NodeExecutionContext): Promise<NodeExecutionResult>;
}
