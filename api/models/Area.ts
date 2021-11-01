import { Model } from 'objection';

class Area extends Model {
  static tableName = "areas";
  public id: number;
  public name: string;
  public slug: string;
}

export default Area;
