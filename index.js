// Modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Routes
const users = require('./api/routes/users');

// Local Variables
const app = express(),
  HTTP_PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router Middleware
app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(HTTP_PORT, err => {
  if (err) return console.log(err);
  console.log(`Listening on port ${HTTP_PORT}`);
});
