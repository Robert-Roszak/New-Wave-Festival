const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonial.controller');

router.get('/testimonials/random', TestimonialController.getRandom);
router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/:id', TestimonialController.getTesById);
router.post('/testimonials', TestimonialController.addTes)
router.put('/testimonials/:id', TestimonialController.editTes)
router.delete('/testimonials/:id', TestimonialController.deleteTes)

module.exports = router;
