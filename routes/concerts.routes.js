const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concert.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getConcertById);
router.post('/concerts', ConcertController.addConcert)
router.put('/concerts/:id', ConcertController.editConcert)
router.delete('/concerts/:id', ConcertController.deleteConcert)

module.exports = router;
