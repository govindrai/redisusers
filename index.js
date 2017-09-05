// Modules
const path = require("path"),
  express = require("express"),
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

http.createServer(app).listen(HTTP_PORT, err => console.log(err));
https.createServer(httpsOptions, app).listen(HTTPS_PORT);
