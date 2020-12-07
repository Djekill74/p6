const mongoose = require('mongoose');

const sauceShema = mongoose.Schema ({
    name: {type: String, required: true},
    manufacturer: {type: String, required:true},
    description: {type: String, required:true},
    mainPepper: {type: String, required:true},
    heat: {type: Number}
})