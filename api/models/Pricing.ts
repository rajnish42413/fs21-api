import { Model } from "objection";

class Pricing extends Model {
  static tableName = "listing_pricings";
  public id: number;
  public entity: string;
  public entity_id: number;
  public amount:number;
  public interval:string;
  public min:number;
  public max:number;
  public status:number;
}

export default Pricing;
