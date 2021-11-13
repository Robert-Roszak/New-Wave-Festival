const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getSeatById = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found' });
        else res.json(seat);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.addSeat = async (req, res) => {
    try {
        const { day, seat, client, email } = req.body;
        const isTheSeatTaken = await Seat.findOne({ seat: seat, day: day });
       
        if (isTheSeatTaken) {
            res.json({ message: 'The seat is taken, please try again with another one...' });
        }
        else {
            const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
            await newSeat.save();
            req.io.emit('seatsUpdated', await Seat.find());
            res.json(await Seat.find());
        }
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.editSeat = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
      const foundSeat = await Seat.findById(req.params.id);
      if(foundSeat) {
        foundSeat.day = day;
        foundSeat.seat = seat;
        foundSeat.client = client;
        foundSeat.email = email;
        await foundSeat.save();
        res.json(await Seat.find());
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.deleteSeat = async (req, res) => {
    try {
      const foundSeat = await Seat.findById(req.params.id);
      if(foundSeat) {
        await foundSeat.remove();
        res.json(await Seat.find());
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};
