const express = require('express');
const batteryRouter = require('./src/modules/Batteries/battery.routes');
const path = require('path');
const Database = require('./src/core/database');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');



const app = express();
const admin = require("firebase-admin"); 
const credentials = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const fdb = admin.firestore();



const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/", express.static(__dirname + "/public"));

app.use('/api',batteryRouter);

app.get('/', (req, res) => {
    res.send('this api works!');
});

app.get('/plants',async (req,res) => {
    try{
    //r = JSON.parse(req.body);
    console.log(req.query);
    const plantRef = fdb.collection("plant");
    const getActivePlant = await plantRef.where('selected', '==', true).get();
    // Get active plant id
    const activePlant = getActivePlant.docs[0].ref;
    const measure_types = ["humidity", "light", "soil_moist", "temperature"];

    measure_types.forEach(async element => {
        console.log(element);
        const getMeasureDoc = await fdb.collection("measure");
        const getMeasureTypeRef = await (await fdb.collection("measure_type").doc(element).get()).ref;
        
        console.log(getMeasureTypeRef);
        await getMeasureDoc.add({
            measure_type: getMeasureTypeRef,
            plant: activePlant,
            timestamp: Timestamp.now(),
            value: parseInt(req.query[element])
        });
        
        console.log("insertado");
    });

    //const measureRef = fdb.collection("measure");
    res.send("Updated");
    }
    catch{
        res.send(404);
    }
});

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger Config
const swaggerOptions = {
    swaggerDefinition: {
        swagger: '2.0',
        info: {
            title: 'Kart Raing!',
            description: 'A Race-Pilot server',
            version: '1.0.0',
            servers: ['http://localhost:'+port]
        }
    },
    apis: ['./src/modules/**/*.routes.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


Database.connect().then(() => {
    // Listen to port
    app.listen(port, () => {
        console.log('App is listening to port ' + port);
    });
});
