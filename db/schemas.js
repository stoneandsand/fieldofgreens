const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: {type: String, required: true},
  items: [String],
});

const userSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  allergies: [String],
  likes: [String],
  dislikes: [String],
  lists: [listSchema],
});

module.exports = mongoose.model('User', userSchema);