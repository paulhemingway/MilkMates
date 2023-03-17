var express = require('express');
var mysql = require('mysql2');
var router = express.Router();

var connection = mysql.createConnection({
    host     : 'ec2-54-159-200-221.compute-1.amazonaws.com',
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
});

//Check for a user
router.get('/CheckForUser', async function(req, res, next) 
{
    const user = req.body.username;
    
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + user + "';");
    
    console.log(response);
    res.send(response).status(200).end();
    //res.send("No user with that username found");
});

// Register a user
router.post('/RegisterUser', async function(req, res, next) 
{
    const user = req.body.username;
    const pass = req.body.passwordHash;

    //TODO: Make a create and not find
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + user + "';");
    
    console.log(response);
    res.send(response).status(200).end();
});

//Delete a user
router.delete('/DeleteUser', async function(req, res, next)
{
    const user = req.body.username;
    const pass = req.body.passwordHash;

    //TODO: Make a delete and not find
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + user + "';");
    
    console.log(response);
    res.send(response).status(200).end();
});

router.delete('/DeleteUser', async function(req, res, next)
{
    const user = req.body.username;
    const pass = req.body.passwordHash;
    
    //TODO: Make a update and not find
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + user + "';");
    
    console.log(response);
    res.send(response).status(200).end();
});

router.put('/UpdateUserPassword', async function(req, res, next)
{
    const user = req.body.username;
    const pass = req.body.passwordHash;
    
    //TODO: Make a update and not find
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + user + "';");
    
    console.log(response);
    res.send(response).status(200).end();
});

router.get('/IsUserAuthenticated', async function(req, res, next)
{
    const user = req.body.username;
    const authToken = req.body.authenticationToken;
    
    //TODO: Make this find auth token not user
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + user + "';");
    
    console.log(response);
    res.send(response).status(200).end();
});

async function QueryDatabase(sqlQuery)
{
    return new Promise((resolve, reject) =>
    {
        connection.query(sqlQuery, function(err, results)
        {
            if (err) reject(err);
            console.log(results);
            resolve(results);
        });

    })
}

module.exports = router;