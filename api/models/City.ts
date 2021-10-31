import { Model } from 'objection';

class City extends Model {
  static tableName = 'cities';
  public id: number;
  public name: string;
  public slug: string;

  static get relationMappings() {
    return {
      image: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/Media.js`,
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

export default City;
