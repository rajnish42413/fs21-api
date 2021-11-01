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
const bcrypt = require("bcrypt");
exports.default = (req) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User_1.default.query().insert({
        name: req.body.name,
        email: req.body.email,
        password: yield bcrypt.hash(req.body.password, 10),
        phone: req.body.phone,
        country_code: req.body.country_code
    });
    return user;
});
//# sourceMappingURL=registerController.js.map