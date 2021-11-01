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
const City_1 = require("../models/City");
const Area_1 = require("../models/Area");
const Country_1 = require("../models/Country");
const errors_1 = require("../errors");
const indiaCountryId = 101;
exports.cities = (req) => __awaiter(this, void 0, void 0, function* () {
    // const {country} = req.params;
    // if(!country) throw new ResponseError("CountryId is required", 422);
    const country = 101;
    const cities = yield City_1.default.query().where('country_id', country).joinEager('image').where('image.entity', 'city').orderBy('id');
    return cities;
});
exports.areas = (req) => __awaiter(this, void 0, void 0, function* () {
    const { city } = req.params;
    if (!city)
        throw new errors_1.ResponseError("CityId is required", 422);
    const areas = yield Area_1.default.query().where('city_id', city).where('status', 1);
    return areas;
});
exports.countries = (req) => __awaiter(this, void 0, void 0, function* () {
    const countries = yield Country_1.default.query().where('status', 1);
    return countries;
});
//# sourceMappingURL=locationController.js.map