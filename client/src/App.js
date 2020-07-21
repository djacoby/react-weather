import React, { Component } from 'react';
import axios from 'axios';
import WeatherContainer from './WeatherContainer';
import Spinner from './Spinner';
import './App.css';

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
      fiveDayForecast: null,
    };
  }

  componentDidMount() {
    this.getCurrentDate();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (position.coords !== null) {
          this.setState({
            latitude: latitude,
            longitude: longitude,
          });

          this.getCurrentWeather();
          this.getFiveDayForecast();
        }
      },
      (denied) => {
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
    const geolocation = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    if (this.state.latitude !== null && this.state.longitude !== null) {
      try {
        const res = await axios.post('/api/geolocation', {
          geolocation: geolocation,
        });
        this.setState({
          weather: res.data,
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
        const res = await axios.post('/api/zipcode', { zip: this.state.zip });
        this.setState({
          weather: res.data,
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
    const geolocation = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    if (this.state.latitude !== null && this.state.longitude !== null) {
      try {
        const res = await axios.post('/api/geolocation/fiveday', {
          geolocation: geolocation,
        });
        this.setState({
          fiveDayForecast: res.data,
        });
      } catch (error) {
        console.error(error);
      }
    } else if (this.state.zip !== null) {
      try {
        const res = await axios.post('/api/zipcode/fiveday', {
          zip: this.state.zip,
        });
        this.setState({
          fiveDayForecast: res.data,
        });
      } catch (error) {
        console.error(error);
      }
    }
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
      dayOfTheWeek: dayOfTheWeek,
    };
    this.setState({
      day: dayOfTheWeek,
      date: fullDate,
    });
  }

  updateLocation = (zip) => {
    this.setState({
      zip: zip,
      latitude: null,
      longitude: null,
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
