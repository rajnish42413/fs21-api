import { Model } from 'objection';
import Pricing from '../models/Pricing';
import OpenHour from '../models/OpenHour';
import Media from './Media';
import Area from './Area';
import City from './City';

class Listing extends Model {
  static get tableName() {
    return 'listings';
  }

  static get relationMappings() {
    return {
      image: {
        relation: Model.HasOneRelation,
        modelClass: Media,
        join: {
          from: 'listings.id',
          to: 'media.entity_id',
        },
      },
      media: {
        relation: Model.HasManyRelation,
        modelClass: Media,
        join: {
          from: 'listings.id',
          to: 'media.entity_id',
        },
      },
      city: {
        relation: Model.HasOneRelation,
        modelClass: City,
        join: {
          from: 'cities.id',
          to: 'listings.city_id',
        },
      },
      area: {
        relation: Model.HasOneRelation,
        modelClass: Area,
        join: {
          from: 'areas.id',
          to: 'listings.id',
        },
      },
      pricings: {
        relation: Model.HasManyRelation,
        modelClass: Pricing,
        join: {
          from: 'listing_pricings.entity_id',
          to: 'listings.id',
        },
      },
      openHours: {
        relation: Model.HasManyRelation,
        modelClass: OpenHour,
        join: {
          from: 'open_hours.entity_id',
          to: 'listings.id',
        },
      },
    };
  }
}

export default Listing;
