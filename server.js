require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

const usersRouter = require('./users/router');
const authRouter = require('./auth/router');
const matchupsRouter = require('./matchups/router');
const picksRouter = require('./picks/router');
const { basicStrategy, jwtStrategy } = require('./auth/strategies');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
//

app.use(passport.initialize());
passport.use(basicStrategy);
passport.use(jwtStrategy);

//just so that the test server file works. delete later
app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

app.use('/users/', usersRouter);
app.use('/auth/', authRouter);
app.use('/matchups', matchupsRouter);
app.use('/picks', picksRouter);

app.use('*', (req, res) => {
  return res.status(404).json({message: 'Not found'});
});

let server;

function runServer(database_url=DATABASE_URL) {
  return new Promise((resolve, reject) => {
    mongoose.connect(database_url, {useMongoClient: true}, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};