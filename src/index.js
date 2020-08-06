import './style.scss';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const appId = 'a6fffd615dee8a18a1d160f3eead85a3';


const getBtn = document.querySelector('#getBtn')

const weatherDiv = document.querySelector('#weatherDiv')

const getWeatherData = async (e) => {
  const city = document.querySelector('#city').value
  fetch(`${baseUrl}${city}&appid=${appId}`)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error("City Not Found!")
      }
    })
    .then(response => {
      renderData(response)
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
}

const renderData = (data) => {
  clearElement(weatherDiv);
  const h1 = document.createElement('h1')
  h1.textContent = data.name
  weatherDiv.appendChild(h1)
}

const clearElement = (element) => {
  element.innerHTML = '';
}

getBtn.addEventListener('click', getWeatherData)