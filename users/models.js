const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  picks: {type: Object, default: null},
  points: {type: Number, default: 0}
});

UserSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    username: this.username || '',
    name: this.name || '',
    picks: this.picks || null,
    points: this.points || 0
  };
};

UserSchema.methods.serialize = function() {
  return {
    name: this.name || '',
    points: this.points || 0
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

UserSchema.statics.getUserByUsername = function(username) {
  return this.findOne({
    username
  })
    .exec()
    .then((user) => {
      if (user) {
        return Promise.resolve(user);
      }
      const err = new Error('user does not exist');
      return Promise.reject(err);
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};