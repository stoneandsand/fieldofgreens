const express = require ('express');
let app = express();
let bodyParser = require('body-parser');
let recalls = require('../db/test.js');
let mongoose = require('mongoose');
let db = require('../db/indexUser.js');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/../'));
app.use(bodyParser.json());


// Helper function for getting data that matches the recalls GET request`

let getRecallMatches = (keywordsArray) => {
  let matches = [];
  for (let i = 0; i < keywordsArray.length; i++) {
    for (let k = 0; k < recalls.recallData.length; k++) {
      if (recalls.recallData[k]['product_description'].toUpperCase().includes(keywordsArray[i].toUpperCase())) {
        matches.push(recalls.recallData[k]);
      }
    }
  }

  matches = matches.filter(function(match) {
    return match.status === 'Ongoing'

  })

  return matches
}
 // || recalls.recallData[k]['brand name'].toUpperCase().includes(keywordsArray[i].toUpperCase()

app.post('/signup', (req, res) => {
  console.log(req.body);
  //expecting {username: '', password: ''}
  db.signup(req.body, (username) => {
    if (username) {
      res.send(username);
    } else {
      res.send(null);
    }
  });
});

//GET request for getting recall data from test.js

app.get('/api/searchNewList', function(req, res) {
  console.log(req.body);
  //expecting {item: , location: }
  let keywords = JSON.parse(req.body.item).name.split(' ');
  console.log(keywords);

  let matches = getRecallMatches(keywords);
  // This commented out section is for filtering the matches to the users set location.
    // matches.filter((match) => {
  //   match['distribution_pattern'].indexOf(JSON.parse(req.query.state)) >= 0 || match['distribution_pattern'].indexOf("Nationwide") >= 0
  // })
  matches = matches.filter(function(match) {
    return match['distribution_pattern'].includes(req.body.state) || match['distribution_pattern'].includes('Nationwide');
  })
  matches.unshift(JSON.parse(req.body.item).name);
  console.log('matches ======>', matches);
  res.send(matches.slice(0, 11));
});


// POST request for saving new list to database
app.post('/api/:username/saveList', function(req, res) {

  let items = [];
  for (let x = 0; x < req.body.items.length; x++) {
    items.push(req.body.items[x].name);
  }
  let list = {
    name: req.body.listName,
    items: items
  };
  db.saveList(req.params.username, list, (updatedLists) => {
    res.send(updatedLists);
  });
});




// GET request for retrieving a single saved list
app.get('/api/:username/:list', function(req, res) {
  db.findList(req.body.name, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  })
})

// GET request for retrieving all saved lists names for rendering Saved Shopping List component of a user
app.get('/getSavedLists', function(req, res) {
  db.getAllLists(function(err, results) {
    if(err) {
      console.log('ERROR GETTING SAVED LISTS')
    } else {
      console.log('THIS EVERY LIST FROM DB', results)
      let justListNames = [];
      for(let key in results) {
        justListNames.push(results[key]['name'])
      }
      console.log(justListNames)
      res.send(justListNames);
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Server running on port', app.get('port'));
});
