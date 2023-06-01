
let locationInput = 'London';


function userSearch (){
    let inputField = document.getElementById('searchInput');
    locationInput = inputField.value;
    console.log('User searched:', locationInput);
    inputField.value = '';
    return inputField;
}

function createControls(){
    let searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', () => {
        userSearch();
    })
}

function writeQuery(){
    const callBase = `http://api.weatherapi.com/v1/current.json?key=ca153cb938c64b29b9b165458233105&q=${locationInput}&aqi=no`;

    return callBase;
}

async function getWeather() {
  const response = await fetch(writeQuery(), {mode: 'cors'});
  const weatherData = await response.json();
  return weatherData
}





//----

createControls()
