import { Model } from "objection";
import * as Knex from "knex";
import config from "./configs/database";
// Initialize knex.
const knex = Knex({
    client: "mysql2",
    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    }
});

// Give the knex instance to objection.
Model.knex(knex);
