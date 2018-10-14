var mongoose = require('mongoose');
module.exports = mongoose.model('plant',{

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    wateringInterval: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        default: ''
    },
    fertilizerInterval: {
        type: Number,
        default: 0
    },
    wateringTime:
    {
        type: String,
        default: ''
    }, 
    fertilizierTime: {
        type: String,
        default: ''
    }


});