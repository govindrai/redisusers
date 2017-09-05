const express = require("express"),
  router = express.Router();

const client = require("../config/redis");

router.post("/", (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  client.rpush("emails", email, (err, reply) => {
    if (err) {
      console.log("error on rpush", err);
      return res.send(["ERROR on rpush", err]);
    }
    client.hmset(
      email,
      "first_name",
      first_name,
      "last_name",
      last_name,
      "email",
      email,
      "phone",
      phone,
      (err, reply) => {
        if (err) {
          console.log(err);
          return res.send(["error on hmset", err]);
        }
        return res.send(reply);
      }
    );
  });
});

router.get("/test", (req, res) => {
  client.hgetall("raigovind93@gmail.com", (err, reply) => {
    res.send([reply, reply.toString()]);
  });
});

router.get("/", (req, res) => {
  client.lrange("emails", 0, 1, (err, reply) => {
    if (err) return console.log(err);
    if (reply) {
      Promise.all(
        reply.map(email => {
          return new Promise((resolve, reject) => {
            client.hgetall(email, (err, reply) => {
              if (err) return reject(console.log(err));
              resolve(reply);
            });
          });
        })
      )
        .then(replies => {
          res.send(replies);
        })
        .catch(e => console.log(e));
    } else {
      res.send([reply, "reply is null"]);
    }
  });
});

router.get("/:user_id", (req, res) => {
  res.send("MADE A GET TO USERS SHOW");
});

module.exports = router;
