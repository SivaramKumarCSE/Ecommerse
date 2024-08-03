const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId : {
        type : String,
        require: true

    },
    product : [
        {
        productId : String,
        quantity : Number
    },
],
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = { Cart };