redis = require("redis");
client = redis.createClient();

// Redis connection status methods
client.on("error", function(err) {
  console.log("Error " + err);
});

client.on("connect", function() {
  console.log("connected!");
});

module.exports = client;
