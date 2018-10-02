const express = require('express');
const bodyParser = require('body-parser');

const { User } = require('../users/models');

const router = express.Router();

const jsonParser = bodyParser.json();

const answerKey = [
  'Rams',
  'Cowboys',
  'Bears',
  'Patriots',
  'Bengals',
  'Packers',
  'Texans',
  'Jaguars',
  'Titans',
  'Raiders',
  'Seahawks',
  'Saints',
  'Chargers',
  'Ravens',
  'Chiefs'
];

function updateUser(user) {
  let picksArray = [];
  if (user.picks) {
    for (let key in user.picks) {
      picksArray.push(user.picks[key]);
    }
  }
  if (picksArray.length) {
    for (let i=0; i<picksArray.length; i++) {
      let currentPick = picksArray[i];
      if (currentPick && currentPick === answerKey[i]) {
        user.points += 1;
      }
    }
  }
  return user.save();
}

router.get('/', jsonParser, (req, res) => {
  User.find({})
    .then(users => {
      users.map(user => updateUser(user));
    })
    .then(() => 
      Promise.all()
        .then(updatedUsers => res.json(updatedUsers.map(user => user.apiRepr()))));
});

module.exports = router;