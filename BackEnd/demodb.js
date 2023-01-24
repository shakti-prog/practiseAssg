const mongo = require('mongodb');

const dbURI = 'mongodb+srv://test:1234@cluster0.xqjdndp.mongodb.net/?retryWrites=true&w=majority';



const  {MongoClient} = require('mongodb');

MongoClient.connect(dbURI, (err, db)=> {
  if (err) throw err;
  var dbo = db.db("soProject");
  dbo.createCollection("ticket", (err, res) => {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});