const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = 3000;

app.use(cors());

// Access API keys from environment variables
const apiKey = process.env.API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;
const img_key =process.env.UNSPLASH_ACCESS_KEY

app.get('/apikey', (req, res) => {
  res.json({ key: apiKey });
});

app.get('/weatherkey', (req, res) => {
  res.json({ key: weatherApiKey });
});

app.get('/imgapikey', (req, res) => {
  res.json({ key: img_key });
});

app.use(express.static('frontend'));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
