
let locationInput = 'London';
let measurement = 'metric';





function captureInput(){
    let inputField = document.getElementById('searchInput');
    locationInput = inputField.value;
    console.log('User searched:', locationInput);
    inputField.value = '';
    return inputField;
}

function searchButton(){
    let searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', () => {
        captureInput();
        screenUpdate();
    })
}

function writeQuery(){
    const callBase = `http://api.weatherapi.com/v1/current.json?key=ca153cb938c64b29b9b165458233105&q=${locationInput}&aqi=no`;
    return callBase;
}

async function getWeather() {
  const response = await fetch(writeQuery(), {mode: 'cors'});
  const weatherData = await response.json();
  console.log(weatherData);
  const region = weatherData.location.region;
  const country = weatherData.location.country;
  const temp = weatherData.current.temp_c;
  return{
    region,
    country,
    temp,
  }

}


function handleCheckboxClick(checkbox){
    if (checkbox.checked){
        measurement = checkbox.value;
        console.log("Selected value: " + measurement);
    }
}

async function screenUpdate(){
    let mainCard = document.getElementsByClassName('mainCard')[0];
    mainCard.innerHTML = '';
    console.log('screenUpdate');

    let weather = await getWeather();

    let mainCard1stRow = document.createElement('div');
    mainCard1stRow.classList.add('mainCard1stRow');
    mainCard.appendChild(mainCard1stRow);

    let location = document.createElement('div');
    location.classList.add('location');
    location.textContent = weather.region;
    mainCard1stRow.appendChild(location);
    

    let temp = document.createElement('div');
    temp.classList.add('temp');
    temp.textContent = weather.temp;
    mainCard1stRow.appendChild(temp);

    let mainCard2ndRow = document.createElement('div');
    mainCard2ndRow.classList.add('mainCard2ndRow');
    mainCard.appendChild(mainCard2ndRow);
}

//----

searchButton()
screenUpdate()
