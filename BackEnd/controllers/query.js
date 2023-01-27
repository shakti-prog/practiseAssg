const {getPostData} = require('../utils/utils');
const bson = require('bson');
let mongoutil = require('../utils/mongoutil');



const showQueries = async (req,res) =>{
    try{
        var db = mongoutil.getDb();
        let result = await db.collection('ticket').find({}).toArray();
        console.log(result)
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(result));
        res.end();

        console.log("Queries displayed");

    }catch(err){
        console.log('Error in displaying queries: ' + err);
        res.end();
    }
}
const addQuery = async (req,res)=>{
    try{
        var db = mongoutil.getDb();
        const body = JSON.parse(await getPostData(req));
        console.log(body);

        let result = await db.collection('ticket').insertOne(body)
        console.log(result)

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({message:'Query is submitted'}));
        res.end();

        console.log('Ticket was inserted.');
    }
    catch(err){
        console.log('Error saving your query: '+ err);
        res.end();
    }
}

const updateQuery = async (req,res)=>{
    try{
        var db = mongoutil.getDb();
        let body = JSON.parse(await getPostData(req));

        const bsonObjectId = new bson.ObjectId(body._id);
        
        const filter = {_id:bsonObjectId};
        const options = { upsert: false };
        const updateDoc = {$set: {"status":"solved","comment":body.comment}};

        const result = await db.collection('ticket').updateOne(filter, updateDoc);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({message:'Query resolved'}));
        res.end();

        console.log('Query status was updated');
    }catch(err){
        console.log('Error in updating your query: '+ err);
        res.end();
    }
}

const deleteQuery = async (req,res) =>{
    try{
        var db = mongoutil.getDb();
        let body = JSON.parse(await getPostData(req));

        const bsonObjectId = new bson.ObjectId(body._id);

        const result = await db.collection('ticket').deleteOne({_id:bsonObjectId});

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



