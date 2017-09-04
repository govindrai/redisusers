// Modules
const express = require("express"),
  https = require("https"),
  http = require("http"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");

// Routes
const users = require("./api/users");

// Local Variables
const app = express(),
  HTTP_PORT = process.env.PORT || 8000,
  HTTPS_PORT = process.env.PORT || 9000,
  httpsOptions = {};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/api/users", users);

app.all((req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile("client/public/bundle.js");
  }
});

http.createServer(app).listen(HTTP_PORT, err => console.log(err));
https.createServer(httpsOptions, app).listen(HTTPS_PORT);
