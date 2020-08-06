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
   throw new Error('City Not Found!')
 }
}

const handleError = (err) => {
  console.log(err)
  weatherDiv.textContent = err
}

const getWeatherData = async (e) => {
  e.preventDefault()
  const city = document.querySelector('#city').value
  try {
    const weatherData = await getData(`${baseUrl}?q=${city}&appid=${appId}`)
    const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    renderData(weatherData, iconUrl)
  }
  catch(err) {
    handleError(err)
  }
}


const renderData = (weatherData, iconUrl) => {
  console.log(weatherData)
  weatherDiv.classList.add('animate')
  clearElement(weatherDiv);
  const iconDiv = document.createElement('div');
  const h1 = document.createElement('h1')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const ul = document.createElement('ul')
  Object.values(weatherData.main).forEach(item => {
    const li = document.createElement('li')
    li.textContent = item
    ul.appendChild(li)
  })
  iconDiv.setAttribute('class', 'icon')
  img.src = iconUrl
  h1.textContent = `${weatherData.name}, ${weatherData.sys.country}`
  h2.textContent = weatherData.weather[0].description
  iconDiv.appendChild(h1)
  iconDiv.appendChild(img)
  // weatherDiv.appendChild(img)
  weatherDiv.appendChild(iconDiv)
  weatherDiv.appendChild(h2)
  weatherDiv.appendChild(ul)
  
  weatherDiv.addEventListener('animationend', () => {
    weatherDiv.classList.remove('animate')
  })
}

const clearElement = (element) => {
  element.innerHTML = '';
}

getBtn.addEventListener('click', getWeatherData)
