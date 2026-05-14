import { topologicalSort } from "./topological-sort";
import { WorkflowDefinition } from "./types";

import { NodeExecutionResult } from "./node-executor";

import { NodeRegistry } from "./node-registry";

export class WorkflowExecutor {
  constructor(private registry: NodeRegistry) {}

  async execute(workflow: WorkflowDefinition) {
    const executionOrder = topologicalSort(workflow);

    const results: Record<string, NodeExecutionResult> = {};

    for (const nodeId of executionOrder) {
      const node = workflow.nodes.find((n) => n.id === nodeId);

      if (!node) {
        throw new Error(`Node not found: ${nodeId}`);
      }

      const executor = this.registry.get(node.type);

      console.log(`Executing node ${node.id} (${node.type})`);

      const result = await executor.execute(node, {
        previousResults: results,
      });

      results[node.id] = result;

      if (!result.success) {
        throw new Error(`Node ${node.id} failed: ${result.error}`);
      }
    }

    return results;
  }
}
