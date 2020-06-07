var cityName = "salt lake"
var suggestCitys = []

var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=b3617964f38f8a70c001f1c957a1f8ce&units=imperial"

$.ajax({
    url:currentWeatherUrl,
    method:"GET"
}).then(function(data){
    console.log(data)
    
})

var selectCity = function() {
    localStorage.getItem()
}

var loadLocalWeather = function() {

    document.getItem

}