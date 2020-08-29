//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
// const https = request("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/findLocation.html");
})

app.post("/", function (req, res) {

    var address = req.body.inputAddress;
    var city = req.body.inputCity;
    var state = req.body.inputState;
    var zip = req.body.inputZip;



    console.log(address, city, state, zip);


})


app.listen(3003, function () {
    console.log("Server is listening on Port 3003");
});
