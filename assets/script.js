var cityForm = document.querySelector("#city-form");
var cityName = "Austin";
//city search button
$("#stateBtn").on('click', function(){
     var cityChoice = cityForm.value.trim();
     console.log(cityChoice);

     weatherFetch(cityChoice);
});

//pull weather data for chosen city
var weatherFetch = function(city){
     var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7718d66c5dd4f433e079cf4a982af6f7";
     fetch(apiUrl).then(function(response){
          response.json().then(function(data){
               console.log(data);
          });
     });
};

