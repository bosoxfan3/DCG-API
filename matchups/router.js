const express = require('express');

const router = express.Router();

const matchups = [
  ['New England', 'Philadelphia'],
  ['San Diego', 'Oakland']
];

router.get('/', (req, res) => {
  return res.json(matchups);
});

module.exports = router;