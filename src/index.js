import './style.scss';


const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const appId = 'a6fffd615dee8a18a1d160f3eead85a3';


const getBtn = document.querySelector('#getBtn')

const weatherDiv = document.querySelector('#weatherDiv')

const getData = async (url) => {
 const response = await fetch(url)
 if (response.ok) {
   return response.json()
 } else {
   throw new Error('Something went wrong!!')
 }
}

const getWeatherData = async () => {
  const city = document.querySelector('#city').value
  const weatherData = await getData(`${baseUrl}?q=${city}&appid=${appId}`)
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  console.log(weatherData) 
  renderData(weatherData, iconUrl)
}


const renderData = (weatherData, iconUrl) => {
  clearElement(weatherDiv);
  const h1 = document.createElement('h1')
  const img = document.createElement('img')
  img.src = iconUrl
  h1.textContent = weatherData.name
  weatherDiv.appendChild(img)
  weatherDiv.appendChild(h1)
}

const clearElement = (element) => {
  element.innerHTML = '';
}

getBtn.addEventListener('click', getWeatherData)
