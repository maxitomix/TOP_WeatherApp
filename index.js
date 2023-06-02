
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
  const city = weatherData.location.name;
  const country = weatherData.location.country;
  const temp = measurement==='metric'? `${weatherData.current.temp_c} °C` : `${weatherData.current.temp_f} °F`;
  const conditionIcon = weatherData.current.condition.icon;
  const conditionTitle = weatherData.current.condition.text;
  return{
    city,
    country,
    temp,
    conditionIcon,
    conditionTitle,
  }

}


function handleCheckboxClick(checkbox){
    if (checkbox.checked){
        measurement = checkbox.value;
        console.log("Selected value: " + measurement);
        screenUpdate();
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

    let geolocation = document.createElement('div');
    geolocation.classList.add('geolocation');
    mainCard1stRow.appendChild(geolocation);
    
    let location = document.createElement('div');
    location.classList.add('location');
    location.textContent = weather.city;
    geolocation.appendChild(location);

    let country = document.createElement('div');
    country.classList.add('country');
    country.textContent = weather.country;
    geolocation.appendChild(country);
     
    let mainCard2ndRow = document.createElement('div');
    mainCard2ndRow.classList.add('mainCard2ndRow');
    mainCard.appendChild(mainCard2ndRow);

    let conditionTitle = document.createElement('div');
    conditionTitle.classList.add('conditionTitle');
    conditionTitle.textContent = weather.conditionTitle;
    mainCard2ndRow.appendChild(conditionTitle);

    let temp = document.createElement('div');
    temp.classList.add('temp');
    temp.textContent = weather.temp;
    mainCard2ndRow.appendChild(temp);


    let conditionIcon = document.createElement('img');
    conditionIcon.src = weather.conditionIcon;
    mainCard2ndRow.appendChild(conditionIcon);



}


var VisitorAPI=function(t,e,a){var s=new XMLHttpRequest;s.onreadystatechange=function(){var t;s.readyState===XMLHttpRequest.DONE&&(200===(t=JSON.parse(s.responseText)).status?e(t.data):a(t.status,t.result))},s.open("GET","https://api.visitorapi.com/api/?pid="+t),s.send(null)};

VisitorAPI(
    "lQ4eNzpsbAg31hwrxi09",
    function(data){console.log(data)},
    function(errorCode, errorMessage){console.log(errorCode, errorMessage)}
);


//----

searchButton()
screenUpdate()
