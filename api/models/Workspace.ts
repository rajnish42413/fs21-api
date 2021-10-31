import { Model } from 'objection';
import Media from './Media';

class Listing extends Model {
  static get tableName() {
    return 'workspaces';
  }

  static get relationMappings() {
    return {
      image: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/Media.js`,
        join: {
          from: 'listings.id',
          to: 'media.entity_id',
        },
        where: {
          entity: 'workspace',
        },
      },
    };
  }
}

export default Listing;
