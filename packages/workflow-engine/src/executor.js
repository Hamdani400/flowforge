"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowExecutor = void 0;
const topological_sort_1 = require("./topological-sort");
const retry_1 = require("./retry");
const timeout_1 = require("./timeout");
class WorkflowExecutor {
    registry;
    constructor(registry) {
        this.registry = registry;
    }
    async execute(workflow) {
        const executionOrder = (0, topological_sort_1.topologicalSort)(workflow);
        const results = {};
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
                        execution = (0, timeout_1.withTimeout)(execution, node.timeoutMs);
                    }
                    const result = await execution;
                    results[node.id] = result;
                    if (!result.success) {
                        throw new Error(result.error || "Execution failed");
                    }
                    success = true;
                }
                catch (error) {
                    attempt++;
                    if (attempt > maxRetries) {
                        throw error;
                    }
                    const backoff = (0, retry_1.exponentialBackoff)(node.retryPolicy?.backoffMs || 1000, attempt);
                    console.log(`Retrying node ${node.id} in ${backoff}ms`);
                    await (0, retry_1.sleep)(backoff);
                }
            }
        }
        return results;
    }
}
exports.WorkflowExecutor = WorkflowExecutor;
//# sourceMappingURL=executor.js.map