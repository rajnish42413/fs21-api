import { Model } from "objection";

class User extends Model {
  static tableName = "users";
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public organization_id: number;

  static relationMappings = {
    organization: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/Organization`,
      join: {
        from: "users.organization_id",
        to: "organizations.id"
      }
    },

    documents: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/UserDocument`,
      join: {
        from: "users.id",
        to: "user_documents.user_id"
      }
    },

    member: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/Member`,
      join: {
        from: "users.id",
        to: "members.user_id"
      }
    },

    customer: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/Customer`,
      join: {
        from: "users.id",
        to: "customers.user_id"
      }
    },

    orders: {
      relation: Model.HasOneRelation,
      modelClass: `${__dirname}/Order`,
      join: {
        from: "users.id",
        to: "orders.user_id"
      }
    }
  };
}
export default User;
