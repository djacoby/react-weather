import React from 'react';
import Spinner from './Spinner';
import { weatherIcons, dayOfTheWeekAbbr } from './helperObjects';
import WeatherForm from './WeatherForm';

export default function FiveDayWeather(props) {
  return (
    <div className='weather-info'>
      <WeatherForm updateLocation={props.updateLocation} />
      <div className='today-info'>
        <div className='humidity'>
          <span className='title'>Humidity</span>
          <span className='value'>{props.weather.main.humidity} %</span>
          <div className='clear'></div>
        </div>
        <div className='wind'>
          <span className='title'>Wind</span>
          <span className='value'>
            {Math.floor(props.weather.wind.speed)} mph
          </span>
          <div className='clear'></div>
        </div>
      </div>
      <div className='week-container'>
        <ul className='week-list'>
          {props.fiveDayForecast === null ? (
            <Spinner />
          ) : (
            props.fiveDayForecast.map(weather => (
              <li key={weather.day} className='week-item'>
                {weatherIcons[weather.icon]}
                <span className='day-name'>
                  {dayOfTheWeekAbbr[weather.day]}
                </span>
                <span className='day-temp'>{Math.floor(weather.high)}°F</span>
              </li>
            ))
          )}
          <div className='clear'></div>
        </ul>
      </div>
    </div>
  );
}
