"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const OpenHour_1 = require("../models/OpenHour");
const Media_1 = require("./Media");
const Area_1 = require("./Area");
const City_1 = require("./City");
class Workspace extends objection_1.Model {
    static get tableName() {
        return 'workspaces';
    }
    static get relationMappings() {
        return {
            image: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: Media_1.default,
                join: {
                    from: 'workspaces.id',
                    to: 'media.entity_id',
                },
            },
            media: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Media_1.default,
                join: {
                    from: 'workspaces.id',
                    to: 'media.entity_id',
                },
            },
            city: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: City_1.default,
                join: {
                    from: 'cities.id',
                    to: 'workspaces.city_id',
                },
            },
            area: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: Area_1.default,
                join: {
                    from: 'areas.id',
                    to: 'workspaces.id',
                },
            },
            openHours: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: OpenHour_1.default,
                join: {
                    from: 'open_hours.entity_id',
                    to: 'workspaces.id',
                },
            },
        };
    }
}
exports.default = Workspace;
//# sourceMappingURL=Workspace.js.map