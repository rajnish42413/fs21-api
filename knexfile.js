// Update with your config settings.
require("dotenv").config();
const config = require("./dist/api/configs/database").default;
module.exports = {
    client: "mysql2",
    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    },
    seeds: {
        directory: "./migrations/seeds"
    },
    migrations: {
        tableName: 'migrations'
    }
};
