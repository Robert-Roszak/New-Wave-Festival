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

        const testConcertTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: '618fa89d4052bf37eaa0caab', price: 40, day: 2, seatsCount: 10 });
        await testConcertTwo.save();
    });

    after(async () => {
        await Concert.deleteMany();
    });

    it('/ should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });
  
    it('/:id should return one concert by :id ', async () => {
        const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });
});
