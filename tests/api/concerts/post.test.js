const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');
const mongoose = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/concerts', () => {
    after(async () => {
        await Concert.deleteMany();
    });

    it('/ should insert new concert to db and return success', async () => {
        const res = await request(server).post('/api/concerts').send({ performer: '618fa89d4052bf37eaa0caab', price: 400, day: 2, seatsCount: 10});
        const newConcert = await Concert.findOne({ performer: '618fa89d4052bf37eaa0caab'});
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(newConcert).to.not.be.null;
    });
});
