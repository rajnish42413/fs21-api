"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require('objection');
const Knex = require('knex');
const database_1 = require("./configs/database");
const knex_paginate_1 = require("knex-paginate");
// Initialize knex.
const knex = Knex({
    client: "mysql2",
    connection: {
        host: database_1.default.host,
        user: database_1.default.user,
        password: database_1.default.password,
        database: database_1.default.database,
        port: database_1.default.port
    }
});
knex_paginate_1.attachPaginate();
// Give the knex instance to objection.
Model.knex(knex);
//# sourceMappingURL=db.js.map