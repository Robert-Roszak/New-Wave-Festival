const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors({
  "origin": "http://localhost:3000",
  "methods": "GET,POST,DELETE,PUT",
}));

const testimonialRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});