const expect = require('expect');
const request = require('supertest');


const { app } = require('./../server');
var mongoose =require('./../db/mongoose');
const { plant } = require('./../models/plant');


beforeEach((done) => {
    plant.remove({}).then(() => done());
  });
describe('POST /insertPlants', () => {
    it('should create a new plant', (done) => {
        var name = 'lale';
        request(app)
            .post('/insertPlant')
            .send({ name })
            .expect(200)
            .expect((res) => {
                expect(res.body.name).toBe(name);
            })
            .end((err,res)=>{
                if(err){
                    return done(err);
                }

                plant.find().then((plants)=>{
                    expect(plants.length).toBe(2);
                    expect(plants[0].name).toBe(name);
                    done();
                }).catch((err)=>{
        