import { WorkflowDefinition } from "./types";
export declare class WorkflowValidationError extends Error {
}
export declare const validateWorkflow: (workflow: WorkflowDefinition) => void;
