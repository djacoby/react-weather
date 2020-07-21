import React from 'react';
import CurrentWeather from './CurrentWeather';
import FiveDayWeather from './FiveDayWeather';

export default function WeatherContainer(props) {
  return (
    <div className='container'>
      <CurrentWeather weather={props.weather} date={props.date} />
      <FiveDayWeather
        weather={props.weather}
        fiveDayForecast={props.fiveDayForecast}
        updateLocation={props.updateLocation}
      />
    </div>
  );
}
