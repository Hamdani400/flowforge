"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exponentialBackoff = exports.sleep = void 0;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.sleep = sleep;
const exponentialBackoff = (baseMs, attempt) => {
    return baseMs * 2 ** attempt;
};
exports.exponentialBackoff = exponentialBackoff;
//# sourceMappingURL=retry.js.map