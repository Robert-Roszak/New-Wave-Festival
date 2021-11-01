const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const testimonialRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/', testimonialRoutes);
app.use('/', concertRoutes);
app.use('/', seatsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});