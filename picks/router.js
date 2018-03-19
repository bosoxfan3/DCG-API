const express = require('express');
const bodyParser = require('body-parser');

const { User } = require('../users/models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.put('/:username', jsonParser, (req, res) => {
  User
    .findOneAndUpdate({username: req.params.username}, {$set: {picks: req.body}})
    .then(user => {
      return res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'});
    });
});

module.exports = router;