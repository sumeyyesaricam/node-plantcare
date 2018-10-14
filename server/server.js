var express = require('express');
var bodyParser = require('body-parser');
var mongoose =require('./db/mongoose');
var plant = require('./models/plant');
var app = express();
const port =process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/insertPlant', (req, res) => {
    var Plant = new plant({
        name: req.body.name,
        description: req.body.description,
        wateringInterval: req.body.wateringInterval,
        imageUrl: req.body.imageUrl,
        fertilizerInterval: req.body.fertilizerInterval,
        wateringTime: req.body.wateringTime,
        fertilizierTime: req.body.fertilizierTime,
    });

    Plant.save().then((doc) => {
        res.send(doc);
        console.log('Eklendi.');
    }, (err) => {
        console.log('Hatali.'+err);
        res.status(400).send(err);
    });
});
app.listen(port, () => {
    console.log('Started on port 3000'