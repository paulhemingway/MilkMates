var express = require('express');
var mysql = require('mysql2');
var crypto = require('crypto');
var router = express.Router();
var nodemailer = require('nodemailer');

//Check for a user
router.post('/CheckForUser', async function(req, res, next) 
{
    const user = req.body.username;
    var hash = crypto.createHash('sha256').update("salt"+req.body.password+"pepper").digest('hex');

    //ERROR CODES:
    // 0 - success
    // 1 - username not found
    // 2 - incorrect password
    // 3 - blank username received
    // 4 - blank password received
    // 5 - inactive account
    // 6 - authToken insert failed

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
        finalResponse[0].errorCode = 3;
        res.send(finalResponse).status(200).end();
    }

    if(req.body.password === "")
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 4;
        res.send(finalResponse).status(200).end();
    }

    let response = await QueryDatabase("SELECT * FROM users WHERE username = '" + user + "'");
    if(response[0].isActive === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 5;
        res.send(finalResponse).status(200).end();
    }
    else if(response && response.length > 0)
    {
        if(response[0].password === hash)
        {
            var authToken = crypto.randomBytes(32).toString('hex');

            let authTokenInserted = await QueryDatabase(
                "INSERT INTO auth_tokens(userid, auth_token, exp_date)" +
                "VALUES (" + response[0].userid + ", '" + authToken + "', DATE_ADD(now(),interval 1 day));");

            if(!authTokenInserted)
            {
                finalResponse[0].success = false;
                finalResponse[0].errorCode = 6;
                res.send(finalResponse).status(200).end();
            }
            else
            {
                var returnObject =
            {
                userid: response[0].userid,
                authToken: authToken,
                username: response[0].username,
                firstName: response[0].fName,
                lastName: response[0].LName,
                isAdmin: response[0].isAdmin
            };
    
            finalResponse[1] = returnObject;
            res.send(finalResponse).status(200).end();
            }
        }
        else
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 2;
            res.send(finalResponse).status(200).end();
        }
    }
    else
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
});

// Register a user
router.post('/RegisterUser', async function(req, res, next) 
{
    const user = req.body.username;
    var hash = crypto.createHash('sha256').update("salt"+req.body.password+"pepper").digest('hex');
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const zipCode = req.body.zipCode;

    //ERROR CODES:
    // 0 - success
    // 1 - blank field received
    // 2 - User with that username already exists
    // 3 - User with that email already exists
    // 4 - error during create user database query

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    if(user === "" || req.body.password === "" || firstName === "" || lastName === "" || email === "" || phoneNumber === "" || zipCode === "")
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }

    let userExists = await QueryDatabase("SELECT * FROM users WHERE username = '" + user + "';");
    
    if(userExists && userExists.length > 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let emailUsed = await QueryDatabase("SELECT * FROM users WHERE email = '" + email + "';");

        if(emailUsed && emailUsed.length > 0)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 3;
            res.send(finalResponse).status(200).end();
        }
        else
        {
            let createUser = await QueryDatabase("INSERT INTO users(username, password, email, fName, lName, phone, zipCode) VALUES('"+ user +"', '"+ hash +"', '"+ email +"', '"+ firstName +"', '"+ lastName + "', '"+ phoneNumber + "', '"+ zipCode +"')");
        
            if(!createUser)
            {
                finalResponse[0].success = false;
                finalResponse[0].errorCode = 4;
                res.send(finalResponse).status(200).end();
            }
            else
            {
                res.send(finalResponse).status(200).end();
            }
        }
    } 
});

//Delete a user
router.put('/DeleteUser', async function(req, res, next)
{
    const user = req.body.username;
    var hash = crypto.createHash('sha256').update("salt"+req.body.password+"pepper").digest('hex');

    //ERROR CODES:
    // 0 - success
    // 1 - No user with that username exists
    // 2 - SQL update query error
    // 3 - incorrect Password

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let userExists = await QueryDatabase("SELECT * FROM users WHERE username = '" + user + "';");

    if(userExists && userExists.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        if(userExists[0].password === hash)
        {
            let makeUserInactive = await QueryDatabase("UPDATE users SET isActive = FALSE WHERE username = '" + user + "';");

            if(!makeUserInactive)
            {
                finalResponse[0].success = false;
                finalResponse[0].errorCode = 2;
                res.send(finalResponse).status(200).end();
            }
            else
            {
                finalResponse[0].success = true;
                finalResponse[0].errorCode = 0;
                res.send(finalResponse).status(200).end();
            }
        }
        else
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 3;
            res.send(finalResponse).status(200).end();
        }
    }
});

router.put('/DeleteUserAdmin', async function(req, res, next)
{
    const user = req.body.username;

    //ERROR CODES:
    // 0 - success
    // 1 - No user with that username exists
    // 2 - SQL update query error

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let userExists = await QueryDatabase("SELECT * FROM users WHERE username = '" + user + "';");

    if(userExists && userExists.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let makeUserInactive = await QueryDatabase("UPDATE users SET isActive = FALSE WHERE username = '" + user + "';");

        if(!makeUserInactive)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 2;
            res.send(finalResponse).status(200).end();
        }
        else
        {
            finalResponse[0].success = true;
            finalResponse[0].errorCode = 0;
            res.send(finalResponse).status(200).end();
        }
    }
});

