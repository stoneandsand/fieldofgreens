const mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/fieldofgreens` : 'mongodb://localhost/fieldofgreens';

const User = require('./schemas.js');

mongoose.connect(DB_URI);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection success');
});

const signup = (data, callback) => {
  User.findOne({username: data.username}, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else {
      if (!userEntry) {
        let newUser = new User({
          username: data.username,
          password: data.password,
        });
        newUser.save((err, newUserEntry) => {
          if (err) {
            console.error(err);
          } else {
            callback(newUserEntry.username);
          }
        });
      } else {
        callback('Username already exists');
      }
    }
  });
}

//retrieve all lists for a given user
const getUserLists = (user, callback) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error('')
    } else {
      if (!userEntry) {
        callback([]);
      } else {
        callback(userEntry.lists);
      }
    }
  })
};

// Saves new list for user to database
const saveList = (user, list, callback) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else {
      userEntry.lists.push({
        name: list.name,
        items: list.items,
      });
      userEntry.save((err, updatedEntry) => {
        if (err) {
          console.error(err);
          callback([]);
        } else {
          callback(updatedEntry.lists);
        }
      });
    }
  });
};

// Returns a list of a user and runs callback on its contents to the client
const findList = (user, list, callback) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else {
      let targetList = userEntry.lists.filter(listEntry => listEntry.name === list).pop();
      if (targetList) {
        callback(targetList);
      } else {
        callback(null);
      }
    }
  });
};

//TODO FOR ADDING ITEM TO AN EXISTING LIST
const addItemToList = (user, item, list, callback) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else {

    }
  })
};

module.exports.getUserLists = getUserLists;
module.exports.signup = signup;
module.exports.saveList = saveList;
module.exports.findList = findList;
