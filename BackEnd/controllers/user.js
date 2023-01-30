const {getPostData} = require('../utils/utils');
let mongoutil = require('../utils/mongoutil');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const home = (req,res) => {
    res.writeHead(200, { 'Content-Type': 'application/html' });
    res.write('<h2>Home Page</h2>')
    res.end()
}
const userRegister = async (req,res) =>{
    try{
        const body = JSON.parse(await getPostData(req));
        const {name,email,password} = body

        if (!(email && password && name)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({message:'All input required'}));
        }
        var db = mongoutil.getDb();
        const alreadyAUser = await db.collection('user').findOne({email})

        if(alreadyAUser){
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({message:'User Already Exist. Please Login'}));
        }
        
        encryptedPassword =   await bcrypt.hash(password,10)
        
        const token = jwt.sign(
            { email,password },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
      
        const user = {
            name,
            email: email.toLowerCase(),
            password : encryptedPassword,
            token
        }

        let result = await db.collection('user').insertOne(user)
        // console.log(result)
      
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({message:'New user created'}));
        res.end();

    }catch(err){
        console.log('Error in user registration: '+ err);
    }
}
const userLogin = async (req,res) =>{
    try{
        const body = JSON.parse(await getPostData(req));
        const {email,password} = body

        if(!(email && password)){
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({message:'All input required'}));
        }

        var db = mongoutil.getDb();
        const alreadyAUser = await db.collection('user').findOne({email})
        const passwordCheck = await bcrypt.compare(password,alreadyAUser.password)

        if(alreadyAUser && passwordCheck ){
            const token = jwt.sign(
                { email,password },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
              const filter = {email:email};
              const options = { upsert: false };
              const updateDoc = {$set: {"token":token}};

              const result = await db.collection('user').updateOne(filter, updateDoc);

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.write(JSON.stringify({message:'User logged in'}));
              res.end()

        }else{
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({message:'Invalid Credentials'}));
        }

    }catch(err){
        console.log('Error in user login: '+ err);
    }
}

module.exports = {
    home,
    userRegister,
    userLogin
}