router.put('/UpdateUserPassword', async function(req, res, next)
{
    const user = req.body.username;
    var oldhash = crypto.createHash('sha256').update("salt"+req.body.oldPassword+"pepper").digest('hex');
    var newhash = crypto.createHash('sha256').update("salt"+req.body.newPassword+"pepper").digest('hex');

    //ERROR CODES:
    // 0 - success
    // 1 - No user with that username exists
    // 2 - SQL update query error
    // 3 - Wrong old password

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let userExists = await QueryDatabase("SELECT * FROM users WHERE username = '" + user + "';");

    if(userExists && userExists.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        if(userExists && userExists[0].password === oldhash)
        {
            let updateUserPassword = await QueryDatabase("UPDATE users SET password = '" + newhash + "' WHERE username = '" + user + "';");
    
            if(!updateUserPassword)
            {
                finalResponse[0].success = false;
                finalResponse[0].errorCode = 2;
                res.send(finalResponse).status(200).end();
            }
            else
            {
                finalResponse[0].success = true;
                finalResponse[0].errorCode = 0;
                res.send(finalResponse).status(200).end();
            }
        }
        else
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 3;
            res.send(finalResponse).status(200).end();
        }
    }
});

router.post('/ForgotUserPasswordSendEmail', async function(req, res, next)
{
    const username = req.body.username;

    //ERROR CODES:
    // 0 - success
    // 1 - No user with that username exists
    // 2 - insert token error

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    const forgotPasswordToken = crypto.randomBytes(16).toString('hex');

    let selectEmail = await QueryDatabase("SELECT email, userid FROM users WHERE username = '" + username + "';");
    if(selectEmail && selectEmail.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let email = selectEmail[0].email;
        let userid = selectEmail[0].userid;
        
        let transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            secure: true, // use SSL
            port: 465,
            auth: {
                user: 'milkmates@zohomail.com',
                pass: 'CapstoneEmail12'
            }
          });
        
          // Define the email options
          const mailOptions = {
            from: 'milkmates@zohomail.com',
            to: email,
            subject: 'Reset your MilkMates password',
            text: `Hello ` + username + `, we received a request to reset your password. 
            If you attempted to reset your password then click the following link: https://milkmates.org/forgot/` + forgotPasswordToken + `
            Otherwise, consider signing in and changing it as someone attempted to change it.
            
            Thanks, MilkMates`
          };
        
          let insertToken = await QueryDatabase("INSERT INTO reset_tokens (userid, email, reset_token, exp_date) "+
          "VALUES (" + userid + ", '" + email + "', '" + forgotPasswordToken + "', DATE_ADD(now(),interval 1 day))");
          if(!insertToken)
          {
                finalResponse[0].success = false;
                finalResponse[0].errorCode = 2;
                res.send(finalResponse).status(200).end();
          }
          else
          {
              // Send the email
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  res.status(500).send('Error sending email');
                } else {
                    finalResponse[1] = forgotPasswordToken;
                    finalResponse[0].success = true;
                    finalResponse[0].errorCode = 0;
                    res.send(finalResponse).status(200).end();
                }
              });
          }
    }
});

router.post('/AuthenticateForgotToken', async function(req, res, next)
{
    const resetToken = req.body.resetToken;

    //ERROR CODES:
    // 0 - success
    // 1 - select token error
    // 2 - no valid token

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let authenticateToken = await QueryDatabase("SELECT r.*, u.username FROM reset_tokens r INNER JOIN users u ON r.userid = u.userid " +
                                                "WHERE reset_token = '" + resetToken + "' AND exp_date > NOW();");
    if(!authenticateToken)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else if(authenticateToken && authenticateToken.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        finalResponse[1] = authenticateToken[0].username;
        finalResponse[0].success = true;
        finalResponse[0].errorCode = 0;
        res.send(finalResponse).status(200).end();
    }
});

router.put('/ForgotUserPassword', async function(req, res, next)
{
    const user = req.body.username;
    var hash = crypto.createHash('sha256').update("salt"+req.body.newPassword+"pepper").digest('hex');

    //ERROR CODES:
    // 0 - success
    // 1 - No user with that username exists
    // 2 - SQL update query error

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let userExists = await QueryDatabase("SELECT * FROM users WHERE username = '" + user + "';");

    if(userExists && userExists.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let updateUserPassword = await QueryDatabase("UPDATE users SET password = '" + hash + "' WHERE username = '" + user + "';");

        if(!updateUserPassword)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 2;
            res.send(finalResponse).status(200).end();
        }
        else
        {
            finalResponse[0].success = true;
            finalResponse[0].errorCode = 0;
            res.send(finalResponse).status(200).end();
        }
    }
});

router.post('/IsUserAuthenticated', async function(req, res, next)
{
    const userid = req.body.userid;
    const authToken = req.body.authToken;
    
    //ERROR CODES:
    // 0 - success
    // 1 - Error selecting auth entries
    // 2 - User is not authenticated

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let authenticated = await QueryDatabase(
        "SELECT a.*, u.username, u.isAdmin, u.fName, u.lName FROM auth_tokens a INNER JOIN users u ON a.userid = u.userid WHERE a.userId = " + userid + " AND auth_token = '" + authToken + "' AND exp_date > NOW();");
    
    if(!authenticated)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else if(authenticated && authenticated.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        finalResponse[1] = authenticated[0];
        finalResponse[0].success = true;
        finalResponse[0].errorCode = 0;
        res.send(finalResponse).status(200).end();
    }
});

router.get('/IsUserAdmin', async function(req, res, next)
{
    const user = req.query.username;
    
    //ERROR CODES:
    // 0 - success
    // 1 - User is not an admin
    // 2 - No user with that username exists

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let userExists = await QueryDatabase("SELECT * FROM users WHERE username = '" + user + "';");

    if(userExists && userExists.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let isUserAdmin = await QueryDatabase("SELECT isAdmin FROM users WHERE username = '" + user + "';");

        if(!isUserAdmin[0].isAdmin)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 1;
            res.send(finalResponse).status(200).end();
        }
        else
        {
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