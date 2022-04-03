var express = require("express");
bodyParser = require("body-parser");
const path = require("path");
const http = require('http');
const { profile } = require("console");
var app = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:Password1!@fuelquoteapp.m75vd.mongodb.net/FuelQuoteApp?retryWrites=true&w=majority')
var db = mongoose.connection
//User Schema for DB
const User = require('./models/user.js');
const fuelquoteform = require("./models/fuelquoteform")
const { response } = require("express");
const user = require("./models/user.js");


const server = http.createServer(app);
app.use(express.static(path.join(__dirname,'./frontend')));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


//Unique id to identify each user
var id;

//Sign up and log in routes

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,'./frontend/login.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,'./Frontend/signup.html'))
});
app.post('/registered', async (req, res) => {
    let user = new User( {
        username: req.body.username,
        password : req.body.password
    })
    try {
        user = await user.save()
        res.redirect('/login')

    } catch(e) {
        console.log(e)
    }

});
app.get('/login',function (req, res){
    
    res.sendFile(path.join(__dirname,'./Frontend/login.html'));
});
app.get("/mainmenu",  (req, res) => {
    res.sendFile(path.join(__dirname,'./frontend/mainmenu.html'))

});
app.post('/login', (req, res) => {
    var login_info = {
        username : req.body.username,
        password : req.body.password
    }
    User.find(login_info)
        .then((result) => {
            try{
            id = String(result[0]._id).split('"')
            id = String(id[0])
            res.redirect('/mainmenu')
            } catch(e) {
                console.log(e)
                console.log("User not found")
            }
        })
        .catch((err) => {
            console.log(err)
        })
});
app.get("/fuelhistory",  (req, res) => {
    res.sendFile(path.join(__dirname,'./frontend/history.html'))

});


app.get("/account",  (req, res) => {
    res.sendFile(path.join(__dirname,'./frontend/account.html'))

});


//Profile Routes




var profileInfo
var userfullAddress
app.post("/saved", async (req, res) => {
    userfullAddress = req.body.address_1
    const user = await User.findOneAndUpdate({_id:id},{
        $set:
     {name : req.body.full_name,
            address1 : req.body.address_1,
            address2: req.body.address_2,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip,
            userfullAddress:req.body.address_1}})
    res.redirect('/FQF')
});
app.get("/FQF",function(req,res){
    res.sendFile(path.join(__dirname,'./frontend/fuel_quote.html'))
});
var quoteData

app.post("/FuelQuote", function (req, res){
    quoteData = {    
        gallonsRequested: req.body.gallons,
        deliveryAddress: req.body.address_1,
        deliveryDate:req.body.date,
        pricePerGallon: req.body.suggested_price,
        totalAmt: req.body.total
       
    }
    new fuelquoteform(quoteData).save()
    res.sendFile(path.join(__dirname,'./frontend/history.html'));
});
app.get('/getQuote', async(req,res) => {
    const quote_data = quoteData
    res.send(quote_data)
    
});
app.get('/getAddress', async(req, res) => {
    const address_data = {
        address:userfullAddress}
    res.send(address_data)
});


app.get("/getProfile", async (req, res) => {
    var profile_data 
    await User.findById(id).then((result)=>{
        try{
            profile_data={
                name:result.name,
                address1:result.address1,
                address2:result.address2,
                city:result.city,
                state:result.state,
                zip:result.zip
            }}catch(e){
            console.log(e)
        }
    })
    res.send(profile_data)
    
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started at port 3000!");
});



