const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');

const { sortFiveDayForecast } = require('../../helpers');

const WEATHER_BASE_URL = config.get('WeatherBaseUrl');
const WEATHER_API_KEY = config.get('WeatherApiKey');

// @route POST api/zipcode
// @desc call OpenWeatherApi using zipcode for current weather report
// Public 
router.post('/', async (req, res) => {
  const weather = await axios.get(
    `${WEATHER_BASE_URL}weather?zip=${req.body.zip},us&units=imperial&&APPID=${WEATHER_API_KEY}`
  );
  res.send(weather.data);
});

// @route POST api/zipcode
// @desc call OpenWeatherApi using zipcode for five day weather report
// Public
router.post('/fiveday', async (req, res) => {
  const weather = await axios.get(
    `${WEATHER_BASE_URL}forecast?zip=${req.body.zip},us&units=imperial&&APPID=${WEATHER_API_KEY}`
  );
  const sortedWeather = sortFiveDayForecast(weather.data.list);
  res.send(sortedWeather);
});

module.exports = router;
