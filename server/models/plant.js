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
    sunInterval: {
        type: Number,
        default: 0
    },
    wateringTime:
    {
        type: String,
        default: ''
    }, 
    sunTime: {
        type: String,
        default: ''
    }
    , 
    createdDate: {
        type: Date,
        default: Date.now
    }

});