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
const City_1 = require("../../models/City");
const Area_1 = require("../../models/Area");
const Country_1 = require("../../models/Country");
const errors_1 = require("../../errors");
const indiaCountryId = 101;
exports.cities = (req) => __awaiter(this, void 0, void 0, function* () {
    const { country } = req.params;
    let country_id = 101;
    if (country)
        country_id = country;
    const cities = yield City_1.default.query().where('country_id', country_id).joinEager('image').where('image.entity', 'city').orderBy('id');
    return cities;
});
exports.cityUpdate = (req) => __awaiter(this, void 0, void 0, function* () {
    const { city } = req.params;
    const res = yield City_1.default.query().patchAndFetchById(city, req.body);
    return res;
});
exports.storeCity = (req) => __awaiter(this, void 0, void 0, function* () {
    const res = yield City_1.default.query().insert(req.body);
    return res;
});
exports.storeArea = (req) => __awaiter(this, void 0, void 0, function* () {
    const res = yield Area_1.default.query().insert(req.body);
    return res;
});
exports.areas = (req) => __awaiter(this, void 0, void 0, function* () {
    const { city } = req.params;
    if (!city)
        throw new errors_1.ResponseError("CityId is required", 422);
    const areas = yield Area_1.default.query().where('city_id', city);
    return areas;
});
exports.countries = (req) => __awaiter(this, void 0, void 0, function* () {
    const countries = yield Country_1.default.query();
    return countries;
});
//# sourceMappingURL=locationController.js.map