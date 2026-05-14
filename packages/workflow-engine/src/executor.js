"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowExecutor = void 0;
const topological_sort_1 = require("./topological-sort");
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
exports.WorkflowExecutor = WorkflowExecutor;
//# sourceMappingURL=executor.js.map