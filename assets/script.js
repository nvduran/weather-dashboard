var cityForm = document.querySelector("#city-form");

//city search button
$("#stateBtn").on('click', function(){
     var cityChoice = cityForm.value.trim();
     console.log(cityChoice);
     weatherFetch(cityChoice);
});

//pull weather data for chosen city
var weatherFetch = function(city){
     var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=7718d66c5dd4f433e079cf4a982af6f7";
     fetch(apiUrl).then(function(response){
          response.json().then(function(data){              
               addinfo(data);
          });
     });
};

//add weather to right side div
var addinfo = function(data){    
     console.log(data);   
     let cityName = $("<div>").text(data.name).addClass('h1');
     let cityTemp = $("<div>").text("Temperature: " + data.main.temp.toFixed(1) + "°F");
     let cityHumidity = $("<div>").text("Humidity: " + data.main.humidity + "%");
     let cityWind = $("<div>").text("Wind Speed: " + data.wind.speed + " MPH");

     $("#weather-div").append(cityName);
     $("#weather-div").append(cityTemp);
     $("#weather-div").append(cityHumidity);
     $("#weather-div").append(cityWind);
     getUv(data);
};

//get UV index
var getUv = function(data){
     var cityLat = data.coord.lat.toFixed(2);
     var cityLon = data.coord.lon.toFixed(2);
     var uvApi = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=7718d66c5dd4f433e079cf4a982af6f7";
     console.log(uvApi);
     fetch(uvApi).then(function(response){
          response.json().then(function(uvData){
               addUv(uvData.value);
          });         
     });
};

//add UV index to page
var addUv = function(value){
     console.log(value);
     let cityUv = $("<div>").text("UV Index: " + value);
     $("#weather-div").append(cityUv);
     if(value < 3){
          $(cityUv).addClass('uv-low');
     }else if(value >= 3 && value < 6){
          $(cityUv).addClass('uv-moderate');
     }else{
          $(cityUv).addClass('uv-high');
     };
};



// var cardTest = function(){
//      let testCard = $("<div>").addClass('card');
//      let cardTitle = $("<div>").text('Header').addClass('card-header');
//      $(testCard).append(cardTitle);
//      $("#weather-div").append(testCard);
     
// };

// cardTest();