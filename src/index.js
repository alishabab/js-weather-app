import './style.scss';

import { renderError, renderData } from './dom';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const appId = 'a6fffd615dee8a18a1d160f3eead85a3';

const getBtn = document.querySelector('#getBtn');

const getData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('City Not Found!');
  } else {
    return response.json();
  }
};

const handleError = (err) => {
  renderError(err);
};

const getWeatherData = async (e) => {
  e.preventDefault();
  const city = document.querySelector('#city').value;
  try {
    const weatherData = await getData(`${baseUrl}?q=${city}&appid=${appId}`);
    renderData(weatherData);
  } catch (err) {
    handleError(err);
  }
};

getBtn.addEventListener('click', getWeatherData);
