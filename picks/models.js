const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const PicksSchema = mongoose.Schema({
  picks: {type: Object, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

PicksSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    picks: this.picks
  };
};

const Picks = mongoose.model('Picks', PicksSchema);

module.exports = {Picks};