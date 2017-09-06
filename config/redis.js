redis = require("redis");
bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client = redis.createClient();

// Redis connection status methods
client.on("error", function(err) {
  console.log("Error " + err);
});

client.on("connect", function() {
  console.log("connected!");
});

module.exports = client;
