import { Model } from 'objection';
import OpenHour from '../models/OpenHour';
import Media from './Media';
import Area from './Area';
import City from './City';

class Workspace extends Model {
  static get tableName() {
    return 'workspaces';
  }

  static get relationMappings() {
    return {
      image: {
        relation: Model.HasOneRelation,
        modelClass: Media,
        join: {
          from: 'workspaces.id',
          to: 'media.entity_id',
        },
      },
      media: {
        relation: Model.HasManyRelation,
        modelClass: Media,
        join: {
          from: 'workspaces.id',
          to: 'media.entity_id',
        },
      },
      city: {
        relation: Model.HasOneRelation,
        modelClass: City,
        join: {
          from: 'cities.id',
          to: 'workspaces.city_id',
        },
      },
      area: {
        relation: Model.HasOneRelation,
        modelClass: Area,
        join: {
          from: 'areas.id',
          to: 'workspaces.id',
        },
      },
      openHours: {
        relation: Model.HasManyRelation,
        modelClass: OpenHour,
        join: {
          from: 'open_hours.entity_id',
          to: 'workspaces.id',
        },
      },
    };
  }
}

export default Workspace;
