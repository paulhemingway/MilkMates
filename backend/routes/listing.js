var express = require('express');
var mysql = require('mysql2');
var router = express.Router();

router.get('/GetListing', async function(req, res, next)
{
    const listingid = req.query.listingid;

    //ERROR CODES:
    // 0 - success
    // 1 - SQL get query error
    // 2 - no listing with that listingId
    // 3 - SQL get user error
    // 4 - no user with that userId

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let listing = await QueryDatabase("SELECT l.*, b.productionDate, b.volume, b.diet, b.sickness, b.medications, b.caffeine, b.vaccines, u.username,  u.zipCode, be.event AS status " +
    "FROM listings l " +
    "INNER JOIN batches b ON l.batchId = b.batchId " +
    "INNER JOIN users u ON l.userId = u.userId " +
    "INNER JOIN batchEvents be ON l.batchId = be.batchId " +
    "WHERE l.isActive = 1 AND be.eventDate = (SELECT MAX(eventDate) FROM batchEvents WHERE batchId = l.batchId) AND l.listingId = " + listingid + " " +
    "ORDER BY l.lastActiveDateTime DESC;");
    if(!listing)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else if(listing && listing.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        //let user = await QueryDatabase("SELECT * FROM users WHERE userid = " + listing[0].userId + ";");
        let user = await QueryDatabase("SELECT * FROM users WHERE userid = " + listing[0].userId + ";");
        if(!user)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 3;
            res.send(finalResponse).status(200).end();
        }
        else if(user && user.length === 0)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 4;
            res.send(finalResponse).status(200).end();
        }
        else
        {
            finalResponse[1] = 
            {
                username: user[0].username,
                listing: listing
            };
            finalResponse[0].success = true;
            finalResponse[0].errorCode = 0;
            res.send(finalResponse).status(200).end();
        }
    }
});
router.get('/GetAllListings', async function(req, res, next)
{
    //ERROR CODES:
    // 0 - success
    // 1 - SQL get query error
    // 2 - no listings

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let response = await QueryDatabase("SELECT l.*, b.productionDate, b.volume, b.diet, b.sickness, b.medications, b.caffeine, b.vaccines, u.username,  u.zipCode, be.event AS status " +
    "FROM listings l " +
    "INNER JOIN batches b ON l.batchId = b.batchId " +
    "INNER JOIN users u ON l.userId = u.userId " +
    "INNER JOIN batchEvents be ON l.batchId = be.batchId " +
    "WHERE l.isActive = 1 AND be.eventDate = (SELECT MAX(eventDate) FROM batchEvents WHERE batchId = l.batchId) " +
    "ORDER BY l.lastActiveDateTime DESC;");
    
    if(!response)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else if(response && response.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        finalResponse[1] = response;
        finalResponse[0].success = true;
        finalResponse[0].errorCode = 0;
        res.send(finalResponse).status(200).end();
    }
});

router.get('/GetAllListingsByUser', async function(req, res, next)
{
    const user = req.query.username;
    
    //ERROR CODES:
    // 0 - success
    // 1 - SQL get query error
    // 2 - no listings with these parameters

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let response = await QueryDatabase("SELECT l.*, b.productionDate, b.volume, b.diet, b.sickness, b.medications, b.caffeine, b.vaccines, u.username,  u.zipCode, be.event AS status " +
    "FROM listings l " +
    "INNER JOIN batches b ON l.batchId = b.batchId " +
    "INNER JOIN users u ON l.userId = u.userId " +
    "INNER JOIN batchEvents be ON l.batchId = be.batchId " +
    "WHERE l.isActive = 1 AND be.eventDate = (SELECT MAX(eventDate) FROM batchEvents WHERE batchId = l.batchId) AND u.username = '" + user + "' " +
    "ORDER BY l.lastActiveDateTime DESC;");
    if(!response)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else if(response && response.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        finalResponse[1] = response;
        finalResponse[0].success = true;
        finalResponse[0].errorCode = 0;
        res.send(finalResponse).status(200).end();
    }
});

router.get('/GetAllListingsByZIP', async function(req, res, next)
{
    const zipCode = req.query.zipCode;
    
    //ERROR CODES:
    // 0 - success
    // 1 - SQL update query error

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let response = await QueryDatabase("SELECT l.*, b.productionDate, b.volume, b.diet, b.sickness, b.medications, b.caffeine, b.vaccines, u.username,  u.zipCode, be.event AS status " +
    "FROM listings l " +
    "INNER JOIN batches b ON l.batchId = b.batchId " +
    "INNER JOIN users u ON l.userId = u.userId " +
    "INNER JOIN batchEvents be ON l.batchId = be.batchId " +
    "WHERE l.isActive = 1 AND be.eventDate = (SELECT MAX(eventDate) FROM batchEvents WHERE batchId = l.batchId) AND u.zipCode = " + zipCode + " " +
    "ORDER BY l.lastActiveDateTime DESC;");
    if(!response)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else if(response && response.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        finalResponse[1] = response;
        finalResponse[0].success = true;
        finalResponse[0].errorCode = 0;
        res.send(finalResponse).status(200).end();
    }
});

