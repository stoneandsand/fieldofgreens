const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thegrosserylist');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection success');
});


// let userSchema = mongoose.Schema {
// 	uid_number: Number, Unique, AutoIncrementing
// 	username: String, Unique
// 	password: String
// 	shoppinglists: [List1, List2...]
// }

let listSchema = mongoose.Schema({
  name: {type: String, required: true},
  items: [String]
});

let List = mongoose.model('List', listSchema);

let saveList = (thing) => {
  let newList = new List({
    name: thing.name,
    items: thing.items
  })

  newList.save((err, list) => {
    if(err) {
      console.log('error', err);
    } else {
      console.log('List saved!');
    }
  })

}

let findList = (thing, callback) => {
  List.find(thing, callback);
}


module.exports.findList = findList;
module.exports.saveList = saveList;