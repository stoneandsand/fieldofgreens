const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const recalls = require('../db/data.js');
const db = require('../db/index.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(`${__dirname}/../`));
app.use(bodyParser.json());


// Helper function for getting data that matches the recalls GET request`

const getRecallMatches = (keywordsArray) => {
  let matches = [];
  for (let keyword of keywordsArray) {
    for (let recall of recalls.recallData) {
      if (recall.product_description.toUpperCase().includes(keyword.toUpperCase()) && recall.report_date > '20170101') {
        matches.push(recall);
      }
    }
  }
  matches = matches.filter(match => match.status === 'Ongoing');
  return matches;
};


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
app.get('/api/search', (req, res) => {
  // expecting {item: 'cheese cake', location: 'CA'}
  console.log('REQUEST FROM CLIENT', req.body);

  const keywords = JSON.parse(req.body.item).name.split(' ');
  console.log(keywords);

  let matches = getRecallMatches(keywords);

  matches = matches.filter(match => match.distribution_pattern.includes(req.body.location) || match.distribution_pattern.includes('Nationwide'));
  matches.unshift(JSON.parse(req.body.item).name);
  console.log('matches ======>', matches);
  res.send(matches.slice(0, 11));
});


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

app.get('/api/users/:username/allergies', (req, res) => {
  // retrieve user's allergy list
  db.findAllergies(req.params.username, (err, allergyList) => {
    res.send(allergyList);
  });
});

app.get('/api/users/:username/likes', (req, res) => {
  // retrieve user's like list
  db.findLikes(req.params.username, (err, likeList) => {
    res.send(likeList);
  });
});

app.get('/api/users/:username/dislikes', (req, res) => {
  // retrieve user's dislike list
  db.findDislikes(req.params.username, (err, dislikeList) => {
    res.send(dislikeList);
  });
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

app.post('/api/users/:username/delete', (req, res) => {
  // Expecting {name: 'apple', type: 'allergies'}
  db.removeItem(req.params.username, req.body, (err, updatedList) => {
    res.send(updatedList);
  });
});

app.listen(app.get('port'), () => {
  console.log('Server running on port', app.get('port'));
});