router.post('/CreateListing', async function(req, res, next)
{
    const username = req.body.username;
    const isGiving = req.body.isGiving;
    const title = req.body.title;
    const description = req.body.description;
    var price = req.body.price;
    const batchId = req.body.batchId;
    const showPhone = req.body.showPhone;
    const showEmail = req.body.showEmail;
    
    //ERROR CODES:
    // 0 - success
    // 1 - SQL get userid query error
    // 2 - no user with that username
    // 3 - SQL get batch query error
    // 4 - no batch with that batchId
    // 5 - SQL get listing with batchId error
    // 6 - that batch is already listed
    // 7 - SQL add listing query error
    // 8 - SQL get listing query error
    // 9 - no listing with that batchId
    // 10 - SQL add batchListing query error
    // 11 - SQL updated batch isListed error

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let userid = await QueryDatabase("SELECT userid FROM users WHERE username = '" + username + "';");
    if(!userid)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else if(userid && userid.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let batchIdExists = await QueryDatabase("SELECT * FROM batches WHERE batchId = " + batchId + ";")
        if(!batchIdExists)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 3;
            res.send(finalResponse).status(200).end();
        }
        else if(batchIdExists && batchIdExists.length === 0)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 4;
            res.send(finalResponse).status(200).end();
        }
        else
        {
            let batchAlreadyListed = await QueryDatabase("SELECT isListed FROM batches WHERE batchId = " + batchId + ";");
            if(!batchAlreadyListed)
            {
                finalResponse[0].success = false;
                finalResponse[0].errorCode = 5;
                res.send(finalResponse).status(200).end();
            }
            else if(batchAlreadyListed && batchAlreadyListed[0].isListed === 1)
            {
                finalResponse[0].success = false;
                finalResponse[0].errorCode = 6;
                res.send(finalResponse).status(200).end();
            }
            else
            {

                if(price === "")
                {
                    price = 0.00;
                }
        
                let addListing = await QueryDatabase("INSERT INTO listings (userId, isGiving, title, description, price, batchId, showPhone, showEmail)" + 
                "VALUES (" + userid[0].userid + ", " + isGiving + ", '" + title + "', '" + description + "', " + price +", " + batchId + ", " + showPhone + ", " + showEmail + ");");
        
                if(!addListing)
                {
                    finalResponse[0].success = false;
                    finalResponse[0].errorCode = 7;
                    res.send(finalResponse).status(200).end();
                }
                else
                {
                    let listingInfo = await QueryDatabase("SELECT * FROM listings WHERE batchId = '" + batchId + "';");
                    if(!listingInfo)
                    {
                        finalResponse[0].success = false;
                        finalResponse[0].errorCode = 8;
                        res.send(finalResponse).status(200).end();
                    }
                    else if(listingInfo && listingInfo.length === 0)
                    {
                        finalResponse[0].success = false;
                        finalResponse[0].errorCode = 9;
                        res.send(finalResponse).status(200).end();
                    }
                    else
                    {
                        let addBatchListing = await QueryDatabase("INSERT INTO batchListings (listingId, availableDate, expiryDate, batchId) " +
                        "VALUES (" + listingInfo[0].listingId + ", CURRENT_TIMESTAMP, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 30 DAY), " + batchId + " );");
        
                        if(!addBatchListing)
                        {
                            finalResponse[0].success = false;
                            finalResponse[0].errorCode = 10;
                            res.send(finalResponse).status(200).end();
                        }
                        else
                        {
                            let markBatchListed = await QueryDatabase("UPDATE batches SET isListed = TRUE WHERE batchId = " + batchId + ";");
                            if(!markBatchListed)
                            {
                                finalResponse[0].success = false;
                                finalResponse[0].errorCode = 11;
                                res.send(finalResponse).status(200).end();
                            }
                            else
                            {
                                finalResponse[0].success = true;
                                finalResponse[0].errorCode = 0;
                                res.send(finalResponse).status(200).end();
                            }
                        }               
                    }
                }
            }
        }
    }
});

router.put('/UpdateListing', async function(req, res, next)
{
    //TODO: Figure out if anything else is needed
    const listingID = req.body.listingID;
    
    //TODO: Make this edit a listing
    let response = await QueryDatabase("SELECT * FROM test WHERE firstname = '" + listingID + "';");
    
    console.log(response);
    res.send(response).status(200).end();
});

router.put('/DeleteListing', async function(req, res, next)
{
    const listingId = req.body.listingId;
    
    //ERROR CODES:
    // 0 - success
    // 1 - No listing with that listingId exists
    // 2 - SQL update query error
    // 3 - SQL error getting batchId
    // 4 - no batchId returned
    // 5 - SQL set batch not listed error

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let listingExists = await QueryDatabase("SELECT * FROM listings WHERE listingId = " + listingId + ";");

    if(listingExists && listingExists.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let makeListingInactive = await QueryDatabase("UPDATE listings SET isActive = FALSE WHERE listingId = " + listingId + ";");

        if(!makeListingInactive)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 2;
            res.send(finalResponse).status(200).end();
        }
        else
        {
            let batchId = await QueryDatabase("SELECT batchId FROM listings WHERE listingId = " + listingId + ";")
            if(!batchId)
            {
                finalResponse[0].success = false;
                finalResponse[0].errorCode = 3;
                res.send(finalResponse).status(200).end();
            }
            else if(batchId && batchId.length === 0)
            {
                finalResponse[0].success = false;
                finalResponse[0].errorCode = 4;
                res.send(finalResponse).status(200).end();
            }
            else
            {
                let setBatchNotListed = await QueryDatabase("UPDATE batches SET isListed = FALSE WHERE batchId = " + batchId[0].batchId + ";");
                if(!setBatchNotListed)
                {
                    finalResponse[0].success = false;
                    finalResponse[0].errorCode = 5;
                    res.send(finalResponse).status(200).end();
                }
                else
                {
                    finalResponse[0].success = true;
                    finalResponse[0].errorCode = 0;
                    res.send(finalResponse).status(200).end();
                }
            }
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