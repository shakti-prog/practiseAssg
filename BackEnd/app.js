const http = require('http');
const fs = require('fs');
const databaseName = "soProject";
let mongoutil = require( './utils/mongoutil' );

const{
    userSignin,
    userSignup
} = require('./controllers/user');

const{
    showQueries,
    addQuery,
    updateQuery,
    deleteQuery
} = require('./controllers/query')

mongoutil.connectToServer( function( err, client ) {
    if (err) console.log(err);
  } );



// MongoClient.connect(dburi, { useNewUrlParser: true }, async (error, client) => {
//   if (error) {
//     return console.log("Connection failed for some reason");
//   }
//   console.log("Connection established - All well");
//   const db = client.db(databaseName);
//   const result = await db.collection('ticket').find({}).toArray();
//   console.log(result)
// });


const server = http.createServer((req, res) => {

    if(req.url === '/' && req.method === 'GET'){
        //userSignin(req,res);
    }else if(req.url === '/' && req.method === 'GET'){

    }else if(req.url === '/allqueries' && req.method === 'GET'){
        showQueries(req,res);
    }else if(req.url === '/createquery' && req.method === 'POST'){
        addQuery(req,res)
    }else if(req.url === '/' && req.method === 'GET'){
        updateQuery(req,res);
    }else if(req.url === '/' && req.method === 'GET'){
        deleteQuery(req,res);
    }else{
        res.writeHead(404,{'Content-Type':'application/json'})
        res.end(JSON.stringify({message:'Error 404, Page not found'}))
    }
    /*switch(req.url){
        case '/':
            console.log("SignIn")
            userSignin(req,res);
            break;
        case '/signup':
            console.log("Signup");
            userSignup(req,res);
            break;
        case '/allqueries':
            console.log("All queries");
            showQueries(req,res);
        case '/createquery':
            console.log("Create Query");
            addQuery(req,res);
            break;
        case '/resolvequery':
            console.log("Resolve Query");
            updateQuery(req,res);
            break;
        case '/deletequery':
            console.log("Delete query");
            deleteQuery(req,res);
        default:
            console.log("404");
            res.statusCode = 404;
            break;
    }*/
});

server.listen(3000,'localhost',()=>{
    console.log('Listening for requests on port 3000')
});


 module.exports = {

}
