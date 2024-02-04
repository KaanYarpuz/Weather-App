const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/weather', async (req, res) => {
    const { city } = req.body;
  
    try {
      const apiKey = 'YOUR API KEY';  // gratis weer api van openweathermap.org
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // units=metric voor graden celcius
  
      const response = await axios.get(apiUrl);
      const weatherData = response.data;
      weatherData.main.temp = Math.round(weatherData.main.temp);
  
      res.json(weatherData);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching weather data' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
