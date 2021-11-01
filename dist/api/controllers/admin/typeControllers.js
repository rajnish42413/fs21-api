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
const Type_1 = require("../../models/Type");
exports.index = (req) => __awaiter(this, void 0, void 0, function* () {
    let types = Type_1.default.query();
    const res = yield types.where('status', 1).limit(20);
    return res;
});
exports.show = (req) => __awaiter(this, void 0, void 0, function* () {
    const { listing } = req.params;
    const res = Type_1.default.query().findById(listing);
    return res;
});
exports.update = (req) => __awaiter(this, void 0, void 0, function* () {
    const { type } = req.params;
    const res = yield Type_1.default.query().patchAndFetchById(type, req.body);
    return res;
});
//# sourceMappingURL=typeControllers.js.map