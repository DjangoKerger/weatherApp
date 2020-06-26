const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
      
});

app.post("/", function (req,res){

    const query = req.body.cityName;
    const apiKey = "3df84af1828eb0aaca341401c109840c";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+ apiKey
    https.get(url, function(response){

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>the weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is "+ temp + " degrees Fahrenheit</h1>")
            res.write("<img src=" + imgURL + ">")
            res.send()
            
        })
    })
})




app.listen(3000, function() {
    console.log("server is runnning on port 3000")
})