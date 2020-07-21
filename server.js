const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = process.env.environment || 5000;

// Use cors middleware to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Build in Middleware to parse incomfing requests with JSON payloads
app.use(express.json());

// TODO add api routes to server
app.use('/api/zipcode', require('./routes/api/zipcode'));
app.use('/api/geolocation', require('./routes/api/geolocation'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/production'));
  // serve index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
