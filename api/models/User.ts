import { Model } from "objection";

class User extends Model {
  static tableName = "users";
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public password: string;
  public type:"admin"|"user"|"host";
  public status:number;
  public country_code:string;
  public country_id:number;
}
export default User;
