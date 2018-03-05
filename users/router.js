const express = require('express');
const bodyParser = require('body-parser');

const { User } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    let x = a[key];
    let y = b[key];
    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
  });
}

const answerKey = [
  'New England',
  'Oakland'
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

router.get('/scores', jsonParser, (req, res) => {
  User.find({})
    .then(users => users.map(user => updateUser(user)))
    .then(promiseArr => {
      Promise.all()
        .then(updatedUsers => res.json(updatedUsers.map(user => user.serialize())));
    });
});

router.get('/all', jsonParser, (req, res) => {
  User.find()
    .then(users => sortByKey(users, 'points'))
    .then(sortedUsers => res.json(sortedUsers.map(user => user.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.get('/:username', jsonParser, (req, res) => {
  User.findOne({username: req.params.username})
    .then(user => {
      console.log(user);
      return res.status(200).json(user.apiRepr());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.post('/signup', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password', 'name'];
  const missingField = requiredFields.find(field => !(field in req.body));
  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }
  const stringFields = ['username', 'password', 'name'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );
  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }
  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );
  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }
  const sizedFields = {
    username: {
      min: 1,
      max: 17
    },
    name: {
      max: 17
    },
    password: {
      min: 5,
      // bcrypt truncates after 72 characters
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );
  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }
  let {username, password, name} = req.body;
  name = name.trim();
  return User.find({username})
    .count()
    .then(count => {
      if (count > 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      return User.hashPassword(password);
    })
    .then(hash => {
      return User.create({
        username,
        password: hash,
        name
      });
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(error => {
      if (error.reason === 'ValidationError') {
        return res.status(error.code).json(error);
      }
      res.status(500).json({code: 500, message: 'Internal server error'});
    });
});

router.post('/picks/:username', jsonParser, (req, res) => {
  User
    .findOneAndUpdate({username: req.params.username}, {$set: {picks: req.body}})
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'});
    });
});

module.exports = router;