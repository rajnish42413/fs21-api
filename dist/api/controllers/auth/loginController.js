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
const User_1 = require("../../models/User");
const jwt = require("../../libs/jwt");
const bcrypt = require("bcrypt");
const errors_1 = require("../../errors");
exports.default = (req) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    let type = req.body.type;
    if (!type)
        type = 'user';
    if (!email || !password) {
        throw new errors_1.ResponseError('Enail and password is required', 422);
    }
    const user = yield User_1.default.query().where('email', email).first();
    if (!user) {
        throw new errors_1.ResponseError('Invalid credential', 422);
    }
    if (type !== user.type) {
        throw new errors_1.ResponseError('Access Denied!', 422);
    }
    if (!(yield bcrypt.compare(password, user.password))) {
        throw new errors_1.ResponseError('Invalid credential', 422);
    }
    const token = jwt.sign({
        iat: new Date().getTime(),
        sub: user.id,
    });
    return {
        user,
        token,
    };
});
//# sourceMappingURL=loginController.js.map