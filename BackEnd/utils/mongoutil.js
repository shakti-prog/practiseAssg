const MongoClient = require( 'mongodb' ).MongoClient;
const dburi = 'mongodb+srv://test:1234@cluster0.xqjdndp.mongodb.net/?retryWrites=true&w=majority'


let _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( dburi,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('soProject');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};