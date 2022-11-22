const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb+srv://kartsuser:Q8Tc4BdZM72mSUrl@kartapp.qvkrj.mongodb.net/pae-project?retryWrites=true&w=majority';

const Database = {
    dbInstance: null,
 
    connect: () => {
        return new Promise((accept, reject) => {
            MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
                if(err) {
                    reject(err);
                } else {
                    this.dbInstance = client.db();
                    accept(client);
                }
            }); //Error-first callback
        }); 
    },
    collection: (name) => {
        return this.dbInstance.collection(name);
    },
};

module.exports = Database;
