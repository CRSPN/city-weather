
var APIKey = "da1207ce6ca80c363fd1e4bb5cdbcbc9";
var cityInputEl = document.querySelector(".form-control");
var weatherIconEl = document.querySelector("#weatherIcon");
const cityHistory = JSON.parse(localStorage.getItem("storedCities")) || [];

var fetchAPI = function(city) {

    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + 
                            APIKey + "&units=imperial";
    fetch(currentWeatherUrl)
        .then(function(response) {
            
            if (response.ok) {
                response.json().then(function(response) {
                        $('#weathCard').removeClass('.hide').addClass('card');
                        
                           
                            $("#city-search-term").text("");
                            $("#city-search-term").text(response.name);
                           
                            $("#date").text("(" + moment().format("L") + ")");
                          
                            weatherIconEl.setAttribute('src', "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
                        fetchUV(response);
            });
        } else {
            $("#city-search-term").text("Error: " + response.statusText);
            setTimeout(
                function() {
                    location.reload(true);
                }, 2000);
        }
    })
    .catch(function(error) {
        alert("Unable to connect");
    });
};

var fetchUV = function(response) {
    
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + 
                 response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey;
    
    fetch(uvURL)
        .then(function(uvData) {
            
            if (uvData.ok) {
                uvData.json().then(function(uvData) {
                    
                    $("#curWeath").empty();
                    $("#curWeath").append(
                        $('<h4/>', {text: "Temperature: " + Math.round(response.main.temp) + " \u00B0F"}),
                        $('<h4/>', {text: "Humidity: " + response.main.humidity + "%"}),
                        $('<h4/>', {text: "Wind Speed: " + response.wind.speed + " MPH"}),
                        $('<h4/>', {text: "UV Index: "}).append(
                            $('<span/>', {'id': 'uvColor', text: uvData[0].value})));
                            
                            if(uvData[0].value < 5) {
                                $("#uvColor").addClass("bg-success rounded px-2");
                            } else if (uvData[0].value > 6) {
                                $("#uvColor").addClass("bg-danger rounded px-2");
                            } else {
                                $("#uvColor").addClass("bg-warning rounded px-2");
                            };
                    fetchForecast(response, uvData);
            });
        } else {
            alert("Eror: " + uvData.statusText);
            setTimeout(
                function() {
                    location.reload(true);
                }, 2000);
        }
    })
    .catch(function(error) {
        alert("Unable to connect");
    });
};

var fetchForecast = function(response, uvData) {
    
    var increment = 0;
    
    var forecastIndex = [0,1,2,3,4];
   
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "&temp_max&units=imperial&appid=" + APIKey;
    
    fetch(forecastURL)
        .then(function(foreData) {
            
            if (foreData.ok) {
                foreData.json().then(function(foreData) {
                    $("#forecastLabel").text("5-Day Weather Forecast");
                    $("#forecast").empty();
                    jQuery.each(forecastIndex, function appendElements(){
                        
                        $("#forecast").append(
                            $('<div/>', {'class': 'col', 'id': 'card-holder'}).append(
                                $('<div/>', {'class': 'card bg-primary'}).append(
                                    $('<div/>', {'class': 'card-body text-center'}).append(
                                        $('<h4/>', {'class': 'card-title', text: moment(foreData.list[increment].dt_txt).format("L")}),
                                        $('<img>', {'class': 'card-subtitle', 'alt': 'Weather Icon', 'src': "http://openweathermap.org/img/wn/" + foreData.list[increment].weather[0].icon + "@2x.png"}),
                                        $('<div/>', {'class': 'card-text'}).append(
                                            $('<h5/>', {text: 'Temp: ' + Math.round(foreData.list[increment].main.temp) + " \u00B0F"}),
                                            $('<h5/>', {text: 'Humidity: ' + foreData.list[increment].main.humidity + "%"})                  
                        )))));
                        increment = increment + 8; 
                    });
            });
        } else {
            alert("Eror: " + foreData.statusText);
            setTimeout(
                function() {
                    location.reload(true);
                }, 2000);
        }
    })
    .catch(function(error) {
        alert("Unable to connect");
    });
};

$(document).ready(function(){
    
    var prevCity = cityHistory;
    
    if (cityHistory.length > 10){
    var recentIndex = cityHistory.length - 10;
    } else {
        var recentIndex = 0;
    }
    for (var i = recentIndex; i < cityHistory.length; i++){
        if(prevCity !== null & cityHistory[i].cityname !== "") {
            $("#cityHistory").append(
                $('<button/>', {'class': 'text-left btn btn-light btn-outline-secondary btn-block mt-2', 'id': 'historyBtn', 'value': cityHistory[i].cityname, text: cityHistory[i].cityname}));
        }
    }
});

$('#searchButton').on('click', function(event){  
    event.preventDefault();
    cityInput = document.querySelector(".form-control").value.trim();
    const cityArray = {
       cityname: cityInput
     };
    cityHistory.push(cityArray);
    localStorage.setItem("storedCities", JSON.stringify(cityHistory));
        
        var city = cityInputEl.value.trim();
        if (city) {
            fetchAPI(city);
            cityInputEl.value = "";
        } else {
        alert("Please enter a valid city.");
        }
});

$('#cityHistory').on('click', '.btn-outline-secondary', function(){  
    var city = $(this).text();
    fetchAPI(city);
});

$('#refreshBtn').on('click', function(){  
    location.reload();
});