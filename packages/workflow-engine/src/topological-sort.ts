import { WorkflowDefinition } from "./types";
import { WorkflowValidationError } from "./validator";

export const topologicalSort = (workflow: WorkflowDefinition): string[] => {
  const inDegree = new Map<string, number>();
  const adjacencyList = new Map<string, string[]>();

  for (const node of workflow.nodes) {
    inDegree.set(node.id, 0);
    adjacencyList.set(node.id, []);
  }

  for (const edge of workflow.edges) {
    adjacencyList.get(edge.source)?.push(edge.target);

    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  }

  const queue: string[] = [];

  for (const [nodeId, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(nodeId);
    }
  }

  const result: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;

    result.push(current);

    for (const neighbor of adjacencyList.get(current) || []) {
      inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);

      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  if (result.length !== workflow.nodes.length) {
    throw new WorkflowValidationError("Workflow contains a cycle");
  }

  return result;
};
