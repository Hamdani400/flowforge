import { topologicalSort } from "./topological-sort";
import { WorkflowDefinition } from "./types";

import { NodeExecutionResult } from "./node-executor";

import { NodeRegistry } from "./node-registry";

import { exponentialBackoff, sleep } from "./retry";

import { withTimeout } from "./timeout";

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

      const maxRetries = node.retryPolicy?.maxRetries || 0;

      let attempt = 0;
      let success = false;

      while (attempt <= maxRetries && !success) {
        try {
          console.log(`Executing node ${node.id}, attempt ${attempt + 1}`);

          let execution = executor.execute(node, {
            previousResults: results,
          });

          if (node.timeoutMs) {
            execution = withTimeout(execution, node.timeoutMs);
          }

          const result = await execution;

          results[node.id] = result;

          if (!result.success) {
            throw new Error(result.error || "Execution failed");
          }

          success = true;
        } catch (error) {
          attempt++;

          if (attempt > maxRetries) {
            throw error;
          }

          const backoff = exponentialBackoff(
            node.retryPolicy?.backoffMs || 1000,
            attempt,
          );

          console.log(`Retrying node ${node.id} in ${backoff}ms`);

          await sleep(backoff);
        }
      }
    }

    return results;
  }
}
