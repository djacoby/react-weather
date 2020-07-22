<a href="https://react-weather-app-david-jacoby.herokuapp.com/"><img src="./assets/cloud-drizzle.svg" title="weather" alt="weather icon"></a>

## React/ Express Weather

> Weather Application

> React Express.js Node.js

- Build: 1.0.0
- License: MIT
- Author: David Jacoby

<img src="http://g.recordit.co/BSHhyy1c2V.gif" title="react weather" alt="amico log">

## About

This is single page weather application that generates a current weather report, and five day weather report based off the users location. On page load for the app the user is prompted to allow the app to get their geolocation using the Navigator api. If the user accepts then an api call is made to open weather map using their latitude and longitude to return the data. If they decline the app makes an api using the default zip code (10001 for New York City). The user then may enter any valid zip code to receive the weather reports for the given zip code.

## Setup

- Clone this repo to your local machine using `https://github.com/jacoby934/react-weather.git`
- cd into the repo and install packages for the backend

```shell
$ cd react-weather
$ npm install
```

- cd into client to install npm packages

```shell
$ cd client
$ npm install
```

- cd out of client into root directory of project and type run command

```shell
$ cd ..
$ npm run dev
```

## Support

Reach out to me at one of the following places!

- Website at <a href="https://david-jacoby.com" target="_blank">`david-jacoby.com`</a>
- Email at david-jacoby@protonmail.com

## Dependencies

> Dev Dependencies

- concurrently 5.2.0
- nodemon 2.0.4

> Server

- axios 0.19.2
- config 3.3.1
- cors 2.8.5
- express 4.17.1

> Client

- axios 0.19.2
- react 16.3.0
- react-dom 16.13.0
- react-feather 2.0.3
- react-scripts 3.4.0
- serve 11.3.0

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
