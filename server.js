const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

const testimonialRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});