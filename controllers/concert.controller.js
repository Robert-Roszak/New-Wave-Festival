const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find().populate('performer');
    res.json(concerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id).populate('performer');
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertsByPerformer = async (req, res) => {
  try {
    const allConcerts = await Concert.find().populate('performer');
    let concertsByPerformer = [];

    allConcerts.forEach(concert => {
      if (concert.performer.name.toUpperCase() === req.params.performer.toUpperCase()) {
        concertsByPerformer.push(concert);
      }
    });

    if(!concertsByPerformer) res.status(404).json({ message: 'Not found' });
    else res.json(concertsByPerformer);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertsByGenre = async (req, res) => {
  try {
    const allConcerts = await Concert.find().populate('performer');
    let concertsByGenre = [];

    allConcerts.forEach(concert => {
      if (concert.performer.genre.toUpperCase() === req.params.genre.toUpperCase()) {
        concertsByGenre.push(concert);
      }
    });

    if(!concertsByGenre) res.status(404).json({ message: 'Not found' });
    else res.json(concertsByGenre);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertsByPrice = async (req, res) => {
  try {
    const concerts = await Concert.find({ price: {$gte: req.params.price_min, $lte: req.params.price_max}}).populate('performer');
    if(!concerts) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcertsByDay = async (req, res) => {
  try {
    const concertsByDay = await Concert.find({ day: req.params.day }).populate('performer');
    if(!concertsByDay) res.status(404).json({ message: 'Not found' });
    else res.json(concertsByDay);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addConcert = async (req, res) => {
  try {
    const { performer, price, day } = req.body;
    if (performer && price && day ) {
      const cleanPerformer = sanitize(performer);
      const cleanPrice = sanitize(price);
      const cleanDay = sanitize(day);
      const newConcert = new Concert({ performer: cleanPerformer, price: cleanPrice, day: cleanDay });
      await newConcert.save();
      res.json(await Concert.find().populate('performer'));
    }
    else res.json({ message: 'Please provide all details...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.editConcert = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if(concert) {
      for(const param in req.body) {
        let cleanParam = sanitize(req.body[param]);
        if (param === 'day') {
          const seatsForDay = await Seat.find({ day: cleanParam });
          concert[param] = cleanParam;
          concert.seatsCount = seatsForDay.length;
        }
        else concert[param] = cleanParam;
      };
      await concert.save();
      res.json(await Concert.find().populate('performer'));
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteConcert = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if(concert) {
      await concert.remove();
      res.json(await Concert.find().populate('performer'));
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
