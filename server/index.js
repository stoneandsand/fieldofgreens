const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const recalls = require('../db/data.js');
const db = require('../db/index.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(`${__dirname}/../`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// HELPERS

// Helper function for getting data that matches the recalls GET request`
const getRecallMatches = (keywordsArray) => {
  let matches = [];
  for (let keyword of keywordsArray) {
    for (let recall of recalls.recallData && recall.report_date > '20170101') {
      if (recall.product_description.toUpperCase().includes(keyword.toUpperCase()) ) {
        matches.push(recall);
      }
    }
  }
  matches = matches.filter(match => match.status === 'Ongoing');
  return matches;
};

// ROUTING
app.post('/signup', (req, res) => {
  console.log(req.body);
  // expecting {username: '', password: ''}
  db.signup(req.body, (username) => {
    if (username) {
      res.send(username);
    } else {
      res.send(null);
    }
  });
});

// GET request for getting recall data from data.js
app.get('/api/search/:location/:item', (req, res) => {
  // expecting {item: 'cheese cake', location: 'CA'}
  console.log('REQUEST FROM CLIENT', req.params.item);
  console.log(req.params.location);

  const keywords = req.params.item.split(' ');
  console.log(keywords);

  let matches = getRecallMatches(keywords);

  matches = matches.filter(match => match.distribution_pattern.includes(req.params.location));
  res.send(matches.slice(0, 10));
});
// || match.distribution_pattern.includes('Nationwide')

// POST request for saving new list to database
app.post('/api/users/:username/lists', (req, res) => {
  // expecting {username: '', items: ['apples', 'oranges'], listName: 'fruits'}
  const items = [];
  for (const item of req.body.items) {
    items.push(item.name);
  }
  const list = {
    name: req.body.listName,
    items: items,
  };
  console.log(list);
  db.saveList(req.body.username, list, (err, updatedLists) => {
    console.log(updatedLists);
    res.send(updatedLists);
  });
});

// GET request for retrieving all saved lists names for a user
app.get('/api/users/:username/lists', (req, res) => {
  db.getUserLists(req.params.username, (err, userLists) => {
    console.log(userLists);
    res.send(userLists);
  });
});

// GET request for retrieving a single saved list
app.get('/api/users/:username/lists/:id', (req, res) => {
  // each saved list should have a _id property
  db.findList(req.params.username, req.params.id, (err, targetList) => {
    console.log(targetList);
    res.send(targetList);
  });
});

app.get('/api/users/:username/settings', (req, res) => {
  db.findSettings(req.params.username, (err, settings) => {
  //should send {allergies: [], likes: [], dislikes: [], location: ''}
    res.send(settings);
  })
});

app.post('/api/users/:username/allergies', (req, res) => {
  console.log(req.body.item);
  // Expecting {item: 'apple'} item in POST request
  db.addAllergies(req.params.username, req.body.item, (err, updatedAllergyList) => {
    res.send(updatedAllergyList);
  });
});

app.post('/api/users/:username/likes', (req, res) => {
  // Expecting {item: 'apple'} item in POST request
  db.addLikes(req.params.username, req.body.item, (err, updatedLikeList) => {
    res.send(updatedLikeList);
  });
});

app.post('/api/users/:username/dislikes', (req, res) => {
  // Expecting {item: 'apple'} item in POST request
  db.addAllergies(req.params.username, req.body.item, (err, updatedDislikeList) => {
    res.send(updatedDislikeList);
  });
});

app.post('/api/users/:username/location', (req, res) => {
  db.addLocation(req.params.username, req.body.location, (err, location) => {
    res.send(location)
  });
});

app.post('/api/users/:username/delete', (req, res) => {
  // Expecting {name: 'apple', type: 'allergies'}
  db.removeItem(req.params.username, req.body, (err, updatedList) => {
    res.send(updatedList);
  });
});

app.listen(app.get('port'), () => {
  console.log('Server running on port', app.get('port'));
});
