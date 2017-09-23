const express = require("express"),
  router = express.Router();

const client = require("../config/redis");

router.post("/", (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  client
    .existsAsync(email)
    .then(reply => {
      if (reply) {
        throw new Error("EXISTING_EMAIL");
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
      if (e.name === "EXISTING_EMAIL") {
        return res.json({
          status: e.name,
          message: "Email address already exists in Remote Dictionary Server"
        });
      }
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
  client
    .hgetallAsync(emailAddress)
    .then(user => res.json({ status: "OK", data: user }))
    .catch(e => {
      console.log(e);
      res.json({ status: "ENDPOINT_ERROR", message: e });
    });
});

router.delete("/:emailAddress", (req, res) => {
  const { emailAddress } = req.params;
  client
    .delAsync(emailAddress)
    .then(reply => {
      if (reply) {
        return client.lremAsync("emails", 0, emailAddress);
      } else {
        return res.json({
          status: "EMAIL_NOT_FOUND",
          message:
            "No user with email was found. Therefore no user was deleted."
        });
      }
    })
    .then(reply =>
      res.json({
        status: "OK",
        message: "User was successfully deleted"
      })
    )
    .catch(e => {
      console.log(e);
      res.json({ status: "ENDPOINT_ERROR", message: e });
    });
});

module.exports = router;
