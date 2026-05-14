import { WorkflowDefinition } from "./types";
import { NodeExecutionResult } from "./node-executor";
import { NodeRegistry } from "./node-registry";
export declare class WorkflowExecutor {
    private registry;
    constructor(registry: NodeRegistry);
    execute(workflow: WorkflowDefinition): Promise<Record<string, NodeExecutionResult>>;
}
