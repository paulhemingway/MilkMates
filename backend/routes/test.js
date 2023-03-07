var express = require('express');
var mysql = require('mysql2');
var router = express.Router();

var Names = {};

var connection = mysql.createConnection({
    host     : 'ec2-3-83-148-232.compute-1.amazonaws.com',
    port     : '3306',
    user     : 'milkmates',
    password : 'MilkmatesPassword11!!',
    database : 'test'
});

connection.connect(function(err){
    
    if(!err) {
        console.log("Database is connected ... ");    
    } else {
        console.log("Error connecting database ... ");    
        console.log(err);
    }

    connection.query('SELECT * FROM test', function(err, results) 
    {
        if (err) throw err;
        Names = results;
    })
});

/* GET test page. */
router.get('/', function(req, res, next) 
{
    res.render('test', {data: Names});
});

module.exports = router;