const express = require('express');
const bodyParser = require("body-parser");
const request = require('request')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/',(req, res)=>{
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    // var option = {
    //     url: "https://apiv2.bitcoinaverage.com/convert/global",
    //     method: "GET",
    //     qs: {
    //         from:crypto,
    //         to: fiat,
    //         amount: amount
    //     }
    // };

    var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypto + fiat;

    //first parameter of request is url or option
    request(url ,function(error,response,body) {
        var data = JSON.parse(body);

        var price = data.last;
        var currentDate = data.display_timestamp;

        // var price = data.price;
        // var currentDate = data.time;

        res.write("<p>The current date is " + currentDate + "</p>");
        res.write("<h1> " + amount + " " + crypto + " is currently worth " + price + " " + fiat + "</h1>");
        res.send();
    });
});

app.listen(3000,()=>{
    console.log('Server is running of port 3000.')
});