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

describe('GET /api/concerts', () => {
    beforeEach(async () => {
        const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: '618fa8174052bf37eaa0caaa', price: 25, day: 3, seatsCount: 30 });
        await testConcertOne.save();
    });

    afterEach(async () => {
        await Concert.deleteMany();
    });
 
    it('/:id should delete one concert by :id ', async () => {
        const res = await request(server).delete('/api/concerts/5d9f1140f10a81216cfd4408');
        const deletedConcert = await Concert.findOne({ _id: '5d9f1140f10a81216cfd4408'})
        expect(res.status).to.be.equal(200);
        expect(deletedConcert).to.be.null;
    });
});
