import { WorkflowDefinition } from "./types";

export class WorkflowValidationError extends Error {}

export const validateWorkflow = (workflow: WorkflowDefinition) => {
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
