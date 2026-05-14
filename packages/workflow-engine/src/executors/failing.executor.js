"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailingExecutor = void 0;
class FailingExecutor {
    async execute(node, context) {
        throw new Error("Simulated node failure");
    }
}
exports.FailingExecutor = FailingExecutor;
//# sourceMappingURL=failing.executor.js.map