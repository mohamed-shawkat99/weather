let todayDay = document.getElementById("today-day");
let todayMonth = document.getElementById("today-mounth");
let todayNum = document.getElementById("today-num");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayCondition = document.getElementById("today-condition");
let todayConditionText = document.getElementById("today-condition-text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDir = document.getElementById("windDir");
let search = document.getElementById("search");



let forecastImg = document.getElementsByClassName("forecast-img");
let forecastTempC = document.getElementsByClassName("forecast-temp-c");
let forecastText = document.getElementsByClassName("forecast-text");
let forecastDay = document.getElementsByClassName("forecast-day");



async function getWeatherData(city) {
        let weatherResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c33ff1df5a15463585f52353241601&q=${city}&days=7`);
        let weatherData = await weatherResponse.json();
        return weatherData;
}

// let date=new Date()
// console.log(date.toLocaleDateString("en-us",{weekday:"long"}));



function displayToday (data) {
    let todaydate=new Date()
    todayDay.innerHTML=todaydate.toLocaleDateString("en-us",{weekday:"long"})
    todayNum.innerHTML=todaydate.getDate()+"/"
    todayMonth.innerHTML=todaydate.toLocaleDateString("en-us",{month:"short"})
    todayLocation.innerHTML=data.location.name
    todayTemp.innerHTML=data.current.temp_c+"°C"
    todayCondition.setAttribute("src",data.current.condition.icon)
    todayConditionText.innerHTML=data.current.condition.text
    humidity.innerHTML=data.current.humidity+" %"
    wind.innerHTML=data.current.wind_kph+" km/h"
    windDir.innerHTML=data.current.wind_dir
}
function displayForecast(data) {

let forecast =data.forecast.forecastday

    for (let i = 0; i < 2; i++) {
        let nextdate= new Date(forecast[i+1].date)
        forecastDay[i].innerHTML=nextdate.toLocaleDateString("en-us",{weekday:"long"})
        forecastImg[i].setAttribute("src",forecast[i].day.condition.icon)
        forecastTempC[i].innerHTML=forecast[i].day.maxtemp_c+"°C"
        forecastText[i].innerHTML=forecast[i].day.condition.text
        
    }
}


async function start(city="cairo") {
    let weatherData=await getWeatherData(city)
    if (!weatherData.error) {
        displayToday(weatherData)
        displayForecast(weatherData)
    }else{
        console.log(error)
    }

    // console.log(weatherData);
}
start()

search.addEventListener("input",function () {
    start(search.value)
    // console.log(search.value);
})