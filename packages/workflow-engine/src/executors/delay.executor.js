"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayExecutor = void 0;
class DelayExecutor {
    async execute(node, context) {
        const duration = Number(node.config.duration) || 1000;
        await new Promise((resolve) => setTimeout(resolve, duration));
        return {
            success: true,
            output: `Waited ${duration}ms`,
        };
    }
}
exports.DelayExecutor = DelayExecutor;
//# sourceMappingURL=delay.executor.js.map