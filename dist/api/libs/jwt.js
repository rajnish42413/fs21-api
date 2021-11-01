"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const app_1 = require("../configs/app");
exports.sign = (payload) => {
    return jwt.sign(payload, app_1.default.key);
};
exports.verify = (token) => {
    return jwt.verify(token, app_1.default.key);
};
//# sourceMappingURL=jwt.js.map