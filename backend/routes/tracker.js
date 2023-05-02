var express = require('express');
var mysql = require('mysql2');
var router = express.Router();

router.get('/GetBatch', async function(req, res, next)
{
    const batchID = req.query.batchID;
    
    //TODO: Make this list a specific batch
    let response = await QueryDatabase("SELECT * FROM batches WHERE batchId = " + batchID + ";");
    
    console.log(response);
    res.send(response).status(200).end();
});

router.get('/GetAllBatchesByUser', async function(req, res, next)
{
    const username = req.query.username;
    
    //ERROR CODES:
    // 0 - success
    // 1 - SQL get userId query error
    // 2 - No user with that username
    // 3 - SQL get batches query error

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let userId = await QueryDatabase("SELECT userid FROM users WHERE username = '" + username + "';");
    if(!userId)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else if(userId && userId.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let batches = await QueryDatabase("SELECT * FROM batches WHERE userId = " + userId[0].userid + " AND isActive = TRUE;");

        var i = 1;

        for(batch of batches)
        {
            var batchId = batch.batchId;
            var batchEvents = await QueryDatabase("SELECT * FROM batchEvents WHERE batchId = " + batchId + " AND isActive = 1;");
            if(batchEvents)
            {
                var batchInfo = 
                {
                    batchId: batchId,
                    userId: batch.userId,
                    productionDate: batch.productionDate,
                    volume: batch.volume,
                    diet: batch.diet,
                    sickness: batch.sickness,
                    medications: batch.medications,
                    caffeine: batch.caffeine,
                    vaccines: batch.vaccines,
                    isActive: batch.isActive,
                    isListed: batch.isListed,
                    events: batchEvents
                }
    
                finalResponse[i] = batchInfo;
                console.log(batchInfo);
            }
            i += 1;
        }

        finalResponse[0].success = true;
        finalResponse[0].errorCode = 0;
        res.send(finalResponse).status(200).end();
        
    }
});

router.post('/AddBatch', async function(req, res, next)
{
    const username = req.body.username;
    const volume = req.body.volume;
    const diet = req.body.diet;
    const sickness = req.body.sickness;
    const medications = req.body.medications;
    const caffeine = req.body.caffeine;
    const vaccines = req.body.vaccines;
    const date = req.body.date;
    
    //ERROR CODES:
    // 0 - success
    // 1 - SQL get userId query error
    // 2 - No user with that username
    // 3 - SQL add batch query error
    // 4 - SQL select batchid error
    // 5 - no batches returned
    // 6 - SQL add batchEvent query error

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let userId = await QueryDatabase("SELECT userid FROM users WHERE username = '" + username + "';");
    if(!userId)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else if(userId && userId.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let response = await QueryDatabase("INSERT INTO batches (userId, productionDate, volume, diet, sickness, medications, caffeine, vaccines)" +
        "VALUES ( '" + userId[0].userid + "', '" + date + "', '" + volume + "', '" + diet + "', '" + sickness + "', '" + medications + "', " + caffeine + ", '" + vaccines + "');");
        
        console.log(response);        
        if(!response)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 3;
            res.send(finalResponse).status(200).end();
        }
        else
        {
            let batchId = await QueryDatabase("SELECT batchId FROM batches WHERE userId = '" + userId[0].userid + "' ORDER BY batches.batchId DESC;");
            if(!batchId)
            {
                finalResponse[0].success = false;
                finalResponse[0].errorCode = 4;
                res.send(finalResponse).status(200).end();
            }
            else if(batchId && batchId.length === 0)
            {
                finalResponse[0].success = false;
                finalResponse[0].errorCode = 5;
                res.send(finalResponse).status(200).end();
            }
            else
            {
                let batchEvent = await QueryDatabase("INSERT INTO batchEvents (batchId, event, notes) VALUES ( '" + batchId[0].batchId + "', 'logged', 'the batch was created');")
                
                if(!batchEvent)
                {
                    finalResponse[0].success = false;
                    finalResponse[0].errorCode = 6;
                    res.send(finalResponse).status(200).end();
                }
                else
                {
                    let batch = await QueryDatabase("SELECT * FROM batches WHERE batchId = " + batchId[0].batchId + ";");
                    let batchEvents = await QueryDatabase("SELECT * FROM batchEvents WHERE batchId = " + batchId[0].batchId + ";");

                    if(batchEvents && batch)
                    {
                        var batchInfo = 
                        {
                            batchId: batch[0].batchId,
                            userId: batch[0].userId,
                            productionDate: batch[0].productionDate,
                            volume: batch[0].volume,
                            diet: batch[0].diet,
                            sickness: batch[0].sickness,
                            medications: batch[0].medications,
                            caffeine: batch[0].caffeine,
                            vaccines: batch[0].vaccines,
                            isActive: batch[0].isActive,
                            isListed: batch[0].isListed,
                            events: batchEvents
                        }

                        finalResponse[1] = batchInfo;
                    }

                            
                    finalResponse[0].success = true;
                    finalResponse[0].errorCode = 0;
                    res.send(finalResponse).status(200).end();
                }
            }
        }
    }
});

