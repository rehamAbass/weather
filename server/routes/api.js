//==============================================================================

const express = require('express')
const router = express.Router()
var City = require('../models/City')
var request = require('request')

//==============================================================================
//https://home.openweathermap.org/
// login in the weather api : mail : reham.shaker.. | sesma: anaanare..
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// my api key = 'ec0c28ee56fec4aafef836a9c7c91505'
// another api key = '11e1de2ad7f0a75af4883619e383ca83'
// the perfect api = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=5f2ef77ab2ebe928102ffe423e8c062b'
// cities = JSON.parse(body)

// router.get('/city/:city',function(req,res){
//     let city = req.params.city
//     console.log('\n\ncity name is ',city,"\n\n");
//     let data
//     request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5f2ef77ab2ebe928102ffe423e8c062b`,function(err,res,body){
//     let myCity = JSON.parse(body)
//     console.log('from request = ',myCity);
//     })
// res.send(`reham`)
// })
//==============================================================================
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?q="
const API_KEY = "5f2ef77ab2ebe928102ffe423e8c062b"
const IMAGE_URL = "http://openweathermap.org/img/w/"
const getWeatherAPI = cityName => {
    return `${WEATHER_API}${cityName}&appid=${API_KEY}`
}
//==============================================================================
const firstLetterToUpperCase = (name) => {
    let strArray = name.split(" ")
    let cityName
    let str 
    let charToUpperCase
    let charLowerCase 
    for (const indx in strArray) {
        str = strArray[indx]
        charToUpperCase = str.charAt(0).toUpperCase()
        charLowerCase = str.toLowerCase().slice(1)
        if (indx == 0) {
            cityName = charToUpperCase + charLowerCase
        } else {
            cityName = `${cityName} ${charToUpperCase}${charLowerCase}`
        }
    }
    return cityName
}
//==============================================================================
router.get('/city/:cityName', function (req, resp) {
    let { cityName } = req.params
    request(getWeatherAPI(cityName), function (error, response, body) {
        let cityData = JSON.parse(body)
        let city_weather = cityData.weather[0]
        let city = new City({
            name: cityData.name,
            temp: cityData.main.temp,
            condition: city_weather.description,
           conditionPic: `${IMAGE_URL}${city_weather.icon}.png`
            // conditionPic:``
        })
        console.log(city)
        resp.send(city)
    })
})
//==============================================================================
router.get('/cities', function (req, res) {
    City.find({})
        .exec(function (err, cities) {
            res.send(cities)
        })
})
//==============================================================================
router.post('/city/', function (request, response) {
    let data = request.body
    let city = new City({
        name: data.name,
        temp: data.temp,
        condition: data.temperature,
        conditionPic: data.conditionPic
    })
    const cityPromise = city.save()
    cityPromise.then(function (citySaved) {
        if (citySaved != null)
            response.send(`${citySaved.name}  saved`)
        else
            response.send(`Faield to save ${cityName}`)
    })
})
//==============================================================================
// router.delete('/city/:cityName', function( request,response){
//     const cityPromise = City.find({name: firstLetterToUpperCase(cityName) } , {_id:1})
//==============================================================================
router.delete('/city/:cityName',function(req,res){
    let {cityName} = req.params
    let cityPromise = weather.find({name:firstLetterToUpperCase(cityName)},{_id:1})
    cityPromise.then(function(cityId){
        weather.remove({_id:cityId})
        .exec(function(removedCity){
            console.log('removed city = ',removedCity)
            if(removedCity != null){
                res.send(`${cityName} successfuly removed`)
            }
            else{
                res.send(`can't remove ${cityName}!`)
            }
        })
    })

})
//==============================================================================
// $("body").on('click','.pic',function(){
//     let id =$(this).attr('id')
//==============================================================================
module.exports = router
//==============================================================================