const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Concert.find().populate('performer'));
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
        const { performer, price, day } = req.body;
        if (performer && price && day ) {
            const concert = await Concert.findById(req.params.id);
            if(concert) {
              concert.performer = performer;
              concert.day = day;
              concert.price = price;
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
