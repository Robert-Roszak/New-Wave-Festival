const express = require('express');
const router = express.Router();
const PerformerController = require('../controllers/performer.controller');

router.get('/performers/random', PerformerController.getRandom);
router.get('/performers', PerformerController.getAll);
router.get('/performers/:id', PerformerController.getPerfById);
router.post('/performers', PerformerController.addPerf)
router.put('/performers/:id', PerformerController.editPerf)
router.delete('/performers/:id', PerformerController.deletePerf)

module.exports = router;
