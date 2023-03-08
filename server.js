const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Enable CORS
app.use(cors());

app.use(express.static('public'));

// Route that reads the JSON file and returns its contents
app.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'leaderboard.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(data);
  res.json(jsonData);
});

// Start server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});