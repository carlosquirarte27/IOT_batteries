const Database = require('./database');
const { ObjectId } = require('mongodb');


class Model {

    collection;

    constructor(collectionName) {
        // Set collection
        this.collection = Database.collection(collectionName);
    }

    getAll() {
        return new Promise((accept, reject) => {
            this.collection.find().toArray((err, results) => {
             if (err) {
                 reject(err);
             } else {
                accept(results);
             }
            });
        });
    }

    getOne(any) {
        if (!any.email){
            console.log(any)
            console.log("Entrando por id")
            return this.collection.findOne({
                _id: ObjectId(any)
            });
        }
        else{ 
            console.log("Preparando para buscar por email")
            return this.collection.findOne({
            email: any.email,
            password: any.password
        });
        }
    }

    updateOne(query, update) {
        return this.collection.updateOne(query, updateOperations, options);
      }

    find(id){
        console.log("Lets find: "+id)
        return this.collection.findOne({
            race_id: id
        })
    }

}

module.exports = Model;