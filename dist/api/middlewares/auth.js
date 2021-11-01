"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("../libs/jwt");
const User_1 = require("../models/User");
exports.default = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const token = req.headers["authorization"];
        const payload = jwt.verify(token);
        const user = yield User_1.default.query().findById(payload.sub);
        req.user = user;
        return next();
    }
    catch (err) {
        res.status(401).send({
            message: "Authentication Error"
        });
    }
});
//# sourceMappingURL=auth.js.map