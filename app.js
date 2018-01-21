// get current position
function getCurrPos() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherInfo, noPosError);
    } else {
        alert('Geolocation is not supported by this browser');
    }
}

// handles errors returned when trying to get the location
function noPosError(error) {
    console.log(error);
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// calls the weather API with the user's current lat and lon
function getWeatherInfo(pos) {

    if (pos.coords) {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        pos = lat + ',' + lon;
    }

    var url = 'http://api.apixu.com/v1/current.json?key=c513f59a80574986b64190759180801&q=' + pos;
    var XHR = new XMLHttpRequest();

    XHR.open('GET', url);
    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4) {
            if (XHR.status === 200) {
                // parse the response as JSON
                var weatherInfo = JSON.parse(XHR.responseText)
                // this will render the info on the page
                displayWeather(weatherInfo);
            } else if (XHR.status === 500) {
                alert('Unable to get weather info')
            }
        }
    };
    XHR.send();
}

function displayWeather(weatherInfo) {

    console.log(weatherInfo); 

    var country = weatherInfo.location.country; // country
    var region = weatherInfo.location.region; // region
    var localtime = weatherInfo.location.localtime; // localtime
    var icon = weatherInfo.current.condition.icon; // weatherIcon
    var weatherText = weatherInfo.current.condition.text; // weatherText
    var tempC = weatherInfo.current.temp_c;
    var tempF = weatherInfo.current.temp_f;
    var temp = tempC + ' C | ' + tempF + ' F' // temp
    var windKPH = weatherInfo.current.wind_kph;
    var windMPH = weatherInfo.current.wind_mph;
    var wind = windKPH + ' KPH | ' + windMPH + ' MPH' // wind
    var humidity = weatherInfo.current.humidity; // humidity

    // writing the values to the page
    document.getElementById('country').innerText = country;
    document.getElementById('region').innerText = region;
    document.getElementById('localtime').innerText = localtime;
    document.getElementById('weatherIcon').src = icon;
    document.getElementById('weatherText').innerText = weatherText;
    document.getElementById('temp').innerText = temp;
    document.getElementById('wind').innerText = wind;
    document.getElementById('humidity').innerText = humidity;
   
}


// calling the function that will get the current position
getCurrPos();

// search by location btn
var searchBtn = document.getElementById('searchBtn');
// search by location input field
var searchTxtBox = document.getElementById('searchTxtBox');

// adding trigger to search btn
searchBtn.addEventListener('click', function() {
    getWeatherInfo(searchTxtBox.value);
});

// adding triger to input field
searchTxtBox.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        getWeatherInfo(searchTxtBox.value);
    }
})


