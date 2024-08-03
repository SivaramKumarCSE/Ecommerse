const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image: {
        type : String,
        required : true
    },
    rating: {
        rate : {
            type : String
        },
        count : {
            type : Number
        }
    }
})

const  Product = mongoose.model("Product", productschema)

module.exports = {Product};

