const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const getTestimonialFromLink = (req) => {
    const testimonial = db.testimonials.find(testimonial => testimonial.id.toString() == req.params.id)
    if (testimonial) return testimonial;
    else return { message: 'No such testimonial...' };
}

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
    console.log(getTestimonialFromLink(req));
    res.json(getTestimonialFromLink(req));
});

// dlaczego nie wchodzi w random?
router.route('/testimonials/random').get((req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/').post((req, res) => {
    const { author, text } = req.body;
    if (author && text) {
        const toAdd = {id: uuidv4(), author: author, text: text};
        db.testimonials.push(toAdd);
        res.json({ message: 'Added...' });
    }
    else res.json({ message: 'Please provide all details...' });
});

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;
    if (author && text) {
        const toEdit = getTestimonialFromLink(req);
        toEdit.author = author;
        toEdit.text = text;
        res.json({ message: 'Edited...' });
    }
    else res.json({ message: 'Please provide all details...' });
});

router.route('/testimonials/:id').delete((req, res) => {
    db.testimonials.splice(db.testimonials.indexOf(getTestimonialFromLink(req)), 1);
    res.json({ message: 'Deleted...' });
});

module.exports = router;