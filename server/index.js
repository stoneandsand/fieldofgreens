const express = require ('express');
let app = express();
let bodyParser = require('body-parser');
let recalls = require('../db/exampleRecallData.js');
let mongoose = require('mongoose');
let db = require('../db/index.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.json());






// POST request for saving new list

app.post('/saveList', function(req, res) {
console.log('THIS IS THE REQ.BODY TO SAVE LIST FROM CLIENT!!!!!', req.body);

  var items = [];
  for (var x = 0; x < req.body.items.length; x++) {
    items.push(req.body.items[x].name);
  }
  var toSave = {
    "name": req.body.listName,
    "items": items
  };

  db.saveList(toSave, function(err, result) {
    if (err) {
      console.err(err);
    } else {
      res.send('List has been saved!!!');
    }
  })
});

//GET request for getting recall data from exampleRecallData.js
//FINISHED/WORKING FOR NOW
app.get('/searchNewList', function(req, res) {
  // console.log('THIS IS THE REQ FOR RECALLS FROM CLIENT!!!!!', req);
  console.log('THIS IS THE ITEM FROM LIST', JSON.parse(req.query.item).name)
  let keywords = JSON.parse(req.query.item).name.split(' ');
  console.log(keywords);
  // console.log(recalls.exampleRecallData[0]['brand name'])
  // console.log(recalls.exampleRecallData[0]['product_description'])
  let matches = [];
  for (var i = 0; i < keywords.length; i++) {
    for (var k = 0; k < recalls.exampleRecallData.length; k++) {

      if (recalls.exampleRecallData[k]['product_description'].toUpperCase().includes(keywords[i].toUpperCase()) || recalls.exampleRecallData[k]['brand name'].toUpperCase().includes(keywords[i].toUpperCase())) {

        matches.push(recalls.exampleRecallData[k]);

      }
    }
  }

  // matches.filter((match) => {
    // match['distribution_pattern'].indexOf(req.query.state) >= 0 || match['distribution_pattern'].indexOf("Nationwide") >= 0

  // })

  res.send(matches)
  console.log(matches)
});


// GET request for retrieving a saved list
app.get('/getList', function(req, res) {
  console.log('THIS IS THE REQ TO GET A LIST FROM CLIENT!!!!!', req.query);
  db.findList(req.query.name, function(err, result) {
    if(err) {
      throw err;
    } else {
      res.send(result);
    }
  })
})



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
