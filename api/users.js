const express = require("express"),
  router = express.Router();

const client = require("../config/redis");

router.post("/", (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  client
    .existsAsync(email)
    .then(reply => {
      if (reply) {
        return res.json({
          status: "EXISTING_EMAIL",
          message: "Email address already exists in Remote Dictionary Server"
        });
      }
      return client.rpushAsync("emails", email);
    })
    .then(() => {
      return client.hmsetAsync(email, { email, first_name, last_name, phone });
    })
    .then(() => {
      return res.json({
        status: "OK",
        message: "User added to Remote Dictionary Server"
      });
    })
    .catch(e => {
      console.log(e);
      return res.json({
        status: "ENDPOINT_ERROR",
        message: "We are sorry, our servers are down at the moment."
      });
    });
});

router.get("/", (req, res) => {
  client
    .lrangeAsync("emails", 0, -1)
    .then(reply => {
      const promises = reply.map(email => client.hgetallAsync(email));
      Promise.all(promises).then(users =>
        res.json({ status: "OK", data: users })
      );
    })
    .catch(e => {
      console.log(e);
      return res.json({ status: "ENDPOINT_ERROR", message: e });
    });
});

router.get("/:emailAddress", (req, res) => {
  const { emailAddress } = req.params;
  client.hgetall(emailAddress, (err, reply) => {
    if (err) return console.log(err);
    res.json(reply);
  });
});

module.exports = router;
