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
const City_1 = require("../../models/City");
exports.index = (req) => __awaiter(this, void 0, void 0, function* () {
    const country = 101;
    const types = yield Type_1.default.query().select('id', 'name').orderBy('id');
    const cities = yield City_1.default.query().select('id', 'name').where('country_id', country).orderBy('id');
    const data = {
        "status": true,
        "data": {
            "cities": cities,
            "types": types,
        }
    };
    return data;
});
//# sourceMappingURL=homeController.js.map