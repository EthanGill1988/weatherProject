var searchButton = document.getElementById('search');
var cityHistory = [];
var cityWeather = [];

function displayCityWeather(weatherData) {
    var cityNameEl = document.getElementById('cityName');
    var tempEl = document.getElementById('temperature');
    var infoEl = document.getElementById('description');
    var weatherContainer = document.getElementById('weatherContainer');
    
    cityNameEl.textContent = weatherData.name;
    tempEl.textContent = weatherData.main.temp;
    infoEl.textContent = weatherData.weather[0].description; 

    cityNameEl.textContent = 'City: ' + weatherData.name;
    tempEl.textContent = 'Temperature: ' + weatherData.ain.temp;
    infoEl.textContent = 'Forcast: ' + weatherData.weather[0].description;

    weatherContainer.style.border = '1px solid black';
    weatherContainer.style.padding = '10px';
    weatherContainer.style.backgroundColor = 'lightgray';
    }

searchButton.addEventListener('click', function(event) {
    var cityData = document.getElementById('input1').value;
    event.preventDefault();

    if (cityData) {
        var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityData + '&appid=69d0bc2f7af62a8be51de0f9dcf280b5';
        
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                console.log('weather data: ', data);
                displayCityWeather(data);
                cityHistoryContainer.style.border = 'none';
                
            })
            .catch(error => {
                console.log('Error: ', error);
            });
    } else {
        console.log('Please enter a city');
    }

    var name = document.getElementById('input1').value;

    cityHistory.push({
        name: name,
       
    });
    
    displayCityHistory();
});

function displayCityHistory() {
    var cityHistoryContainer = document.getElementById('cityHistoryContainer');
    cityHistoryContainer.innerHTML = '';

    var ul = document.createElement('ul');


    for (var i = 0; i < cityHistory.length; i++) {
        var cityData = cityHistory[i];
        var li = document.createElement('li');
        li.textContent = 'Name: ' + cityData.name;
            
    ul.appendChild(li);

    }
    cityHistoryContainer.appendChild(ul);
}


searchButton.style.borderRadius = '10px';
searchButton.style.color = 'white';
searchButton.style.backgroundColor = 'lightblue';

var cityHistoryContainer = document.getElementById('cityHistoryContainer') 
    cityHistoryContainer.style.color = 'black';
    cityHistoryContainer.style.fontSize = '20px';
    cityHistoryContainer.style.backgroundColor = 'grey';

var cityNameEl = document.getElementById('cityName');
var tempEl = document.getElementById('temperature');
var infoEl = document.getElementById('description');

cityNameEl.style.fontWeight = 'bold';
tempEl.style.fontWeight = 'bold';

tempEl.style.fontSize = '24px';

   

