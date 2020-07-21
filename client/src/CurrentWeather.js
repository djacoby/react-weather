import React from 'react';
import { MapPin } from 'react-feather';
import { weatherIcons, months, dayOfTheWeek } from './helperObjects';

export default function CurrentWeather(props) {
  return (
    <div className='current-weather weather-gradient'>
      <div className='date-container'>
        <h2>{dayOfTheWeek[props.date.dayOfTheWeek]}</h2>
        <p className='date-day'>
          {props.date.day} {months[props.date.month]} {props.date.year}
        </p>
        <p className='location'>
          <MapPin /> {props.weather.name}
        </p>
      </div>
      <div className='weather-container'>
        {weatherIcons[props.weather.weather[0].main]}
        <h1 className='weather-temp'>
          {Math.floor(props.weather.main.temp)}°F
        </h1>
      </div>
    </div>
  );
}
