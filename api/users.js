const express = require("express"),
  router = express.Router();

const client = require("../config/redis");

router.post("/", (req, res) => {
  console.log("MADE A POST TO USERS");
  const { first_name, last_name, email, phone } = req.body;
  client.rpush("emails", email, (err, reply) => {
    if (err) return console.log(err);
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
        if (err) return console.log(err);
        res.redirect("/");
      }
    );
  });
});

router.get("/", (req, res) => {
  client.get("emails", (err, reply) => {
    if (err) return console.log(err);
    if (reply) {
      Promise.all(
        reply.map(email => {
          return client.hgetall(email, (err, reply) => {
            if (err) return console.log(err);
            return reply;
          });
        })
      ).then(replies => res.send(replies));
    } else {
      res.send([reply, "reply is null"]);
    }
  });
});

router.get("/:user_id", (req, res) => {
  res.send("MADE A GET TO USERS SHOW");
});

module.exports = router;
