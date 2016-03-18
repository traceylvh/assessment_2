var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var animals = require('./routes/animals.js');
// var randomNumber = require('../public/scripts/modules/generateRandomNumber.js');

// bring in pg module
var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/assessment_2';
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/animals', animals);

//get the random number from the module
app.get('/theNumber', function(req, res){
    res.send(randomNumber());
});



app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});
