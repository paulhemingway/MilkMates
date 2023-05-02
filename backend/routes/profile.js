var express = require('express');
var mysql = require('mysql2');
var router = express.Router();

router.post('/GetUserInfo', async function(req, res, next) 
{
    const user = req.body.username;

    //ERROR CODES:
    // 0 - success
    // 1 - username not found
    // 2 - blank username received
    // 3 - inactive account

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]
    
    if(user === "")
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }

    let response = await QueryDatabase("SELECT * FROM users WHERE username = '" + user + "';");

    if(response && response.length > 0)
    {
        response[0].password = "Nice try fool!";
        finalResponse[1] = response;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
});

router.put('/EditUserInfo', async function(req, res, next)
{
    //TODO: Do we need anything else
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const zipCode = req.body.zipCode;
    
    //ERROR CODES:
    // 0 - success
    // 1 - SQL select user query error
    // 2 - username not found
    // 3 - SQL update user query error

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let userExists = await QueryDatabase("SELECT * FROM users WHERE username = '" + username + "';");

    if(!userExists)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else if(userExists && userExists.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let userId = userExists[0].userid;
        let updatedUser = await QueryDatabase("UPDATE users SET fName = '" + firstName + "', LName = '" + lastName + "', email = '" + email + "', phone = " + phoneNumber + ", zipCode = '" + zipCode + "' WHERE userid = " + userId + ";");
        if(!updatedUser)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 3;
            res.send(finalResponse).status(200).end();
        }
        else
        {
            let newUserInfo = await QueryDatabase("SELECT * FROM users WHERE userid = '" + userId + "';");
            finalResponse[1] = newUserInfo;
            finalResponse[0].success = true;
            finalResponse[0].errorCode = 0;
            res.send(finalResponse).status(200).end();
        }
    }
});

async function QueryDatabase(sqlQuery)
{
    let connection = await ConnectToDatabase();
    connection.connect(function(err){
        
        if(!err) {
            console.log("Database is connected ... ");    
        } else {
            console.log("Error connecting database ... ");    
            console.log(err);
        }
    });

    return new Promise((resolve, reject) =>
    {
        connection.query(sqlQuery, function(err, results)
        {
            if (err) reject(err);
            console.log(results);
            resolve(results);
        });
        
        connection.end();
    })

}

async function ConnectToDatabase()
{
    var connection = mysql.createConnection({
        host     : 'milkmates.org',
        port     : '3306',
        user     : 'milkmates',
        password : 'MilkmatesPassword11!!',
        database : 'milkmates'
    });
    
    return connection;
}

module.exports = router;