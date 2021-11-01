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
const Pricing_1 = require("../../models/Pricing");
exports.index = (req) => __awaiter(this, void 0, void 0, function* () {
    const { listing } = req.params;
    const res = Pricing_1.default.query()
        .findById(listing)
        .withGraphFetched('[image, city, area, pricings, media, openHours]')
        .modifyGraph('media', (builder) => {
        builder.where('entity', 'listing');
    })
        .modifyGraph('openHours', (builder) => {
        builder.where('entity', 'listing');
    });
    return res;
});
exports.create = (req) => __awaiter(this, void 0, void 0, function* () {
    const { listing } = req.params;
    yield Pricing_1.default.query().insert(req.body);
    return Pricing_1.default.query().where("entity_id", listing).where("entity", "listing");
});
exports.remove = (req) => __awaiter(this, void 0, void 0, function* () {
    const { pricing, listing } = req.params;
    yield Pricing_1.default.query().deleteById(pricing);
    return Pricing_1.default.query().where("entity_id", listing).where("entity", "listing");
});
//# sourceMappingURL=pricingsController.js.map