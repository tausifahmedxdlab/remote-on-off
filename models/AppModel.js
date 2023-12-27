
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
        require:true
    },
    RUNSTATUS:{
        type:String,
        require:true
    },
    DATE:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("remoteapps",AppSchema);