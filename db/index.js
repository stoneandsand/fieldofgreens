const mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/fieldofgreens` : 'mongodb://localhost/fieldofgreens';
mongoose.connect(DB_URI);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection success');
});

// let userSchema = mongoose.Schema {
//  uid_number: Number, Unique, AutoIncrementing
//  username: String, Unique
//  password: String
//  shoppinglists: [List1, List2...]
// }

let listSchema = mongoose.Schema({
  name: {type: String, required: true},
  items: [String]
});

let List = mongoose.model('List', listSchema);

// Saves new list to database
let saveList = (thing, callback) => {
  let newList = new List({
    name: thing.name,
    items: thing.items
 })
  newList.save(function(err, list) {
    if(err) {
      console.log('error', err);
    } else {
      console.log('(inside save function, success)')
      callback();
    }
  })
}

// Returns a list and all it's contents to the client
let findList = (thing, callback) => {
  List.find({name:thing}, callback);
}

// Returns all saved lists from database to the client
let getAllLists = (callback) => {
  List.find({}, callback);
}


module.exports.getAllLists = getAllLists;
module.exports.findList = findList;
module.exports.saveList = saveList;