let searchInput = document.getElementById('search')
let homeNav = document.querySelector('.home')
let contactNav = document.querySelector('.contact')
let weatherData;

async function getApiData(searchKey){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b8c3353fd2c244178ac93741250105&q=${searchKey}&days=3`)
    let data = await response.json()
    return data
}

async function allWeatherData(searchKey){
    weatherData = await getApiData(searchKey)
    displayFirstCard()
    displaySecondDay()
    displayThirdDay()
    // console.log(weatherData);
}

searchInput.addEventListener('input' , function(){
    if(searchInput.value.length > 2){
        allWeatherData(searchInput.value)
    }
})

function displayFirstCard(){
    let date = new Date(weatherData.location.localtime)
    document.querySelector('.card-header #date1').innerHTML = date.toLocaleDateString('en-us' , {weekday:'long'})
    document.querySelector('.card-header #date2').innerHTML = date.toLocaleDateString('en-us' , {day:'2-digit'})
    document.querySelector('.card-header #monthDate').innerHTML = date.toLocaleDateString('en-us' , {month:'long'}) 
    document.querySelector('.weatherCard .p1').innerHTML = weatherData.location.name
    document.querySelector('.weatherCard .p2').innerHTML = weatherData.current.temp_c + `<sup>o</sup>C`
    document.querySelector('.card-body #weatherImg').setAttribute('src' , `https:${weatherData.current.condition.icon}`) 
    document.querySelector('.weatherCard .p3').innerHTML = weatherData.current.condition.text
}

function displaySecondDay(){
    let date = new Date(weatherData.forecast.forecastday[1].date)
    document.querySelector('.card-header2 .content span').innerHTML = date.toLocaleDateString('en-us' , {weekday:'long'}) 
    document.querySelector('.card-body2 #weatherImg2').setAttribute('src' , `https:${weatherData.forecast.forecastday[1].day.condition.icon}`) 
    document.querySelector('.weatherCard .p4').innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>C`
    document.querySelector('.card-body2 span').innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>C`
    document.querySelector('.weatherCard .p5').innerHTML = weatherData.forecast.forecastday[1].day.condition.text
}

function displayThirdDay(){
    let date = new Date(weatherData.forecast.forecastday[2].date)
    document.querySelector('.card-header3 .content span').innerHTML = date.toLocaleDateString('en-us' , {weekday:'long'}) 
    document.querySelector('.card-body3 #weatherImg3').setAttribute('src' , `https:${weatherData.forecast.forecastday[2].day.condition.icon}`) 
    document.querySelector('.card-body3 .p4').innerHTML = weatherData.forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>C`
    document.querySelector('.card-body3 span').innerHTML = weatherData.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>C`
    document.querySelector('.card-body3 .p5').innerHTML = weatherData.forecast.forecastday[2].day.condition.text
}

navigator.geolocation.getCurrentPosition(function(location){
    // console.log(location);
    let myLocation = location.coords.latitude + ',' + location.coords.longitude
    allWeatherData(myLocation)
})
