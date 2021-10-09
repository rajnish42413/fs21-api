require("dotenv").config();

const env = ["APP_NAME"].reduce((env, name) => {
    env[name] = process.env[name];
    return env;
}, {});

const withCSS = require("@zeit/next-css");
module.exports = withCSS({ env });
