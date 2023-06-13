var searchButton = document.getElementById('search');
var cityHistory = [];

function displayCityWeather(weatherData) {
    var weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = '';

    if (weatherData && weatherData.list && weatherData.list.length > 0) {
        var forecastsByDay = groupForecastsByDay(weatherData.list);
        var days = Object.keys(forecastsByDay).slice(0,5);

        for (var i = 0; i < days.length; i++) {
            var day = days[i];
            var forecast = forecastsByDay[day];
            

            var forecastContainer = document.createElement('div');

            var dateEl = document.createElement('div');
            dateEl.textContent = 'Date: ' + day;

            var tempEl = document.createElement('div');
            tempEl.textContent = 'Temperature: ' + forecast[0].main.temp;

            var infoEl = document.createElement('div');
            infoEl.textContent = 'Forecast: ' + forecast[0].weather[0].description;

            var humidityEl = document.createElement('div');
            humidityEl.textContent = 'Humidity: ' + forecast[0].main.humidity + '%';

            forecastContainer.appendChild(dateEl);
            forecastContainer.appendChild(tempEl);
            forecastContainer.appendChild(infoEl);
            forecastContainer.appendChild(humidityEl);

            forecastContainer.style.marginBottom = '10px';
            forecastContainer.style.border = '1px solid black';
            forecastContainer.style.padding = '10px';
            forecastContainer.style.backgroundColor = '#3C4475';

            weatherContainer.appendChild(forecastContainer);
        }

        weatherContainer.style.border = '1px solid black';
        weatherContainer.style.padding = '10px';
        weatherContainer.style.backgroundColor = '#3C4475';
        weatherContainer.style.color = 'white';
    } else {
        weatherContainer.textContent = 'Error retrieving weather data';
        weatherContainer.style.border = 'none';
        weatherContainer.style.padding = '0';
        weatherContainer.style.backgroundColor = 'transparent';
    }
}

function groupForecastsByDay(forecasts) {
    var groupedForecasts = {};

    for (var i = 0; i < forecasts.length; i++) {
        var forecast = forecasts[i];
        var date = forecast.dt_txt.split(' ')[0]; 

        if (!groupedForecasts[date]) {
            groupedForecasts[date] = [];
        }
        groupedForecasts[date].push(forecast);
    }

    return groupedForecasts;
}

function getCityForecast(cityName) {
    var apiURL =
        'https://api.openweathermap.org/data/2.5/forecast?q=' +
        cityName +
        '&cnt=40&appid=69d0bc2f7af62a8be51de0f9dcf280b5&units=imperial';

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log('Weather data for ' + cityName + ': ', data);
            displayCityWeather(data);
        })
        .catch(error => {
            console.log('Error: ', error);
            displayCityWeather(null); 
        });
};


searchButton.addEventListener('click', function (event) {
    var cityData = document.getElementById('input1').value;
    event.preventDefault();

    if (cityData) {
       getCityForecast(cityData);
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
        li.dataset.index = i;

        li.addEventListener('click', function(event) {
            var selectedIndex = parseInt(event.target.dataset.index);
            var selectedCity = cityHistory[selectedIndex];
            getCityForecast(selectedCity.name);
        });

        ul.appendChild(li);
    }

    cityHistoryContainer.appendChild(ul);
}

searchButton.style.borderRadius = '10px';
searchButton.style.color = 'white';
searchButton.style.backgroundColor = 'lightblue';

var cityHistoryContainer = document.getElementById('cityHistoryContainer');
cityHistoryContainer.style.color = 'black';
cityHistoryContainer.style.fontSize = '20px';
cityHistoryContainer.style.backgroundColor = 'grey';

var cityNameEl = document.getElementById('cityName');
var tempEl = document.getElementById('temperature');
var infoEl = document.getElementById('description');

cityNameEl.style.fontWeight = 'bold';
tempEl.style.fontWeight = 'bold';

tempEl.style.fontSize = '24px';

   

