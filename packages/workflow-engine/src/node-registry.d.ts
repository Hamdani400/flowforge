import { WorkflowNodeExecutor } from "./node-executor";
export declare class NodeRegistry {
    private executors;
    register(type: string, executor: WorkflowNodeExecutor): void;
    get(type: string): WorkflowNodeExecutor;
}
