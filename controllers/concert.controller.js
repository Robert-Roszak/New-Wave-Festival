const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');

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
        const newConcert = new Concert({ performer: performer, price: price, day: day });
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
    const { performer, price, day, seatsCount } = req.body;
    if (performer && price && day, seatsCount ) {
      const concert = await Concert.findById(req.params.id);
      if(concert) {
        concert.performer = performer;
        concert.day = day;
        concert.price = price;
        concert.seatsCount = seatsCount;
        await concert.save();
        res.json(await Concert.find().populate('performer'));
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    else res.json({ message: 'Please provide all details...' });
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
