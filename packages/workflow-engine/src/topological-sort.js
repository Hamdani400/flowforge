"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topologicalSort = void 0;
const validator_1 = require("./validator");
const topologicalSort = (workflow) => {
    const inDegree = new Map();
    const adjacencyList = new Map();
    for (const node of workflow.nodes) {
        inDegree.set(node.id, 0);
        adjacencyList.set(node.id, []);
    }
    for (const edge of workflow.edges) {
        adjacencyList.get(edge.source)?.push(edge.target);
        inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    }
    const queue = [];
    for (const [nodeId, degree] of inDegree.entries()) {
        if (degree === 0) {
            queue.push(nodeId);
        }
    }
    const result = [];
    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);
        for (const neighbor of adjacencyList.get(current) || []) {
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    if (result.length !== workflow.nodes.length) {
        throw new validator_1.WorkflowValidationError("Workflow contains a cycle");
    }
    return result;
};
exports.topologicalSort = topologicalSort;
//# sourceMappingURL=topological-sort.js.map