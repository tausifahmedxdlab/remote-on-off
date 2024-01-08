
const mongoose = require('mongoose');
const AppSchema = new mongoose.Schema({
    IMEI:{
        type:String,
        required:true
    },
    SIM:{
        type:String,
        required:true
    },
    APPSTATUS:{
        type:String, 
    },
    RUNSTATUS:{
        type:String,
    },
    RMSDATETIME:{
        type:String, 
    },
    MOTORRPM:{
        type:String, 
    },
    DATE:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("remoteapps",AppSchema);