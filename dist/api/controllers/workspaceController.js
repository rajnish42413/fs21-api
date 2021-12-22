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
const Workspace_1 = require("../models/Workspace");
exports.index = (req) => __awaiter(this, void 0, void 0, function* () {
    const { city_id, area_id, capacity, location } = req.body;
    let listings = Workspace_1.default.query();
    if (city_id)
        listings.where('city_id', city_id);
    if (area_id)
        listings.where('area_id', area_id);
    if (capacity)
        listings.where('capacity', capacity);
    const res = yield listings.eager('image');
    return res;
});
exports.show = (req) => __awaiter(this, void 0, void 0, function* () {
    const { workspace } = req.params;
    let res = null;
    if (isNaN(workspace)) {
        res = Workspace_1.default.query().where('slug', workspace);
    }
    else {
        res = Workspace_1.default.query().where('id', workspace);
    }
    res = yield res.withGraphFetched('[image, city, area]');
    return res;
});
//# sourceMappingURL=workspaceController.js.map