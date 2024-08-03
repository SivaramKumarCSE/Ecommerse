const { Cart } = require('../models/cartModel');
const { Product } = require('../models/productModel')
const Cartservices = require('../services/cartservices')



const  postCart_items = async(req, res) => {
    
    try{
        const id = req.user;
        const { productId, quantity } = req.body;
        const user_id = await Cart.findOne({userId : id});
        if(!user_id){
            const newCart = new Cart({
                userId: id,
                "product" : [{
                    productId, 
                    quantity
                }]
            })

            await newCart.save()
            res.status(200).json({"message" : "cart added"})
        }
        else{
            const productIndex = await user_id.product.findIndex(product => product.productId === productId);

            if(productIndex === -1){

                user_id.product.push({productId, quantity});
                await user_id.save()
                res.status(200).json({"message" : "cart product added"})
            }
            else{
                
               user_id.product[productIndex].quantity = String(Number(user_id.product[productIndex].quantity)+Number(quantity))
                await user_id.save()
                res.status(200).json({"message" : "product updated"})
            }
        }
    }catch(err){
        res.status(401).json({error : "cart does not added"})
        console.error(err)
    }
}

const getCart_items = async(req, res) => {
    const resp = await Cartservices.getProducts(req.user);

    res.json(resp)
}


const deleteCart_items = async(req, res) => {

    const resp = await Cartservices.deleteProduct(req.user, req.body.productId)
    res.json({resp})
    
    await Cartservices.getProducts(req.user);

}

module.exports = {postCart_items, getCart_items, deleteCart_items};