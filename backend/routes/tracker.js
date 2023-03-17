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

router.get('/GetBatch', async function(req, res, next)
{
    const batchID = req.body.batchID;
    
    //TODO: Make this list a specific batch
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + batchID + "';");
    
    console.log(response);
    res.send(response).status(200).end();
});

router.get('/GetAllBatches', async function(req, res, next)
{
    const user = req.body.username;
    
    //TODO: Make this list all batches
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + user + "';");
    
    console.log(response);
    res.send(response).status(200).end();
});

router.post('/AddBatch', async function(req, res, next)
{
    //TODO: figure out exactly what will be passed in
    const batchID = req.body.batchID;
    const batchInfo = req.body.batchInfo;
    
    //TODO: Make this add a batch
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + batchID + "';");
    
    console.log(response);
    res.send(response).status(200).end();
});

router.put('/EditBatch', async function(req, res, next)
{
    //TODO: figure out exactly what will be passed in
    const batchID = req.body.batchID;
    const batchInfo = req.body.batchInfo;
    
    //TODO: Make this edit a batch
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + batchID + "';");
    
    console.log(response);
    res.send(response).status(200).end();
});

router.delete('/DeleteBatch', async function(req, res, next)
{
    const batchID = req.body.batchID;
    
    //TODO: Make this delete a batch
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + batchID + "';");
    
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