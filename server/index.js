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
    for (let recall of recalls.recallData ) {
      if (recall.product_description.toUpperCase().includes(keyword.toUpperCase()) && recall.report_date > '20160101' && recall.status ==='Ongoing') {
        matches.push(recall);
      }
    }
  }
  matches = matches.filter(match => match.status === 'Ongoing');
  return matches;
};

// ROUTING
app.post('/signup', (req, res) => {
  console.log(req.body, 'req.body for signup');
  // expecting {username: '', password: ''}

  db.signup(req.body.email, (err, username) => {
    if (err) {
      res.send('');
    }
    res.send(username);
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
  const items = [];
  for (const item of req.body.items) {
    items.push(item.name);
  }
  const list = {
    name: req.body.listName,
    items: items,
  };
  console.log(req.params.username)
  console.log(list);
  db.saveList(req.params.username, list, (err, updatedLists) => {
    if (err) {
      res.send(err); // Error retrieving updated lists
    }
    console.log(updatedLists);
    res.send(updatedLists);
  });
});

// GET request for retrieving all saved lists names for a user
app.get('/api/users/:username/lists', (req, res) => {
  db.getUserLists(req.params.username, (err, userLists) => {
    if (err) {
      res.send([]); // Error retrieving saved lists
    }
    res.send(userLists);
  });
});

// GET request for retrieving a single saved list
app.get('/api/users/:username/lists/:id', (req, res) => {
  // each saved list should have a _id property
  db.findList(req.params.username, req.params.id, (err, targetList) => {
    if (err) {
      res.send({}); //Error retrieving list
    }
    console.log(targetList);
    res.send(targetList);
  });
});

app.get('/api/users/:username/settings', (req, res) => {
  db.findSettings(req.params.username, (err, settings) => {
    if (err) {
      res.send({allergies: [], likes: [], dislikes: [], location: ''});
      //Error retrieving user settings
    }
  //should send {allergies: [], likes: [], dislikes: [], location: ''}
    res.send(settings);
  })
});

app.post('/api/users/:username/allergies', (req, res) => {
  console.log(req.body, 'req.body');
  // Expecting {item: 'apple'} item in POST request
  db.addAllergies(req.body, (err, updatedAllergyList) => {
    if (err) {
      res.send([]); //Error retrieving updated allergy list
    }
    res.send(updatedAllergyList);
  });
});

app.post('/api/users/:username/likes', (req, res) => {
  // Expecting {item: 'apple'} item in POST request
  db.addLikes(req.params.username, req.body.item, (err, updatedLikeList) => {
    if (err) {
      res.send([]); //Error retrieving updated likes list
    }
    res.send(updatedLikeList);
  });
});

app.post('/api/users/:username/dislikes', (req, res) => {
  // Expecting {item: 'apple'} item in POST request
  db.addAllergies(req.params.username, req.body.item, (err, updatedDislikeList) => {
    if (err) {
      res.send([]); //Error retrieving updated dislikes list
    }
    res.send(updatedDislikeList);
  });
});

app.post('/api/users/:username/location', (req, res) => {
  db.addLocation(req.params.username, req.body.location, (err, location) => {
    if (err) {
      res.send(''); //Error saving location
    }
    res.send(location)
  });
});

app.post('/api/users/:username/delete', (req, res) => {
  // Expecting {name: 'apple', type: 'allergies'}
  db.removeItem(req.params.username, req.body, (err, updatedList) => {
    if (err) {
      res.send([]); //Error retrieving updated list
    }
    res.send(updatedList);
  });
});

app.listen(app.get('port'), () => {
  console.log('Server running on port', app.get('port'));
});
