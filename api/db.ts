const { Model } = require('objection');
const Knex = require('knex');
import config from "./configs/database";
import { attachPaginate } from 'knex-paginate';

// Initialize knex.
const knex = Knex({
    client: "mysql2",
    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port
    }
});

attachPaginate();
// Give the knex instance to objection.
Model.knex(knex);
