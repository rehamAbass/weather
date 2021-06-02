//==============================================================================
//==============================================================================

const path = require('path')
var express = require('express')
var request = require('request')
var mongoose = require('mongoose')
const api = require('./server/routes/api')
var app = express()
// mongoose.connect('mongodb://localhost/weather')


mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/weather');



app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist'))) 
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)
//==============================================================================

//https://home.openweathermap.org/
// login in the weather api : mail : reham.shaker.. | sesma: anaanare..
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// my api key = 'ec0c28ee56fec4aafef836a9c7c91505'
// another api key = '11e1de2ad7f0a75af4883619e383ca83'
// the perfect api = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=5f2ef77ab2ebe928102ffe423e8c062b'
// cities = JSON.parse(body)

let firstApi='api.openweathermap.org/data/2.5/weather'
const ApiKey = '11e1de2ad7f0a75af4883619e383ca83'
let city ='London'
// request(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`, function(err,res,body){
//     let result = JSON.parse(body)
//     console.log("from request , result = ",result);
// })
//==============================================================================


const PORT = 8080

app.listen(process.env.PORT || PORT, function() {
    console.log(`Server up and running on port ${PORT}`)
})
//==============================================================================