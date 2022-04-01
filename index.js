var express = require("express");
bodyParser = require("body-parser");
const path = require("path");
const http = require('http');

const { profile } = require("console");
var app = express();



const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/fuelquote')
var db = mongoose.connection

const Profile = require('./profile.js')
const User = require('./user.js')


const server = http.createServer(app);
app.use(express.static(path.join(__dirname,'./frontend')));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


//Unique id to identify each user
var id;

//Sign up and log in routes
app.get('/',function (req, res){
    
    res.sendFile(path.join(__dirname,'./Frontend/login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname,'./Frontend/signup.html'))
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

app.post('/registered', async (req, res) => {
    let user = new User( {
        username: req.body.username,
        password : req.body.password
    })
    try {
        user = await user.save()
        res.redirect('/')

    } catch(e) {
        console.log(e)
    }

});


app.get("/mainmenu", (req, res) => {

    res.sendFile(path.join(__dirname,'./Frontend/mainmenu.html'))
})
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






//Profile Routes
app.get("/account",  (req, res) => {
    res.sendFile(path.join(__dirname,'./frontend/account.html'))

});

app.get("/getProfile", (req, res) => {
    res.send()
});

app.post("/saved", (req, res) => {

    console.log(id)
    User.findOneAndUpdate({_id: id}, {$set: {name: req.body.full_name}}, {upsert:true})
    res.redirect('/account')

    /* let profile = new Profile({
        name : req.body.full_name,
        address : req.body.address_1,
        address_2 : req.body.address_2,
        city : req.body.city,
        state : req.body.state,
        zip : req.body.zip
    })
    try {
        profile = await profile.save()
        res.redirect('/account')
    } catch(e) {
        console.log(e)
    } */
    //res.sendFile(path.join(__dirname, 'profile_saved.html'))    
    //res.send(req.body)
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


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started at port 3000!");
});



