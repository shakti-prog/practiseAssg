const http = require('http');
const fs = require('fs');
var mongoutil = require( './utils/mongoutil' );

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
    console.log('db connnected')
});

const server = http.createServer((req, res) => {

    if(req.url === '/' && req.method === 'GET'){
        //userSignin(req,res);
    }else if(req.url === '/' && req.method === 'GET'){

    }else if(req.url === '/allqueries' && req.method === 'GET'){
        showQueries(req,res);
    }else if(req.url === '/createquery' && req.method === 'POST'){
        addQuery(req,res)
    }else if(req.url === '/resolvequery' && req.method === 'POST'){
        updateQuery(req,res);
    }else if(req.url === '/deletequery' && req.method === 'POST'){
        deleteQuery(req,res);
    }else{
        res.writeHead(404,{'Content-Type':'application/json'})
        res.end(JSON.stringify({message:'Error 404, Page not found'}))
    }

       
});

server.listen(3000,'localhost',()=>{
    console.log('Listening for requests on port 3000')
});


 module.exports = {

}
