const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');
const mongoose = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConcertOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: '618fa8174052bf37eaa0caaa', price: 25, day: 3, seatsCount: 30 });
        await testConcertOne.save();
    });

    after(async () => {
        await Concert.deleteMany();
    });
 
    it('/:id should delete one concert by :id ', async () => {
        const res = await request(server).delete('/api/concerts/5d9f1140f10a81216cfd4408');
        const deletedConcert = await Concert.findOne({ _id: '5d9f1140f10a81216cfd4408'})
        expect(res.status).to.be.equal(200);
        expect(deletedConcert).to.be.null;
    });
});
