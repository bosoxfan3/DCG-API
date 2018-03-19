const express = require('express');
const bodyParser = require('body-parser');

const { User } = require('../users/models');

const router = express.Router();

const jsonParser = bodyParser.json();

const answerKey = [
  'New York (NFC)',
  'New England',
  'Minnesota',
  'Detroit',
  'Indianapolis',
  'Pittsburgh',
  'Dallas',
  'San Francisco',
  'Los Angeles (AFC)',
  'Kansas City',
  'Tennessee',
  'Tampa Bay',
  'Buffalo',
  'Arizona',
  'Atlanta',
  'Cincinnati'
];

function updateUser(user) {
  let picksArray = [];
  for (let key in user.picks) {
    picksArray.push(user.picks[key]);
  }
  for (let i=0; i<picksArray.length; i++) {
    let currentPick = picksArray[i];
    if (currentPick === answerKey[i]) {
      user.points += 1;
    }
  }
  return user.save();
}

router.get('/', jsonParser, (req, res) => {
  User.find({})
    .then(users => users.map(user => updateUser(user)))
    .then(promiseArr => {
      Promise.all()
        .then(updatedUsers => res.json(updatedUsers.map(user => user.apiRepr())));
    });
});

module.exports = router;