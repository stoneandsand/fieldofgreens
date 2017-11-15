const express = require ('express');
let app = express();
let bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());


//app.post();

//app.get();


let port = 9337;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

