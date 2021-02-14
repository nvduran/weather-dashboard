var cityName = "Austin";

console.log("test");

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
let apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=7718d66c5dd4f433e079cf4a982af6f7";

fetch(apiUrl).then(function(response){
     response.json().then(function(data){
          console.log(data);
     });
});