const http = require('http');
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken')
const auth = require("./middleware/auth");
require("dotenv").config();
var mongoutil = require( './utils/mongoutil' );
const { homedir } = require('os');


const{
    home,
    userRegister,
    userLogin
} = require('./controllers/user');

const{
    showQueries,
    addQuery,
    updateQuery,
    deleteQuery
} = require('./controllers/query');


mongoutil.connectToServer( function( err, client ) {
    if (err) console.log(err);
    console.log('db connnected')
});

const server = http.createServer((req, res) => {

    if(req.url === '/' ){
        home(req,res)
    }else if(req.url === '/register'){
        userRegister(req,res)
    }else if(req.url === '/login'){
        userLogin(req,res)
    }else if(req.url === '/allqueries'){
        showQueries(req,res);
    }else if(req.url === '/createquery'){
        addQuery(req,res)
    }else if(req.url === '/resolvequery'){
        updateQuery(req,res);
    }else if(req.url === '/deletequery'){
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
