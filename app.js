const express = require('express');
const app = express();
const path = require('path');


app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({extended:false}));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'))
});

app.post("/saved", (req, res) => {
    res.sendFile(path.join(__dirname, 'profile_saved.html'))
    var name = req.body.full_name,
        address = req.body.address_1,
        address_2 = req.body.address_2,
        city = req.body.city,
        state = req.body.state,
        zip = req.body.zip
    //res.send(req.body)
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Listening on port '+ PORT)
});

