
// Function: jQuery / on-click event user - city
$(document).ready(function() {

    // Choosing city / user's input
    $('#icon-button').on('click', function(event) {
        // Prevents default action
        event.preventDefault();
        // Variable - input and save  city
        let cityInput = $('#input').val();
        // Variable - array - input cities
        let inputCities = [];

        // Getting input cities
        inputCities = JSON.parse(localStorage.getItem('inputCities')) || [];
        // Pushing input cities to empty array
        inputCities.push(cityInput);
        // Saving input cities to localStorage
        localStorage.setItem('inputCities', JSON.stringify(inputCities));

        // Calling in function
        displayWeather(cityInput);
    })

    // Daily forecast function & API
    function displayWeather(cityInput) {

        // Emptying previous data
        $('#daily-weather').empty();
        $('#six-days').empty();
        $('#day-1').empty();
        $('#day-2').empty();
        $('#day-3').empty();
        $('#day-4').empty();
        $('#day-5').empty();
        $('#day-6').empty();

        // Api call weather / cityInput / units / my api key / currentDay variable
        let currentDay = 'https://api.openweathermap.org/data/2.5/weather?q='
        + cityInput + '&units=imperial' + '&appid=f1a16cad1c18080e4ffd997bda8b2d9d';
        
        // Ajax url call - then - function / 1-day forecast
        $.ajax({
            url: currentDay,
            method: 'GET',
        }).then(function(weatherResponse) {
            
            // Current day variable / moment / date format
            let currentDate = moment().format('M/DD/YYYY');

            // Weather icon variable / from api weather url
            let weatherIcon = 'http://openweathermap.org/img/w/' 
            + weatherResponse.weather[0].icon + '.png';

            // Appending daily weather details to HTML / icon, temperature, humidity, and wind speed
            $('#daily-weather').append(
                "<div class='col s12 m6'>" 
                + "<h2 class='daily'>" + weatherResponse.name + " ( " + currentDate + " )" + "&nbsp" 
                + "<img src='" + weatherIcon + "'>" + "</h2>"
                + "<ul class='daily'>" + "Temperature: " + weatherResponse.main.temp + " ??F" + "</ul>" 
                + "<ul class='daily'>" + "Humidity: " + weatherResponse.main.humidity + " %" + "</ul>" 
                + "<ul class='daily'>" + "Wind Speed: " + weatherResponse.wind.speed +" mph" + "</ul>" 
                + "</div>"
            );

            // Variable - coordinate latitude
            let coordinateLat = weatherResponse.coord.lat;
            // Variable - coordinate longitude
            let coordinateLon = weatherResponse.coord.lon;
            
            // Api call weather / lat&lon / units / my api key / fiveDays variable
            let fiveDays = 'https://api.openweathermap.org/data/2.5/onecall?' 
            + 'lat=' + coordinateLat + '&lon=' + coordinateLon + '&units=imperial' 
            + '&appid=f1a16cad1c18080e4ffd997bda8b2d9d';

            // Ajax url call - then - function / 5-day forecast / UV Index button
            $.ajax({
                url: fiveDays,
                method: 'GET',
            }).then(function(weatherResponse) {
                // Appending UV Index inside button to HTML daily weather details
                $('#daily-weather').append(
                    "<div class='col s12 m6'>" 
                    + "<button class='uvi-btn' id='uvIndex' class='daily'>" + "UV Index: " 
                    + weatherResponse.current.uvi + "</button>"
                    + "</div>"
                );

                // Conditionals for UV Index button colors
                if (weatherResponse.current.uvi <= 2.99) {
                    $('#uvIndex').addClass('low');
                }
                else if (weatherResponse.current.uvi <= 5.99) {
                    $('#uvIndex').addClass('moderate');
                }
                else if (weatherResponse.current.uvi <= 7.99) {
                    $('#uvIndex').addClass('high');
                }
                else if (weatherResponse.current.uvi <= 10.99) {
                    $('#uvIndex').addClass('very-high');
                }
                else if (weatherResponse.current.uvi > 11) {
                    $('#uvIndex').addClass('extreme');
                };

                // 5-day forecast variables / moment / add / date format
                let dayOne = moment().add(1, 'days').format('M/DD/YYYY');
                let dayTwo = moment().add(2, 'days').format('M/DD/YYYY');
                let dayThree = moment().add(3, 'days').format('M/DD/YYYY');
                let dayFour = moment().add(4, 'days').format('M/DD/YYYY');
                let dayFive = moment().add(5, 'days').format('M/DD/YYYY');
                let daySix = moment().add(6, 'days').format('M/DD/YYYY');

                // 5-day weather icon variables / from api weather url
                let weatherIcon1 = 'http://openweathermap.org/img/w/' 
                + weatherResponse.daily[0].weather[0].icon + '.png';
                let weatherIcon2 = 'http://openweathermap.org/img/w/' 
                + weatherResponse.daily[1].weather[0].icon + '.png';
                let weatherIcon3 = 'http://openweathermap.org/img/w/' 
                + weatherResponse.daily[2].weather[0].icon + '.png';
                let weatherIcon4 = 'http://openweathermap.org/img/w/' 
                + weatherResponse.daily[3].weather[0].icon + '.png';
                let weatherIcon5 = 'http://openweathermap.org/img/w/' 
                + weatherResponse.daily[4].weather[0].icon + '.png';
                let weatherIcon6 = 'http://openweathermap.org/img/w/' 
                + weatherResponse.daily[5].weather[0].icon + '.png';

                // Appending 5-day weather to HTML / icon, temperature, and humidity
                // 5-Days Forecast Header
                $('#six-days').append(
                    "<div class='col-md-12'>" + "<h2>" + "6-Day Forecast:" + "</h2>"
                );

                // Appending day one weather card
                $('#day-1').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + dayOne + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon1 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " ??F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );

                // Appending day two weather card
                $('#day-2').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + dayTwo + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon2 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " ??F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );

                // Appending day three weather card
                $('#day-3').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + dayThree + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon3 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " ??F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );

                // Appending day four weather card
                $('#day-4').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + dayFour + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon4 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " ??F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );
                
                // Appending day five weather card
                $('#day-5').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + dayFive + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon5 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " ??F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );

                // Appending day six weather card
                $('#day-6').append(
                    "<div class='card col-s12-m6'>" 
                    + "<div class='card-body'>" 
                    + "<div class='card-header'>" + daySix + "</div" 
                    + "<div class='card-info'>" + "<img src='" + weatherIcon6 + "'>" + "</div>" 
                    + "<div class='card-info'>" + "Temp: " 
                    + weatherResponse.daily[0].temp.day + " ??F" + "</div>" 
                    + "<div class='card-info'>" + "Humidity: " 
                    + weatherResponse.daily[0].humidity + " %" + "</div>" 
                    + "</div>"
                );
                // Calling in function
                displayCities ();
            });
        });
    };
    
    // Function declaration / LocalStorage for input cities
    function displayCities() {
        // Emptying previous array
        $('#searchedCities').empty();
        // Taking the searched cities in the array and parsing them into a string
        let arrayStorage = JSON.parse(localStorage.getItem('inputCities')) || [];
        // Searched cities array length
        let arrayLength = arrayStorage.length;

        // Loop through the array with searched cities
        for (let i = 0; i < arrayLength; i++) {
            // Variable with city names from the array
            let cityName = arrayStorage[i];
            // Appending searched cities
            $('#searchedCities').append (
                // Appending a city list
                "<div class= 'list-group'>"
                // Appending every searched city as a call-back button
                + "<button class='list-group-item'>" + cityName + "</button>"
            );
        };
    };
    // Calling in function
    displayCities ();

    // On click event to displayCities / function / this
    $('#searchedCities').on('click', '.list-group-item', function(event) {
        // Prevents default action
        event.preventDefault();
        // Variable to call back cities
        let savedCity = ($(this).text());
        displayWeather(savedCity);
    });
});