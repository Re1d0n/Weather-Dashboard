let apiKey = "b3b997158834d4aa5a92e5196a4eba68";
let searchPress = document.getElementById("search-button");
let classExample = document.querySelectorAll(".btn");
let userInput = document.querySelector("input");


function getLocation(location){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let lat = data.coord.lat
    let lon = data.coord.lon
    currentWeatherData(lat,lon);
    fiveDayData(lat,lon);
    })
}


function submitSearch (event){
  event.preventDefault();
  console.log(userInput.value);
  getLocation(userInput.value)
}
//delete console log

searchPress.addEventListener("click", submitSearch);



function currentWeatherData(latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${apiKey}&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.current.temp);
      console.log(data.current.humidity);
      console.log(data.current.uvi)
      console.log(data.current.wind_speed);
      const today = document.getElementById("day0")
      const tempature = document.createElement("p")
      const moistLevel = document.createElement("p")
      const speedOfWind = document.createElement("p")
      const sunburnScale = document.createElement("p")
      const cloud = document.createElement("p")
      tempature.textContent = `${data.current.temp} F`
      moistLevel.textContent =`humidity: ${data.current.humidity}%` 
      speedOfWind.textContent =`${data.current.wind_speed} MPH`
      sunburnScale.textContent =`UV: ${data.current.uvi}`
      cloud.textContent =`icon: ${data.weather.icon}`


      today.appendChild(tempature)
      today.appendChild(moistLevel)
      today.appendChild(speedOfWind)
      today.appendChild(sunburnScale)
      today.appendChild(cloud)
      
      
    })
  }
  

  function fiveDayData(latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        
        
      console.log(data);
      let futureWeatherArray = [];
      
      
      
      for(let i = 0; i < data.list.length; i++) {
          
         if(data.list[i].dt_txt.includes("12:00:00")){
             futureWeatherArray.push(data.list[i]);
             console.log(data.list[i]);
             console.log(data.list[i].weather[0].description);
             console.log(data.list[i].main.temp);
             console.log(data.list[i].main.humidity);
             console.log(data.list[i].wind.speed);

             
         }



 
         
      }
   

      
     handleArray(futureWeatherArray)
    })
  }

function handleArray (array) {
    for(let i=0; i<5;i++){
        

           
            let fiveDay =document.getElementById(`day${i+1}`)
            let timeFuture = document.createElement(`p`)
            let description = document.createElement(`p`)
            let tempDays = document.createElement(`p`)
            let humiditys = document.createElement(`p`)
            let windys = document.createElement(`p`)
            let cloudPic = document.createElement(`p`)
            timeFuture.textContent = array[i].dt_txt
            description.textContent = array[i].weather[0].description
            tempDays.textContent = array[i].main.temp + " TEMP"
            humiditys.textContent = array[i].main.humidity + " RH"
            windys.textContent = array[i].wind.speed + " MPH"
            cloudPic.textContent = array[i].weather.icon
            fiveDay.appendChild(timeFuture)
            fiveDay.appendChild(description)
            fiveDay.appendChild(tempDays)
            fiveDay.appendChild(humiditys)
            fiveDay.appendChild(windys)
            fiveDay.appendChild(cloudPic)
       
        
    }
}