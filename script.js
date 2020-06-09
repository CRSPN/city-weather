

var cityPick = []
var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=b3617964f38f8a70c001f1c957a1f8ce&units=imperial"

$.ajax({
    url:currentWeatherUrl,
    method:"GET"
}).then(function(data){
    console.log(data)
    
})



$(document).ready(function() {
    $("#setCity").click(function() {
    
    cityName = $(".form-control").val();
    
    $.ajax({
    url:currentWeatherUrl,
    method: "GET",
    

    
    
    })

})

var loadChosenCity = function() {
    $("#temp").val(data.temp);
    $("#humid").val(localStorage.getItem(data.humidity));
}

var loadLocalWeather = function() {

    document.getItem

}


$(".btn").on("click", function() {
    
    setChosenCity();
    loadChosenCity();
});