let apiKey = b3b997158834d4aa5a92e5196a4eba68;
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
      const tempature = document.createElement("h1")
      const moistLevel = document.createElement("h1")
      const speedOfWind = document.createElement("h1")
      const sunburnScale = document.createElement("h1")
      tempature.textContent = `${data.current.temp} F`
      moistLevel.textContent =`humidity: ${data.current.humidity}%` 
      speedOfWind.textContent =`${data.current.wind_speed} MPH`
      sunburnScale.textContent =`UV: ${data.current.uvi}`


      today.appendChild(tempature)
      today.appendChild(moistLevel)
      today.appendChild(speedOfWind)
      today.appendChild(sunburnScale)
      
      
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



    // let day1 =document.getElementById("day1")
    // let day2 =document.getElementById("day2")
    // let day3 =document.getElementById("day3")
    // let day4 =document.getElementById("day4")
    // let day5 =document.getElementById("day5")


         
      }
   

      
     handleArray(futureWeatherArray)
    })
  }

function handleArray (array) {
    for(let i=0; i<5;i++){
        
            let fiveDay =document.getElementById(`day${i+1}`)
            let timeFuture = document.createElement(`h${i+1}`)
            let description = document.createElement(`h${i+1}`)
            let tempDays = document.createElement(`h${i+1}`)
            let humiditys = document.createElement(`h${i+1}`)
            let windys = document.createElement(`h${i+1}`)
            timeFuture.textContent = array[i].dt_txt
            description.textContent = array[i].weather[0].description
            tempDays.textContent = array[i].main.temp
            humiditys.textContent = array[i].main.humidity
            windys.textContent = array[i].wind.speed
            fiveDay.appendChild(timeFuture)
            fiveDay.appendChild(description)
            fiveDay.appendChild(tempDays)
            fiveDay.appendChild(humiditys)
            fiveDay.appendChild(windys)
       
        
    }
}