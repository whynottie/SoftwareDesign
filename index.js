var express = require("express");
bodyParser = require("body-parser");
const path = require("path");
const http = require('http');
var app = express();
const server = http.createServer(app);
app.use(express.static(path.join(__dirname,'./frontend')));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',function (req, res){
    
    res.sendFile(path.join(__dirname,'./Frontend/fuel_quote.html'));
});

var quoteData
var userfullAddress

app.post("/FuelQuote", function (req, res){
    
    quoteData = {    
        gallonsRequested: req.body.gallons,
        deliveryAddress: req.body.address,
        deliveryDate:req.body.date,
        pricePerGallon: req.body.suggested_price,
        totalAmt: req.body.total
       
    }


    res.sendFile(path.join(__dirname,'./frontend/fuel_quote.html'));

});
app.get('/getQuote', async(req,res) => {
    const quote_data = quoteData
    res.send(quote_data)
    
});
app.get('/getAddress', async(req, res) => {
    const address_data = {
        address: userfullAddress
    }
    res.send(address_data)
});
app.post("/saved", (req, res) => {
    var name = req.body.full_name,
        address = req.body.address_1,
        address_2 = req.body.address_2,
        city = req.body.city,
        state = req.body.state,
        zip = req.body.zip
    res.sendFile(path.join(__dirname, 'profile_saved.html'))    
    //res.send(req.body)
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started at port 3000!");
});



