"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWorkflow = exports.WorkflowValidationError = void 0;
class WorkflowValidationError extends Error {
}
exports.WorkflowValidationError = WorkflowValidationError;
const validateWorkflow = (workflow) => {
    const nodeIds = new Set(workflow.nodes.map((node) => node.id));
    for (const edge of workflow.edges) {
        if (!nodeIds.has(edge.source)) {
            throw new WorkflowValidationError(`Missing source node: ${edge.source}`);
        }
        if (!nodeIds.has(edge.target)) {
            throw new WorkflowValidationError(`Missing target node: ${edge.target}`);
        }
    }
};
exports.validateWorkflow = validateWorkflow;
//# sourceMappingURL=validator.js.map