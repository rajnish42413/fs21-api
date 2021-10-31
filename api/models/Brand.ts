import { Model } from "objection";

class Brand extends Model {
  static tableName = "brands";
  public id: number;
  public name: string;
  public slug: string;
  public status:number;
}
export default Brand;
