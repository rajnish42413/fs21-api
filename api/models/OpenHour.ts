import { Model } from "objection";

class OpenHour extends Model {
  static tableName = "open_hours";
  public id: number;
  public entity: string;
  public entity_id: number;
  public close_at: string;
  public open_at: string;
  public is_open: boolean;
}

export default OpenHour;
