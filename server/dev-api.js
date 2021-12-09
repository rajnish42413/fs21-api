require("dotenv").config({
    silent: true
});
const ngrok = require('ngrok');
global.Promise = require("bluebird");

const express = require("express"),
    app = express(),
    server = require("http").Server(app),
   cors = require('cors');

const routes = require("../dist/api").default;
app.use(cors());

app.get("/",(req, res) => {
    res.send("Hello World!");
})
app.use("/api", routes(app));

const port = process.env.APP_PORT || APP_PORT;
server.listen(port, "0.0.0.0", err => {
    if (err) throw err;
    console.log("> Api is ready on http://localhost:" + port);
});