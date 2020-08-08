/* eslint-disable func-names */
import './style.scss';

import { renderError, renderData, renderAutoComplete } from './dom';

const baseUrl = 'https://api.weatherapi.com/v1';
const appId = 'df7a07067351434c82a123240200708';

const getBtn = document.querySelector('#getBtn');
const inputField = document.querySelector('#city');

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
  const city = inputField.value;
  try {
    const weatherData = await getData(`${baseUrl}/forecast.json?key=${appId}&q=${city}&days=1`);
    renderData(weatherData);
  } catch (err) {
    handleError(err);
  }
};

const getAutoCompleteData = async () => {
  const query = inputField.value;
  if (query.length < 1) { return; }
  try {
    const autoCompleteData = await getData(`${baseUrl}/search.json?key=${appId}&q=${query}`);
    renderAutoComplete(autoCompleteData);
  } catch (err) {
    handleError(err);
  }
};

inputField.addEventListener('input', getAutoCompleteData);
getBtn.addEventListener('click', getWeatherData);
