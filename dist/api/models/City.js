"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Media_1 = require("./Media");
class City extends objection_1.Model {
    static get relationMappings() {
        return {
            image: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: Media_1.default,
                join: {
                    from: 'cities.id',
                    to: 'media.entity_id',
                },
                where: {
                    entity: 'city',
                },
            },
        };
    }
}
City.tableName = 'cities';
exports.default = City;
//# sourceMappingURL=City.js.map