router.post('/AddBatchEvent', async function(req, res, next)
{
    const batchId = req.body.batchId;
    const batchEventType = req.body.batchEventType;
    const notes = req.body.notes;
    const date = req.body.date;
    
    //ERROR CODES:
    // 0 - success
    // 1 - SQL batchEvent add error
    // 2 - SQL get batchEvent query error
    // 3 - no batchEvent returned

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let batchEventAdd = await QueryDatabase("INSERT INTO batchEvents (batchId, event, notes, eventDate) VALUES ( " + batchId + ", '" + batchEventType + "', '" + notes + "', '" + date + "');");
    if(!batchEventAdd)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let batchEvent = await QueryDatabase("SELECT * FROM batchEvents WHERE batchId = " + batchId + " AND event = '" + batchEventType + "';")
        if(!batchEvent)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 2;
            res.send(finalResponse).status(200).end();
        }
        else if(batchEvent && batchEvent.length === 0)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 3;
            res.send(finalResponse).status(200).end();
        }
        else
        {
            finalResponse[1] = batchEvent[0];
            finalResponse[0].success = true;
            finalResponse[0].errorCode = 0;
            res.send(finalResponse).status(200).end();
        }
    }
});

router.put('/EditBatch', async function(req, res, next)
{
    const batchId = req.body.batchId;
    const date = req.body.date;
    const volume = req.body.volume;
    const diet = req.body.diet;
    const sickness = req.body.sickness;
    const medications = req.body.medications;
    const caffeine = req.body.caffeine;
    const vaccines = req.body.vaccines;
    
    //ERROR CODES:
    // 0 - success
    // 1 - SQL get batch query error
    // 2 - No batch with that batchId
    // 3 - SQL update batch query error
    // 4 - SQL select batchid error
    // 5 - no batches returned

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let batchExists = await QueryDatabase("SELECT * FROM batches WHERE batchId = " + batchId + ";")
    if(!batchExists)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else if(batchExists && batchExists.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 2;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let updateBatch = await QueryDatabase("UPDATE batches SET " +
        "productionDate = '" + date + "', volume = '" + volume + "', diet = '" + diet + "', sickness = '" + sickness + "', medications = '" + medications + "', caffeine = " + caffeine + ", vaccines = '" + vaccines + "' " +
        "WHERE batchId = " + batchId + ";");  
        if(!updateBatch)
        {
            finalResponse[0].success = false;
            finalResponse[0].errorCode = 3;
            res.send(finalResponse).status(200).end();
        }
        else
        {
            let batch = await QueryDatabase("SELECT * FROM batches WHERE batchId = " + batchId + ";");
            let batchEvents = await QueryDatabase("SELECT * FROM batchEvents WHERE batchId = " + batchId + ";");

            if(batchEvents && batch)
            {
                var batchInfo = 
                {
                    batchId: batch[0].batchId,
                    userId: batch[0].userId,
                    productionDate: batch[0].productionDate,
                    volume: batch[0].volume,
                    diet: batch[0].diet,
                    sickness: batch[0].sickness,
                    medications: batch[0].medications,
                    caffeine: batch[0].caffeine,
                    vaccines: batch[0].vaccines,
                    isActive: batch[0].isActive,
                    isListed: batch[0].isListed,
                    events: batchEvents
                }

                finalResponse[1] = batchInfo;
            }

                            
            finalResponse[0].success = true;
            finalResponse[0].errorCode = 0;
            res.send(finalResponse).status(200).end();
        }
    }
});

router.put('/DeleteBatch', async function(req, res, next)
{
    const batchId = req.body.batchId;
    
    //ERROR CODES:
    // 0 - success
    // 1 - No batch with that batchID exists
    // 2 - SQL update query error

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let batchExists = await QueryDatabase("SELECT * FROM batches WHERE batchId = " + batchId + ";");

    if(batchExists && batchExists.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let makeBatchInactive = await QueryDatabase("UPDATE batches SET isActive = FALSE WHERE batchId = " + batchId + ";");

        if(!makeBatchInactive)
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

router.put('/DeleteBatchEvent', async function(req, res, next)
{
    const batchEventId = req.body.batchEventId;
    
    //ERROR CODES:
    // 0 - success
    // 1 - No batch with that batchID exists
    // 2 - SQL update query error

    var finalResponse = 
    [
        {
            success: true,
            errorCode: 0
        }
    ]

    let batchEventExists = await QueryDatabase("SELECT * FROM batchEvents WHERE batchEventId = " + batchEventId + ";");

    if(batchEventExists && batchEventExists.length === 0)
    {
        finalResponse[0].success = false;
        finalResponse[0].errorCode = 1;
        res.send(finalResponse).status(200).end();
    }
    else
    {
        let makeBatchEventInactive = await QueryDatabase("UPDATE batchEvents SET isActive = FALSE WHERE batchEventId = " + batchEventId + ";");

        if(!makeBatchEventInactive)
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