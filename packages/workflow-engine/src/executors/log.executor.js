"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogExecutor = void 0;
class LogExecutor {
    async execute(node, context) {
        console.log("LOG NODE:", node.config.message);
        return {
            success: true,
            output: node.config.message,
        };
    }
}
exports.LogExecutor = LogExecutor;
//# sourceMappingURL=log.executor.js.map