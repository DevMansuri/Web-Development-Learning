const { log } = require("console");
const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app  = express();
app.use(bodyParser.urlencoded({extended :true}) );


app.get("/",function(req ,res) {
 res.sendFile(__dirname + "/index.html")
});

app.post("/" ,function(req ,res) {
    const query = req.body.cityName ;
    const apiKey = "dba8d8b73103f2ed507d4514483efb0b" ;
    const unit = "metric";
    const url =  "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    
    https.get( url ,function(response) {
       response.on("data" ,function(data) {
           const weatherData = JSON.parse(data);
           const temp  = weatherData.main.temp;
           const weather = weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon;
           const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png" ;
           res.write("<h1>The temprature of "+req.body.cityName+" is " + temp + "degree celcius</h1>" );
           res.write ("<p>Weather is currently " + weather + "</p>" );
           res.write("<img src = "+imageUrl+" >");
           res.send();
   
       })
    } );
   
})


app.listen(3000, function() {
    console.log("Server running at port 3000");
});