const Seat = require('../models/seat.model');
const Concert = require('../models/concert.model');

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

exports.getSeatsByDay = async (req, res) => {
  try {
    const seatsByDay = await Seat.find({ day: req.params.day });
    if(!seatsByDay) res.status(404).json({ message: 'Not found' });
    else res.json(seatsByDay);
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
    else if (day && seat && client && email) {
      const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
      await newSeat.save();

      const seatsForDay = await Seat.find({ day: day });
      const concertsForDay = await Concert.find({ day: day });
      concertsForDay.forEach(concert => {
        concert.seatsCount = seatsForDay.length;
        concert.save();
      });
      req.io.emit('seatsUpdated', await Seat.find());
      res.json(await Seat.find());
    }
    else res.json({ message: 'Please provide all details...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.editSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const foundSeat = await Seat.findById(req.params.id);
    if(foundSeat) {
      if (parseInt(foundSeat.day) !== parseInt(day)) {
        const concertsForDay = await Concert.find({ day: foundSeat.day });
        concertsForDay.forEach(concert => {
          concert.seatsCount--;
          concert.save();
        });
      };
      foundSeat.day = day;
      foundSeat.seat = seat;
      foundSeat.client = client;
      foundSeat.email = email;
      await foundSeat.save();

      //emit doesn't work properly here, how to send seats for each socket's day view?
      //const seatsForDay = await Seat.find({ day: foundSeat.day });
      //req.io.emit('seatsUpdated', seatsForDay);
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

      const concertsForDay = await Concert.find({ day: foundSeat.day });
      const seatsForDay = await Seat.find({ day: foundSeat.day });
      concertsForDay.forEach(concert => {
        concert.seatsCount = seatsForDay.length;
        concert.save();
      });
      req.io.emit('seatsUpdated', seatsForDay);
      res.json(await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
