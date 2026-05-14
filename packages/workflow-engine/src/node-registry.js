"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRegistry = void 0;
class NodeRegistry {
    executors = new Map();
    register(type, executor) {
        this.executors.set(type, executor);
    }
    get(type) {
        const executor = this.executors.get(type);
        if (!executor) {
            throw new Error(`No executor registered for node type: ${type}`);
        }
        return executor;
    }
}
exports.NodeRegistry = NodeRegistry;
//# sourceMappingURL=node-registry.js.map