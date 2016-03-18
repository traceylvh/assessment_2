var express = require('express');
var router = express.Router();
var pg = require('pg');


var connectionString;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/assessment_2';
}



//router.get here
router.get('/', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM animals ORDER BY animal_type;');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});




//post and connect data route
router.post('/', function(req, res) {
    var addAnimal = {
        animal_type: req.body.animal_type,
        qty: req.body.qty
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO animals (animal_type, qty) VALUES ($1, $2) RETURNING id",
            [addAnimal.animal_type, addAnimal.qty],
            function (err, result) {
                done();

                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });

});

module.exports = router;
