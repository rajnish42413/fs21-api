import { Model } from "objection";

class Type extends Model {
  static tableName = "types";
  public id: number;
  public name: string;
  public slug: string;
  public status:number;
}
export default Type;
