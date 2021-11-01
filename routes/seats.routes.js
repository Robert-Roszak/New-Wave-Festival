const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const getSeatsFromLink = (req) => {
    const seat = db.seats.find(seat => seat.id.toString() == req.params.id);
    if (seat) return seat;
    else return { message: 'No such seat...' };
};

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(getSeatsFromLink(req));
});

router.route('/seats/').post((req, res) => {
    const { day, seat, client, email } = req.body;
    if (day && seat && client && email) {
        const toAdd = {id: uuidv4(), day: day, seat: seat, client: client, email: email};
        db.seats.push(toAdd);
        res.json({ message: 'Added...' });
    }
    else res.json({ message: 'Please provide all details...' });
});

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    if (day && seat && client && email) {
        const toEdit = getSeatsFromLink(req);
        toEdit.day = day;
        toEdit.seat = seat;
        toEdit.client = client;
        toEdit.email = email;
        res.json({ message: 'Edited...' });
    }
    else res.json({ message: 'Please provide all details...' });
});

router.route('/seats/:id').delete((req, res) => {
    db.seats.splice(db.seats.indexOf(getSeatsFromLink(req)), 1);
    res.json({ message: 'Deleted...' });
});

module.exports = router;