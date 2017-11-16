const express = require ('express');
let app = express();
let bodyParser = require('body-parser');
let recalls = require('../db/exampleRecallData.js');
let mongoose = require('mongoose');
let db = require('../db/index.js');

app.set('port', (process.env.PORT || 5000));
console.log(__dirname + '/../')

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.json());






// POST request for saving new list

app.post('/saveList', function(req, res) {
console.log('THIS IS THE REQ TO SAVE LIST FROM CLIENT!!!!!', req);

  db.saveList('req.body???', function() {
    res.send('List has been saved!!!')
  })

});

//GET request for getting recall data from exampleRecallData.js

app.get('/searchNewList', function(req, res) {
  console.log('THIS IS THE REQ FOR RECALLS FROM CLIENT!!!!!', req);

  let keywords = req.body.split(' ');
  let matches = [];
  for (var i = 0; i < keywords.length; i++) {
    for (var k = 0; k < recalls.exampleRecallData.length; k++) {

      if (recalls.exampleRecallData[k]["description"].includes(keywords[i]) || recalls.exampleRecallData[k]["brand name"].includes(keywords[i])) {

        matches.push(recalls.exampleRecallData[k]);
      }
    }
  }
});


// GET request for retrieving a saved list
app.get('/getList', function(req, res) {
  console.log('THIS IS THE REQ TO GET A LIST FROM CLIENT!!!!!', req);
  db.findList(req.body.name, function(err, result) {
    if(err) {
      throw err;
    } else {
      res.send(result);
    }
  })
})





// views is directory for all tecmplate files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
