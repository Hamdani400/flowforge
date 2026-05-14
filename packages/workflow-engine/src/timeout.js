"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTimeout = void 0;
const withTimeout = async (promise, timeoutMs) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => {
            reject(new Error(`Execution timed out after ${timeoutMs}ms`));
        }, timeoutMs)),
    ]);
};
exports.withTimeout = withTimeout;
//# sourceMappingURL=timeout.js.map