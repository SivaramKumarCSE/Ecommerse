const { Order } = require('../models/orderModel');
const { Cart } = require('../models/cartModel');
const { Product } = require('../models/productModel')
const { User } = require('../models/userModel')
const Cartservices = require('../services/cartservices')
const { v4: uuidv4 } = require('uuid');

const postOrder = async(req, res) => {
    const user_id = req.user;
    //console.log(user_id)
    
    
    try {
        const { cust_Name, cust_Phone, cust_Address, productId } = req.body;
        const cart =  await Cart.findOne({userId : user_id});

        //console.log(cart)

        if(!cart){
            return res.json({message : "cart not found"})
        }
        
        if(!productId) {


            const productIds = cart.product.map(product => product.productId)
            
            //console.log(productIds)

            const products = await Product.find({ id : { $in : productIds}})
            
            var subtotal = 0;
            const productDetails = cart.product.map(item => {
                const product = products.find(p => p.id === item.productId);
                subtotal += product.price * item.quantity
                return { 
                    product_id : item.productId,
                    quantity : item.quantity,
                    price : product.price,
                    total : (product.price * item.quantity)
                }
                
            })

            const user = await User.findById(user_id)
            console.log(productDetails)

            const order = new Order({
                id:uuidv4(),
                cust_Name,
                cust_Phone,
                cust_Address,
                Products:productDetails,
                Total_Amount : subtotal,
                user_id : req.user,
                user_email : user.email
            });

            await order.save()

            res.json({"message" : "Cart ordered successfully"})

            await Cartservices.deleteCart(user_id);
        }else{
            
            const productIds = await cart.product.filter(item => item.productId == productId).map(item => item.productId);

            console.log(productIds)

            const products = await Product.find({ id : { $in : productIds}})
            
            console.log(products)
            var subtotal = 0;
            const productDetails = products.map(item => {
                const product = cart.product.find(p => p.productId == item.id);
                subtotal += item.price * product.quantity
                return { 
                    product_id : product.productId,
                    quantity : product.quantity,
                    price : item.price,
                    total : (item.price * product.quantity)
                }
                
            })

            const user = await User.findById(user_id)
            console.log(productDetails)

            const order = new Order({
                id:uuidv4(),
                cust_Name,
                cust_Phone,
                cust_Address,
                Est_Del_Date : new Date(Date.now()+ 5 * 24 * 60 * 60 * 1000),
                Products:productDetails,
                Total_Amount : subtotal,
                user_id : req.user,
                user_email : user.email
            });

            await order.save()

            res.json({"message" : "Products ordered successfully"})

            await Cartservices.deleteProduct(user_id, productId); 
        }
    }catch(err){
        console.log(err)
        res.status(401).json({message : "not ordered"})
    }

}


const getOrder = async(req, res) => {
    try{
        const user_id = req.user
        console.log(user_id)

        const orders = await Order.find({user_id : user_id});
        console.log(orders)
        const orderDetails = await Promise.all(
            orders.map(async (order) => {
                const products = await Promise.all(
                    order.Products.map(async (product) => {
                        const productDetails= await Product.findOne({id : product.product_id});
                        console.log(productDetails)
                        return {
                            product_title : productDetails.title,
                            product_description : productDetails.description,
                            product_price : product.price,
                            product_quantity : product.quantity,
                            Product_total : product.total
                        }
                    })
                );

                return {
                    order_id : order.id,
                    Products : products,
                    order_date : order.order_Date,
                    Est_Del_Date : order.Est_Del_Date,
                    order_status : order.Order_Status,
                }
                
            })
        );

        console.log(orderDetails)

        res.json(orderDetails)


    }catch(err){
        console.log("Error fetching orders",err)
        res.json({message : "failed to fetch orders"})
        
    }
}

module.exports = {postOrder, getOrder}