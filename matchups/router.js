const express = require('express');

const router = express.Router();

const matchups = {
  matchups: [
    ['New England', 'Philadelphia']
  ]
};

router.get('/', (req, res) => {
  return res.json(matchups);
});

module.exports = router;