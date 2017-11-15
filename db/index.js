const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thegrosserylist');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection success');
});



let listSchema = mongoose.Schema({
  // id: Number,
  // name: String,
  // full_name: String,
  // url: String,
  // forks: Number
});

let List = mongoose.model('List', listSchema);


module.exports.save = save;