const Database = require("../../core/database");
const { ObjectId } = require('mongodb');
const Battery = require("./battery.model");

const batteryController = {
    getAll: (req, res) => {
        console.log(req.query);
        const battery = new Battery();
        console.log("Bataconas");
        battery.getAll().then(results => {
            res.send(results);
        });
    },
    getOne: (req, res) => {
        const battery = new Battery();
        console.log(req.query);
        battery.getOne(req.params.id).then(result => {
            if(result) {
                res.send(result);
            } else {
                console.log("No existe la bateria solicitada")
                res.sendStatus(404);
            }
        });
    },
    create: (req, res) => {
        const new_battery = {
            Name:  req.body.Name,
            Percentage: req.body.Percentage,
            Temperature: req.body.Temperature
        };
        console.log(new_battery)
        Database.collection("Batteries").insertOne(new_battery, function(err, res) {
            if(err) console.log("err");
            else console.log("Todo bien");
    });
    res.send({status: "Se ha creado la bateria"});
    },
    delete: (req,res) => {
        console.log("vamos a borrar a :" +req.params.id)
        Database.collection("Batteries").deleteOne({_id: ObjectId(req.params.id)},function(err, res) {
        if (err){
            console.log(err)
            res.send({status: "Not Deleted"})
        }
    });
    res.send({status: "Ok, hemos borrado a: "+req.params.id})
    },
    update: (req,res) => {
        console.log("Vamos a actualizar: " + req.params.id);
        const updated_battery = {
            _id: req.params.id,
            Percentage: req.query["Percentage"],
            Temperature: req.query["Temperature"],
            Voltage: req.query["Voltage"]
        };

        Database.collection("Batteries").updateOne(
        {_id: ObjectId(req.params.id)},
        { $set: {"Temperature" : updated_battery.Temperature,"Percentage": updated_battery.Percentage,"Voltage": updated_battery.Voltage,"Current": updated_battery.Current}},
        function(err, res) {
            if (err){
                console.log(err)
                res.send({status: "Not updated"})
            }
        });
        res.send({message:"se ha actualizado a : "+req.body.Name})
    }
}

module.exports = batteryController;


