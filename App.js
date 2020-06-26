const express = require("express");
const https = require("https")

const app = express();

app.get("/", function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=houston&units=imperial&appid=3df84af1828eb0aaca341401c109840c"
    https.get(url, function(response){

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>the weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temperature in Houston is "+ temp + " degrees Fahrenheit</h1>")
            res.write("<img src=" + imgURL + ">")
            res.send()
            
        })
    })  
})


app.listen(3000, function() {
    console.log("server is runnning on port 3000")
})