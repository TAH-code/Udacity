const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'website')));

let projectData = {};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'website', 'index.html'));
});

app.get('/all', (req, res) => {
  res.send(projectData);
});

app.post('/add', (req, res) => {
  const newData = req.body;
  projectData = {
    temperature: newData.temperature,
    date: newData.date,
    userResponse: newData.userResponse
  };
  res.send(projectData);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});