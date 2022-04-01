const {validationResult, check} = require("express-validator");


//https://www.freecodecamp.org/news/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7/

const testAccount = [{userName: "testuser", passWord: "testpass"}];

const testProfile = [{id: 1, first: "testfirst", last: "testlast", addr1: "111 test st", addr2:"222 test st" , city:"Houston",state:"TX",zipcode:"77777"}]
const testProfile2 = [{idd:"1", firstn: "proffirst", lastn: "proflast", addrr1: "", addrr2: "", cityy:"", statee:"", zipcodee:""}]

function findUser(userArr, user) {
    if(userArr.find(use=> use.userName === user)) {
        return true;
    }
    return false;
}

function findPassword(passArr, passs) {
    if(passArr.find(pass=>pass.passWord === passs)) {
        return true;
    }
    return false;
}

exports.validate = (method) => {
    switch(method) {
        case 'createUser': {
            return [
            check(["userName"]).exists(),
            check(["passWord"]).exists()
            ]
        }
        case 'loginUser': {
            return [
            check(["userName"]).exists(),
            check(["passWord"]).exists()
            ]
        }
        case 'fillProfile': {
            return [
            check(["firstn"]).exists(),
            check(["lastn"]).exists()
            ]
        }
    }
}


const gatherAllLogin = (res)=> {
    res.json({acc: testAccount});
};

const getID = (req, res)=>{
    const accID = req.params.idd;
    const temp = testProfile2.findIndex(i => i.idd === accID);
    if(testProfile2[temp].idd === accID)
    {
        res.json({message: "done"});
    }
    res.status(404).json({errors:errors.array()});
}

const login = async (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(422).json({errors: errors.array() });
        return;
    }

    const {userName, passWord} = req.body;

    const foundUser = findUser(testAccount, userName);
    const foundPassword = findPassword(testAccount, passWord);

    if(!foundUser || !foundPassword) {
        res.status(401).json({errors:errors.array()});
        return;
    }
    //testProfile.isLoggedin = true;
    res.json({message: "You've logged in"});
};

const registration = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(422).json({errors: errors.array() });
        return;
    }

    const {userName, passWord} = req.body;

    const createUser = {userName:userName, passWord:passWord};

    const accInfo = {id:2, first: "", last: "", addr1: "", addr2: "", city:"", state:"", zipcode:""}

    testAccount.push(createUser);
    testProfile.push(accInfo);
    res.status(201).json({message:"Created Account"});


};

const fillProfileForm = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(422).json({errors: errors.array() });
        return;
    }
    const {idd, firstn, lastn, addrr1, addrr2, cityy, statee, zipcodee} = req.body;
    
    const index = testProfile2.findIndex(i => i.idd === idd);
    if(firstn.length > 25) {
        res.status(400).json({errors: errors.array() });
        return;
    }
    if(lastn.length > 25) {
        res.status(400).json({errors: errors.array() });
        return;
    }
    if(addrr1.length > 100) {
        res.status(400).json({errors: errors.array() });
        return;
    }
    if(addrr2.length > 100) {
        res.status(400).json({errors: errors.array() });
        return;
    }
    if(cityy.length > 100) {
        res.status(400).json({errors: errors.array() });
        return;
    }
    if(zipcodee.length > 9) {
        res.status(400).json({errors: errors.array() });
        return;
    }
    testProfile2[index].firstn = firstn;
    testProfile2[index].lastn = lastn;
    testProfile2[index].addrr1 = addrr1;
    testProfile2[index].addrr2 = addrr2;
    testProfile2[index].cityy = cityy;
    testProfile2[index].statee = statee;
    testProfile2[index].zipcodee = zipcodee;

    res.status(200).json({message: "updated"});
    
}


exports.gatherAllLogin = gatherAllLogin;
exports.login = login;
exports.registration = registration;
exports.getID = getID;
exports.fillProfileForm = fillProfileForm;