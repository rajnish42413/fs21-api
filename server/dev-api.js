require("dotenv").config({
    silent: true
});
const ngrok = require('ngrok');
global.Promise = require("bluebird");

const express = require("express"),
    app = express(),
    server = require("http").Server(app),
    io = require("socket.io")(server);

const routes = require("../dist/api").default;
app.use("/api", routes(app));


const port = process.env.PORT || 5000;
server.listen(port, "0.0.0.0", err => {
    if (err) throw err;
    console.log("> Api is ready on http://localhost:" + 3000);
});
