import convertTemp from './convertTemp';

const weatherDiv = document.querySelector('#weatherDiv');
const inp = document.querySelector('#city');
let currentFocus;

const clearElement = (element) => {
  element.innerHTML = '';
};

const renderError = (err) => {
  weatherDiv.textContent = err;
};

const closeAllLists = (elmnt) => {
  const x = document.querySelectorAll('.autocomplete-items');
  for (let i = 0; i < x.length; i += 1) {
    if (elmnt !== x[i] && elmnt !== inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
};

const removeActive = (x) => {
  for (let i = 0; i < x.length; i += 1) {
    x[i].classList.remove('autocomplete-active');
  }
};

const addActive = (x) => {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  x[currentFocus].classList.add('autocomplete-active');
  return true;
};

const renderTemp = (tempDiv, btn, temperatureData) => {
  clearElement(tempDiv);
  const ul = document.createElement('ul');
  tempDiv.setAttribute('class', 'pos-relative');
  const span = document.createElement('span');
  span.setAttribute('class', 'temp-unit');
  span.textContent = btn.textContent === 'To Celsius' ? '°C' : '°F';
  const tempText = ['Current Temp', 'Feels Like', 'Min Temp', 'Max Temp'];
  tempText.forEach((item, i) => {
    const li = document.createElement('li');
    const temp = btn.textContent === 'To Celsius' ? temperatureData[i] : convertTemp.celsiusToF(temperatureData[i]);
    li.textContent = `${item} : ${temp}`;
    ul.appendChild(li);
  });
  tempDiv.appendChild(span);
  tempDiv.appendChild(ul);
  btn.textContent = btn.textContent === 'To Celsius' ? 'To Fahrenheit' : 'To Celsius';
};

const renderData = (weatherData) => {
  document.querySelector('.form').reset();
  clearElement(weatherDiv);
  weatherDiv.classList.add('animate');
  const iconDiv = document.createElement('div');
  const tempDiv = document.createElement('div');
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const btn = document.createElement('button');
  btn.setAttribute('class', 'btn');
  btn.textContent = 'To Celsius';
  // eslint-disable-next-line max-len
  const temperatureData = [weatherData.current.temp_c, weatherData.current.feelslike_c, weatherData.forecast.forecastday[0].day.mintemp_c, weatherData.forecast.forecastday[0].day.maxtemp_c];
  renderTemp(tempDiv, btn, temperatureData);
  btn.addEventListener('click', () => renderTemp(tempDiv, btn, temperatureData));
  iconDiv.setAttribute('class', 'icon');
  img.src = `https://${weatherData.current.condition.icon}`;
  h1.textContent = `${weatherData.location.name}, ${weatherData.location.region}`;
  h2.textContent = weatherData.current.condition.text;
  iconDiv.appendChild(h1);
  iconDiv.appendChild(img);
  weatherDiv.appendChild(iconDiv);
  weatherDiv.appendChild(h2);
  weatherDiv.appendChild(tempDiv);
  weatherDiv.appendChild(btn);
  weatherDiv.addEventListener('animationend', () => {
    weatherDiv.classList.remove('animate');
  });
};

const renderAutoComplete = (autoCompleteData) => {
  if (autoCompleteData.length < 1) {
    closeAllLists();
    return;
  }
  closeAllLists();
  currentFocus = -1;
  const arr = autoCompleteData;
  const a = document.createElement('DIV');
  a.setAttribute('id', `${inp.id}autocomplete-list`);
  a.setAttribute('class', 'autocomplete-items');
  inp.parentNode.appendChild(a);
  for (let i = 0; i < 5; i += 1) {
    const b = document.createElement('DIV');
    b.innerHTML = arr[i].name;
    b.innerHTML += `<input type='hidden' value='${arr[i].name}'>`;
    b.addEventListener('click', () => {
      inp.value = b.getElementsByTagName('input')[0].value;
      closeAllLists();
    });
    a.appendChild(b);
  }

  inp.addEventListener('keydown', (e) => {
    let x = document.getElementById(`${inp.id}autocomplete-list`);
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode === 40) {
      currentFocus += 1;
      addActive(x);
    } else if (e.keyCode === 38) {
      currentFocus -= 1;
      addActive(x);
    } else if (e.keyCode === 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  document.addEventListener('click', (e) => {
    closeAllLists(e.target);
  });
};

export { renderError, renderData, renderAutoComplete };