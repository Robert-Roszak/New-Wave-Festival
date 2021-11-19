const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
    performer: { type: String, required: true, ref: 'Performer' },
    price: { type: Number, required: true },
    day: { type: Number, required: true },
    seatsCount: { type: Number }
});

module.exports = mongoose.model('Concert', concertSchema);
