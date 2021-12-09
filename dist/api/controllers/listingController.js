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
const Listing_1 = require("../models/Listing");
const Area_1 = require("../models/Area");
const City_1 = require("../models/City");
exports.index = (req) => __awaiter(this, void 0, void 0, function* () {
    const { city_id, area_id, capacity, location, q, type_id, currentPage, pageSize } = req.query;
    let listings = Listing_1.default.query();
    let page_size = pageSize || 10;
    let current_page = currentPage || 0;
    if (city_id)
        listings.where('city_id', city_id);
    if (area_id)
        listings.where('area_id', area_id);
    if (capacity)
        listings.where('capacity', capacity);
    if (type_id)
        listings.where('type_id', type_id);
    if (q) {
        const item = q.split(',');
        if (item.length) {
            if (item.lenght > 2) {
                const area = yield Area_1.default.query()
                    .where('name', 'like', `%${item[0]}%`)
                    .first();
                if (!area) {
                    const min_lenght = item.lenght > 2 ? 2 : 0;
                    const city = yield City_1.default.query()
                        .where('name', 'like', `%${item[item.lenght - min_lenght]}%`)
                        .first();
                    if (city) {
                        listings.where('city_id', yield city.id);
                    }
                }
                if (area) {
                    listings.where('area_id', yield area.id);
                }
            }
            else {
                const city = yield City_1.default.query()
                    .where('name', 'like', `%${item[0]}%`)
                    .first();
                if (city) {
                    listings.where('city_id', yield city.id);
                }
            }
        }
    }
    const res = yield listings
        .withGraphFetched('[image, city, area]')
        .modifyGraph('image', (builder) => {
        builder.where('entity', 'listing');
    })
        .orderBy('scores', 'DESC')
        .page(current_page, page_size);
    return res;
});
exports.show = (req) => __awaiter(this, void 0, void 0, function* () {
    const { listing } = req.params;
    const res = Listing_1.default.query()
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
//# sourceMappingURL=listingController.js.map