const mongoose = require('mongoose')

const orderschema = new mongoose.Schema({
    id :{
        type : String,
        required : true,
        unique : true
    },
    cust_Name : {
        type : String,
        required : [true, "Customer Name is Required"]
    },
    cust_Phone : {
        type : Number,
        required : [true, "Customer Phone Number is Required"]
    },
    cust_Address : {
        type : String,
        required : [true, "Customer Address is Required"]
    },
    order_Date : {
        type : Date,
        default : Date.now
    },
    Est_Del_Date : {
        type : Date,
        default : new Date(Date.now()+ 5 * 24 * 60 * 60 * 1000)
    },
    Products : [{
        product_id : {
            type : String,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        total : {
            type : Number,
            required : true
        }
    }],
    Total_Amount : {
        type : Number,
        required : true
    },
    Order_Status : {
        type : String,
        enum : ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default : "Pending"
    },
    user_id : {
        type : String,
        required : true
    },
    user_email : {
        type : String,
        required : true
    }
})

const Order = mongoose.model( "Order", orderschema)

module.exports = { Order };