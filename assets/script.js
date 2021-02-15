var cityForm = document.querySelector("#city-form");
$(".card").hide();

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
     forecast(data);
     saveSearch(data);
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
//get forecast from api
var forecast = function(data){
     var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + data.name + "&units=imperial&appid=7718d66c5dd4f433e079cf4a982af6f7";
     console.log(forecastApi);
     fetch(forecastApi).then(function(response){
          response.json().then(function(castData){
               console.log(castData);
               console.log(castData.list[0]);
               castCard(castData);
          });
     });
};
//add forecast data to cards
var castCard = function(castData){
     $("#header1").text(castData.list[0].dt_txt);
     $("#header2").text(castData.list[8].dt_txt);
     $("#header3").text(castData.list[16].dt_txt);
     $("#header4").text(castData.list[24].dt_txt);
     $("#header5").text(castData.list[32].dt_txt);
     
     $("#temp1").text("Temperature: " + castData.list[0].main.temp + "°F");
     $("#temp2").text("Temperature: " + castData.list[8].main.temp + "°F");
     $("#temp3").text("Temperature: " + castData.list[16].main.temp + "°F");
     $("#temp4").text("Temperature: " + castData.list[24].main.temp + "°F");
     $("#temp5").text("Temperature: " + castData.list[32].main.temp + "°F");

     $("#hum1").text("Humidity: " + castData.list[0].main.humidity + "%");
     $("#hum2").text("Humidity: " + castData.list[8].main.humidity + "%");
     $("#hum3").text("Humidity: " + castData.list[16].main.humidity + "%");
     $("#hum4").text("Humidity: " + castData.list[24].main.humidity + "%");
     $("#hum5").text("Humidity: " + castData.list[32].main.humidity + "%");
     $(".card").show();
};

var saveSearch = function(data){
     var i = 0
     console.log(data.name);
     localStorage.setItem(i, data.name);
     i++;
     
};

var getSearch = function(){
     var i;
     for (i = 0; i < 10; i++) {
     var savedCity = localStorage.getItem(i);
     console.log(savedCity);
     let citySearched = $("<div>").text(savedCity);
     $("#searches").append(citySearched);
     };
};

getSearch();
// var cardTest = function(){
//      let testCard = $("<div>").addClass('card');
//      let cardTitle = $("<div>").text('Header').addClass('card-header');
//      $(testCard).append(cardTitle);
//      $("#weather-div").append(testCard);
     
// };

// cardTest();