import React, { Component } from 'react';
import axios from 'axios';
import WeatherContainer from './WeatherContainer';
import Spinner from './Spinner';
import './App.css';

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const WEATHER_API_KEY = 'aa3aba2193891d9b2628f705d0f7514a';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: 10001,
      weather: null,
      latitude: null,
      longitude: null,
      day: null,
      date: null,
      fiveDayForecast: null
    };
  }

  componentDidMount() {
    this.getCurrentDate();
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        if (position.coords !== null) {
          this.setState({
            latitude: latitude,
            longitude: longitude
          });

          this.getCurrentWeather();
          this.getFiveDayForecast();
        }
      },
      denied => {
        this.getCurrentWeather();
        this.getFiveDayForecast();
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.zip !== this.state.zip) {
      this.getCurrentWeather();
      this.getFiveDayForecast();
    }
  }

  async getCurrentWeather() {
    if (this.state.latitude !== null && this.state.longitude !== null) {
      try {
        const res = await axios.get(
          `${WEATHER_BASE_URL}weather?lat=${this.state.latitude}&lon=${this.state.longitude}&us&units=imperial&&APPID=${WEATHER_API_KEY}`
        );
        this.setState({
          weather: res.data
        });
      } catch (error) {
        console.error(error);
        if (error) {
          window.alert(
            'Please enable browser geolocation or enter your zip code.'
          );
        }
      }
    } else if (this.state.zip !== null) {
      try {
        const res = await axios.get(
          `${WEATHER_BASE_URL}weather?zip=${this.state.zip},us&units=imperial&&APPID=${WEATHER_API_KEY}`
        );
        this.setState({
          weather: res.data
        });
      } catch (error) {
        console.error(error);
        if (error) {
          window.alert('Please enter valid zip code.');
        }
      }
    }
  }

  async getFiveDayForecast() {
    if (this.state.latitude !== null && this.state.longitude !== null) {
      try {
        const res = await axios.get(
          `${WEATHER_BASE_URL}forecast?lat=${this.state.latitude}&lon=${this.state.longitude}&us&units=imperial&&APPID=${WEATHER_API_KEY}`
        );
        this.sortFiveDayForecast(res.data.list);
      } catch (error) {
        console.error(error);
      }
    } else if (this.state.zip !== null) {
      try {
        const res = await axios.get(
          `${WEATHER_BASE_URL}forecast?zip=${this.state.zip},us&units=imperial&&APPID=${WEATHER_API_KEY}`
        );
        this.sortFiveDayForecast(res.data.list);
      } catch (error) {
        console.error(error);
      }
    }
  }

  sortFiveDayForecast(res) {
    const fiveDay = [];
    const date = new Date();
    let day = date.getDay();
    for (let i = 0; i < res.length; i += 8) {
      const lowArr = [];
      const highArr = [];
      const iconArr = [];
      ++day;
      if (day === 7) {
        day = 0;
      }
      for (let j = 0; j < 8; j++) {
        lowArr.push(res[i + j].main.temp_min);
        highArr.push(res[i + j].main.temp_max);
        iconArr.push(res[i + j].weather[0].main);

        if (j === 7) {
          const low = Math.min(...lowArr);
          const high = Math.max(...highArr);
          const icon = this.sortIcons(iconArr);
          const newWeatherObject = {
            low: low,
            high: high,
            day: day,
            icon: icon
          };
          fiveDay.push(newWeatherObject);
        }
      }
    }

    this.setState({
      fiveDayForecast: fiveDay
    });
  }

  sortIcons(array) {
    if (array.length === 0) return null;
    var modeMap = {};
    var maxEl = array[0],
      maxCount = 1;
    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  getCurrentDate() {
    const date = new Date();
    const dayOfTheWeek = date.getDay();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const fullDate = {
      month: month,
      day: day,
      year: year,
      dayOfTheWeek: dayOfTheWeek
    };
    this.setState({
      day: dayOfTheWeek,
      date: fullDate
    });
  }

  updateLocation = zip => {
    this.setState({
      zip: zip,
      latitude: null,
      longitude: null
    });
  };

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          {this.state.weather !== null ? (
            <WeatherContainer
              date={this.state.date}
              weather={this.state.weather}
              fiveDayForecast={this.state.fiveDayForecast}
              updateLocation={this.updateLocation}
            />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  }
}
