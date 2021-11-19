const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');
const mongoose = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if(NODE_ENV === 'production') dbUri = 'url to remote db';
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDB';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

describe('PUT /api/concerts', () => {
    beforeEach(async () => {
        const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: '618fa8174052bf37eaa0caaa', price: 25, day: 3, seatsCount: 30 });
        await testConcertOne.save();

        const testConcertTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: '618fa89d4052bf37eaa0caab', price: 40, day: 2, seatsCount: 10 });
        await testConcertTwo.save();
    });

    afterEach(async () => {
        await Concert.deleteMany();
    });

    it('/:id should update chosen concert and return success', async () => {
        const res = await request(server).put('/api/concerts/5d9f1159f81ce8d1ef2bee48').send({  _id: '5d9f1159f81ce8d1ef2bee48', performer: '618fa89d4052bf37eaa0caab', price: 7654, day: 2, seatsCount: 10 });
        const updatedConcert = await Concert.findOne({ price: 7654 });
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(updatedConcert).to.not.be.null;
        expect(updatedConcert.price).to.be.equal(7654);

    });
});
