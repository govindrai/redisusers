redis = require("redis");
bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

// Redis connection status methods
client.on("error", function(err) {
  console.log("Error encountered connecting to Redis: " + err);
});

client.on("connect", function() {
  console.log("Connected to Redis!");
});

module.exports = client;
