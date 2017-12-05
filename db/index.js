const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/fieldofgreens` : 'mongodb://localhost/fieldofgreens';

const User = require('./schemas.js');

mongoose.connect(DB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const signup = (user, callback) => {
  User.findOne({ username: user }, (findErr, userEntry) => {
    if (findErr) {
      callback(findErr, null);
    } else if (!userEntry) {
      const newUser = new User({
        username: user,
      });
      newUser.save((saveErr, newUserEntry) => {
        if (saveErr) {
          callback(saveErr, null);
        } else {
          callback(null, newUserEntry.username);
        }
      });
    } else {
      callback(null, null); // Username already exists
    }
  });
};

// retrieve all lists for a given user
const getUserLists = (user, callback) => {
  User.findOne({ username: user }, (err, userEntry) => {
    if (err) {
      callback(err, null);
    } else if (!userEntry) {
      callback(null, []);
    } else {
      callback(null, userEntry.lists);
    }
  });
};

// Saves new list for user to database
const saveList = (user, list, callback) => {
  User.findOne({ username: user }, (findErr, userEntry) => {
    if (findErr) {
      callback(findErr, null);
    } else {
      userEntry.lists.push({
        name: list.name,
        items: list.items,
      });
      userEntry.save((saveErr, updatedEntry) => {
        if (saveErr) {
          callback(saveErr, null);
        } else {
          callback(null, updatedEntry.lists);
        }
      });
    }
  });
};

// Returns a list of a user and runs callback on its contents to the client
const findList = (user, id, callback) => {
  User.findOne({ username: user }, (err, userEntry) => {
    if (err) {
      callback(err, null);
    } else {
      const targetList = userEntry.lists.filter(listEntry => listEntry._id.toString() === id).pop();
      if (targetList) {
        callback(null, targetList);
      } else {
        callback(null, {});
      }
    }
  });
};

// Add to user's allergies lists
const addAllergies = (item, callback) => {
  User.findOne({ username: item.user }, (findErr, userEntry) => {
    if (findErr) {
      callback(findErr, null);
    } else {
      userEntry.allergies.push(item.item);
      userEntry.save((saveErr, updatedEntry) => {
        if (saveErr) {
          callback(saveErr, []);
        } else {
          callback(null, updatedEntry.allergies);
        }
      });
    }
  });
};

// Add to user's likes list
const addLikes = (item, callback) => {
  User.findOne({ username: item.user }, (findErr, userEntry) => {
    if (findErr) {
      callback(findErr, null);
    } else {
      userEntry.likes.push(item.item);
      userEntry.save((saveErr, updatedEntry) => {
        if (saveErr) {
          callback(saveErr, null);
        } else {
          callback(null, updatedEntry.likes);
        }
      });
    }
  });
};

// Add to user's dislikes list
const addDislikes = (item, callback) => {
  User.findOne({ username: item.user }, (findErr, userEntry) => {
    if (findErr) {
      callback(findErr, null);
    } else {
      userEntry.dislikes.push(item.item);
      userEntry.save((saveErr, updatedEntry) => {
        if (saveErr) {
          callback(saveErr, null);
        } else {
          callback(null, updatedEntry.dislikes);
        }
      });
    }
  });
};

// Set user's location
const addLocation = (user, location, callback) => {
  User.findOne({ username: user }, (findErr, userEntry) => {
    if (findErr) {
      callback(findErr, null);
    } else {
      userEntry.location = location;
      userEntry.save((saveErr, updatedEntry) => {
        if (saveErr) {
          callback(saveErr, null);
        } else {
          callback(null, updatedEntry.location);
        }
      });
    }
  });
};

// Retrieve user settings (allergies, likes, dislikes, location)
const findSettings = (user, callback) => {
  User.findOne({ username: user }, (err, userEntry) => {
    if (err) {
      callback(err, null);
    } else if (!userEntry) {
      callback(null, null);
    } else {
      const settings = {
        allergies: userEntry.allergies,
        likes: userEntry.likes,
        dislikes: userEntry.dislikes,
        location: userEntry.location,
      };
      callback(null, settings);
    }
  });
};

// Remove lists or items from user's profile
const removeItem = (user, item, callback) => {
  console.log(item);
  User.findOne({ username: user }, (findErr, userEntry) => {
    if (findErr) {
      callback(findErr, null);
    } else if (item.type === 'lists') { // lists
      userEntry[item.type] = userEntry[item.type].filter(entry => entry.name !== item.name);
      userEntry.save((saveErr, updatedEntry) => {
        if (saveErr) {
          callback(saveErr, null);
        } else {
          callback(null, updatedEntry[item.type]);
        }
      });
    } else { // allergies, likes, dislikes
      userEntry[item.type] = userEntry[item.type].filter(entry => entry !== item.name);
      userEntry.save((saveErr, updatedEntry) => {
        if (saveErr) {
          callback(saveErr, null);
        } else {
          callback(null, updatedEntry[item.type]);
        }
      });
    }
  });
};

module.exports.signup = signup;
module.exports.getUserLists = getUserLists;
module.exports.saveList = saveList;
module.exports.findList = findList;
module.exports.addAllergies = addAllergies;
module.exports.addLikes = addLikes;
module.exports.addDislikes = addDislikes;
module.exports.addLocation = addLocation;
module.exports.findSettings = findSettings;
module.exports.removeItem = removeItem;
