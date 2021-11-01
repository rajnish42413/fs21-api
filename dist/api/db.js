"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Knex = require("knex");
const database_1 = require("./configs/database");
// Initialize knex.
const knex = Knex({
    client: "mysql2",
    connection: {
        host: database_1.default.host,
        user: database_1.default.user,
        password: database_1.default.password,
        database: database_1.default.database
    }
});
// Give the knex instance to objection.
objection_1.Model.knex(knex);
//# sourceMappingURL=db.js.map