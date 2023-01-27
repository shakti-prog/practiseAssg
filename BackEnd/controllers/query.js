const {getPostData} = require('../utils/utils');
const mongoutil = require('../utils/mongoutil');
const db = mongoutil.getDb();


const showQueries = async (req,res) =>{
    try{
        const result = await db.collection('ticket').find({}).toArray();
        console.log(result)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(result));
        res.end();

        console.log("Queries displayed");

    }catch(err){
        console.log('Error in showing queries:' + err);
        res.end();
    }
}
const addQuery = async (req,res)=>{
    try{
        //const collection = database.collection('ticket');
        const body = JSON.parse(await getPostData(req));
        //console.log(typeof(body));

        await db.collection('ticket').insertOne(body);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({message:'Query is submitted'}));
        res.end();

        //console.log('Ticket was inserted in Document with the id ${result.insertedID}');
    }
    catch(err){
        console.log('Error saving your query');
        res.end();
    }
}

const updateQuery = (req,res)=>{
    try{
        const collection = database.collection('ticket');
        const queryObj = JSON.parse(req);

        const filter = {_id:queryObj._id};
        const options = { upsert: false };
        const updateDoc = {$set: {status:"solved"}};

        const result = database.collection.update(filter, updateDoc, options);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({message:'Query resolved'}));
        res.end();

        console.log('Query status was updated with the id ${result.insertedID}');
    }catch(err){
        console.log('Error in updating your query');
        res.end();
    }
}

const deleteQuery = (req,res) =>{
    try{
        const collection = database.collection('ticket');
        const queryObj = JSON.parse(req);

        const result = database.collection.remove({_id:queryObj._id});

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({message:'Query is deleted'}));
        res.end();

        console.log('Query  was deleted');
    }catch(err){
        console.log('Error deleting your query');
        res.end();
    }
}

module.exports = {
    showQueries,
    addQuery,
    updateQuery,
    deleteQuery
}



