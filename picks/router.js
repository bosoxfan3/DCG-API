const express = require('express');
const bodyParser = require('body-parser');

const { Picks } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
  Picks.create({
    picks: req.body
  })
    .then(
      picks => {
        res.status(201).json(picks.apiRepr());
      }
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

module.exports = router;