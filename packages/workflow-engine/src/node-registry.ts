import { WorkflowNodeExecutor } from "./node-executor";

export class NodeRegistry {
  private executors = new Map<string, WorkflowNodeExecutor>();

  register(type: string, executor: WorkflowNodeExecutor) {
    this.executors.set(type, executor);
  }

  get(type: string) {
    const executor = this.executors.get(type);

    if (!executor) {
      throw new Error(`No executor registered for node type: ${type}`);
    }

    return executor;
  }
}
