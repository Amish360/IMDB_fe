const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

// Allow requests from your frontend's origin (e.g., http://localhost:3000 during development)
const allowedOrigins = ['http://localhost:3000'];

// Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If your frontend and backend use cookies or sessions
  })
);

// Example API route
app.get('/api/data', (req, res) => {
  res.json({ message: 'API data response' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
