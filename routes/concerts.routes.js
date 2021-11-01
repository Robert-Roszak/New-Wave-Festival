const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const getConcertsFromLink = (req) => {
    const concert = db.concerts.find(concert => concert.id.toString() == req.params.id);
    if (concert) return concert;
    else return { message: 'No such concert...' };
};

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(getConcertsFromLink(req));
});

router.route('/concerts/').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    if (performer && genre && price && day && image) {
        const toAdd = {id: uuidv4(), performer: performer, genre: genre, price: price, day: day, image: image};
        db.concerts.push(toAdd);
        res.json({ message: 'Added...' });
    }
    else res.json({ message: 'Please provide all details...' });
});

router.route('/concerts/:id').put((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    if (performer && genre && price && day && image) {
        const toEdit = getConcertsFromLink(req);
        toEdit.performer = performer;
        toEdit.genre = genre;
        toEdit.price = price;
        toEdit.day = day;
        toEdit.image = image;
        res.json({ message: 'Edited...' });
    }
    else res.json({ message: 'Please provide all details...' });
});

router.route('/concerts/:id').delete((req, res) => {
    db.concerts.splice(db.concerts.indexOf(getConcertsFromLink(req)), 1);
    res.json({ message: 'Deleted...' });
});

module.exports = router;