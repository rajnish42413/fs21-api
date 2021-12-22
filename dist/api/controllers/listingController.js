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
const Type_1 = require("../models/Type");
const errors_1 = require("../errors");
exports.index = (req) => __awaiter(this, void 0, void 0, function* () {
    const { city_id, area_id, capacity, location, q, type_id, currentPage, pageSize, } = req.query;
    let listings = Listing_1.default.query();
    let page_size = pageSize || 10;
    let current_page = currentPage || 0;
    let area, city, type;
    if (city_id) {
        listings.where('city_id', city_id);
        city = yield City_1.default.query()
            .select('id', 'slug', 'name')
            .findById(city_id);
    }
    if (area_id) {
        listings.where('area_id', area_id);
        area = yield Area_1.default.query()
            .select('id', 'slug', 'name')
            .findById(area_id);
    }
    if (type_id) {
        listings.where('type_id', type_id);
        type = yield Type_1.default.query()
            .select('id', 'slug', 'name')
            .findById(type_id);
    }
    if (capacity)
        listings.where('capacity', capacity);
    if (q) {
        const item = q.split(',');
        if (item.length) {
            if (item.lenght > 2) {
                area = yield Area_1.default.query()
                    .where('name', 'like', `%${item[0]}%`)
                    .first();
                if (!area) {
                    const min_lenght = item.lenght > 2 ? 2 : 0;
                    city = yield City_1.default.query()
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
                city = yield City_1.default.query()
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
    const data = { listings: res, area, city, type };
    return {
        status: true,
        data: data,
    };
});
exports.show = (req) => __awaiter(this, void 0, void 0, function* () {
    const { listing } = req.params;
    let res = null;
    if (isNaN(listing)) {
        res = Listing_1.default.query().where('slug', listing);
    }
    else {
        res = Listing_1.default.query().where('id', listing);
    }
    res
        .withGraphFetched('[image, city, area, pricings, media, openHours]')
        .modifyGraph('media', (builder) => {
        builder.where('entity', 'listing');
    })
        .modifyGraph('openHours', (builder) => {
        builder.where('entity', 'listing');
    });
    res = yield res;
    if (!res) {
        throw new errors_1.ValidationError('Listing not found');
    }
    return res;
});
exports.showCityListings = (req) => __awaiter(this, void 0, void 0, function* () {
    const { city } = req.params;
    if (!city)
        return;
    const cityDetail = yield City_1.default.query()
        .select('id', 'slug', 'name')
        .findById(city);
    const { area_id, capacity, type_id, currentPage, pageSize } = req.query;
    let listings = Listing_1.default.query().where('city_id', city);
    let page_size = pageSize || 10;
    let current_page = currentPage || 0;
    let area, type;
    if (type_id) {
        listings.where('type_id', type_id);
        type = yield Type_1.default.query()
            .select('id', 'slug', 'name')
            .findById(type_id);
    }
    if (area_id) {
        listings.where('area_id', area_id);
        area = yield Area_1.default.query()
            .select('id', 'slug', 'name')
            .findById(area_id);
    }
    if (capacity)
        listings.where('capacity', capacity);
    const res = yield listings
        .withGraphFetched('[image, city, area]')
        .modifyGraph('image', (builder) => {
        builder.where('entity', 'listing');
    })
        .orderBy('scores', 'DESC')
        .page(current_page, page_size);
    const data = { listings: res, area, city: cityDetail, type };
    return {
        status: true,
        data: data,
    };
});
//# sourceMappingURL=listingController.js.map