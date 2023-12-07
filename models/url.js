const mongoose = require('mongoose')


const url_schema = new mongoose.Schema({
    shortURL: {
        type: String,
        require: true,
        unique: true
    },
    redirectURL: {
        type: String,
        require: true,
    },
    visitHistory: [{ timestamp: { type: Number } }]

}, { timestamps: true });

const urlModel=mongoose.model("url",url_schema);

module.exports=urlModel;