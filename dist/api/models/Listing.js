"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Pricing_1 = require("../models/Pricing");
const OpenHour_1 = require("../models/OpenHour");
const Media_1 = require("./Media");
const Area_1 = require("./Area");
const City_1 = require("./City");
class Listing extends objection_1.Model {
    static get tableName() {
        return 'listings';
    }
    static get relationMappings() {
        return {
            image: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: Media_1.default,
                join: {
                    from: 'listings.id',
                    to: 'media.entity_id',
                },
            },
            media: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Media_1.default,
                join: {
                    from: 'listings.id',
                    to: 'media.entity_id',
                },
            },
            city: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: City_1.default,
                join: {
                    from: 'cities.id',
                    to: 'listings.city_id',
                },
            },
            area: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: Area_1.default,
                join: {
                    from: 'areas.id',
                    to: 'listings.id',
                },
            },
            pricings: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Pricing_1.default,
                join: {
                    from: 'listing_pricings.entity_id',
                    to: 'listings.id',
                },
            },
            openHours: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: OpenHour_1.default,
                join: {
                    from: 'open_hours.entity_id',
                    to: 'listings.id',
                },
            },
        };
    }
}
exports.default = Listing;
//# sourceMappingURL=Listing.js.map