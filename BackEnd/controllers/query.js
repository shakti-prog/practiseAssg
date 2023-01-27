
// import { MongoClient } from "mongodb";

// const dbURI = 'mongodb+srv://test:1234@cluster0.xqjdndp.mongodb.net/?retryWrites=true&w=majority';



const database = require('../app');
const {getPostData} = require('../utils/utils');

const showQueries = (req,res) =>{
    try{
        const collection = database.collection('ticket');
        const result = database.collection.find({}).toArray();

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
        console.log(body);

        //const result =  database.collection.insert(body);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({message:'Query is submitted'}));
        res.end();

        console.log('Ticket was inserted in Document with the id ${result.insertedID}');
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



