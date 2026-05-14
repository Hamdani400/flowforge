export declare const sleep: (ms: number) => Promise<unknown>;
export declare const exponentialBackoff: (baseMs: number, attempt: number) => number;
