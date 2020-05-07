const mongoUri = 'mongodb://localhost';
const mongoUri = 'mongodb+srv://shreesh:gottacatchemall@projectcorontine-ohoqg.mongodb.net/test?retryWrites=true&w=majority';
const mongodb = require('mongodb');

module.exports = class mongo {
  static async getUserDb(){
    const client = await mongodb.MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client.db('userLogin').collection('users');
  }
}
