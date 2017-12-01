const mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/fieldofgreens` : 'mongodb://localhost/fieldofgreens';

const User = require('./schemas.js');

mongoose.connect(DB_URI, {useMongoClient: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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
      console.error(err)
    } else {
      if (!userEntry) {
        console.log('no user found');
        callback([]);
      } else {
        callback(userEntry.lists);
      }
    }
  });
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
const findList = (user, id, callback) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else {
      let targetList = userEntry.lists.filter(listEntry => listEntry._id.toString() === id).pop();
      if (targetList) {
        callback(targetList);
      } else {
        callback(null);
      }
    }
  });
};

const findAllergies = (user, callback) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(err)
    } else {
      if (!userEntry) {
        console.log('no user found');
        callback([]);
      } else {
        callback(userEntry.allergies);
      }
    }
  });
};

const addAllergies = (user, item, callback) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else {
      console.log(item);
      userEntry.allergies.push(item);
      userEntry.save((err, updatedEntry) => {
        if (err) {
          console.error(err);
          callback([]);
        } else {
          callback(updatedEntry.allergies);
        }
      });
    }
  });
};

const findLikes = (user, callback) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(err)
    } else {
      if (!userEntry) {
        console.log('no user found');
        callback([]);
      } else {
        callback(userEntry.likes);
      }
    }
  });
};

const addLikes = (user, item, callback) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else {
      userEntry.likes.push(item);
      userEntry.save((err, updatedEntry) => {
        if (err) {
          console.error(err);
          callback([]);
        } else {
          callback(updatedEntry.likes);
        }
      });
    }
  });
};

const findDislikes = (user, callback) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(err)
    } else {
      if (!userEntry) {
        console.log('no user found');
        callback([]);
      } else {
        callback(userEntry.dislikes);
      }
    }
  });
};

const addDislikes = (user, item, callback) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else {
      userEntry.dislikes.push(item);
      userEntry.save((err, updatedEntry) => {
        if (err) {
          console.error(err);
          callback([]);
        } else {
          callback(updatedEntry.dislikes);
        }
      });
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

module.exports.signup = signup;
module.exports.getUserLists = getUserLists;
module.exports.saveList = saveList;
module.exports.findList = findList;
module.exports.findAllergies = findAllergies;
module.exports.addAllergies = addAllergies;
module.exports.findLikes = findLikes;
module.exports.addLikes = addLikes;
module.exports.findDislikes = findDislikes;
module.exports.addDislikes = addDislikes;