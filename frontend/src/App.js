import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState('');
  const [error, setErr] = useState('');
  const [buttonColor, setButtonColor] = useState('');


  const fetchWeather = async () => {
    try {

      setButtonColor('red');
      const response = await axios.get(`http://localhost:3300/weather/${city}`)
      const weatherInfo = response.data.result;
      setWeatherData(weatherInfo);
      setErr('');

      setTimeout(() => {
        setCity('');
        setButtonColor('');
      }, 2000)
    } catch (err) {
      console.log(err);
      setWeatherData('');
      setErr(err);
      setButtonColor('');
    }
  };

  useEffect(() => {
    setErr('');
  }, [city]);

  const parsedWeatherDate = (weatherData) => {
    const [weather, temperatature, wind, moon] = weatherData.split(' ');
    return {weather, temperatature, wind, moon};
  }

  const parseWeatherDate = parsedWeatherDate(weatherData);





  return (
    <div className='App'>
      <h1>Our Weather App</h1>
      <input type="text" placeholder='Enter a city' value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={fetchWeather} style={{ backgroundColor: buttonColor }}>Get Weather</button>
      {error && <p className='error'>{error}</p>}
      {parseWeatherDate.weather && (
        <div className='weather-data'>
            <p><label>Cloud: </label> <span>{parseWeatherDate.weather}</span></p>
            <p><label>Temp: </label> <span>{parseWeatherDate.temperatature}</span></p>
            <p><label>Wind: </label> <span>{parseWeatherDate.wind}</span></p>
            <p><label>Moon: </label> <span>{parseWeatherDate.moon}</span></p>
        </div>
      )}
    </div>
  )

}

export default App;