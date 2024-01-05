const express = require('express');
const mongoose = require('mongoose');
const Ride = require('./models/ride');

const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/HarmanDb';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, welcome to CoRide API!'); // Customize this response as needed
});

app.post('/api/store-rides', async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, selectedAmount } = req.body;

    const newRide = new Ride({
      pickupLocation,
      dropoffLocation,
      selectedAmount,
    });

    await newRide.save();

    res.status(201).json({ success: true, message: 'Ride information stored successfully.' });
  } catch (error) {
    console.error('Error storing ride information:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
