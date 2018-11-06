const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
var mongoose = require('./db/mongoose');
var plant = require('./models/plant');
const port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json());

app.post('/insertPlant', (req, res) => {
    var Plant = new plant({
        name: req.body.name,
        description: req.body.description,
        wateringInterval: req.body.wateringInterval,
        imageUrl: req.body.imageUrl,
        sunInterval: req.body.sunInterval,
        wateringTime: req.body.wateringTime,
        sunTime: req.body.sunTime,
        createdDate: req.body.createdDate,
    });

    Plant.save().then((doc) => {
        res.send(doc);
        console.log('Eklendi.');
    }, (err) => {
        console.log('Hatali.' + err);
        res.status(400).send(err);
    });
});

app.get('/getPlants', (req, res) => {
    plant.find().then((plants) => {
        res.send(plants);
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/getPlant/:id', (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(400).send("geçerli değil");
    }
    plant.findById(id).then((plant) => {
        if (!plant) {
            return res.status(400).send("not found");
        }
        res.send(plant);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.delete('/removePlant/:id', (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(400).send("geçerli değil");
    }
    plant.findByIdAndRemove(id).then((plant) => {
        if (!plant) {
            return res.status(400).send("not found");
        }
        res.send(plant);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.patch('/editPlant/:id', (req, res) => {
    var id = req.params.id
    var body = _.pick(req.body, ['name']);
    if (!ObjectID.isValid(id)) {
        return res.status(400).send("geçerli değil");
    }
    if (_.isBoolean())
        plant.findOneAndUpdate(id, {
            $set: body
        }, {
                new: true
            }).then((plant) => {
                if (!plant) {
                    return res.status(400).send("not found");
                }
                res.send(plant);
            }).catch((err) => {
                res.status(400).send(err);
            })
});

app.listen(port, () => {
    console.log('Started on port 3000');
});

module.exports = { app }

