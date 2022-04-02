var mongoose=require("mongoose");
var UserSchema=mongoose.Schema({
gallonsRequested: Number,
deliveryAddress: String,
pricePerGallon: Number,
totalAmt: Number
});


module.exports=mongoose.model("FuelQuoteForm", UserSchema);
