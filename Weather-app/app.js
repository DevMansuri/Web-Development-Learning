const { log } = require("console");
const { response } = require("express");
const express = require("express");
const https = require("https");

const app  = express();


app.get("/",function(req ,res) {
 const url =  "https://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=dba8d8b73103f2ed507d4514483efb0b&units=metric";
    
 https.get( url ,function(response) {
    response.on("data" ,function(data) {
        const weatherData = JSON.parse(data);
        const temp  = weatherData.main.temp;
        const cloud = weatherData.weather[0].description;
        console.log(temp);
        console.log(cloud);

    })
 } );

})

app.listen(3000, function() {
    console.log("Server running at port 3000");
});