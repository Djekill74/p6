const mongoose = require('mongoose');

const sauceShema = mongoose.Schema ({
    userId: {type: String},
    name: {type: String},
    manufacturer: {type: String},
    description: {type: String},
    mainPepper: {type: String},
    imageURL: {type: String},
    heat: {type: Number},
    likes: {type: Number},
    dislikes: {type: Number}
})

module.exports = mongoose.model('Sauce', sauceShema);