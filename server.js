const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const port = 8000;
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

const testimonialRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const server = app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${port}`);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});
