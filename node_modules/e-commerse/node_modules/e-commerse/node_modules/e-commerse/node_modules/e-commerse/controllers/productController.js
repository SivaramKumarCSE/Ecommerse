const { Product } = require('../models/productModel')
const { v4: uuidv4 } = require('uuid');

const getProducts = async(req, res) => {
   try{
    const products = await Product.find();
    res.send(products)
   }
   catch(error){
    console.error(error)
   }
};

const postProducts = async(req, res) => {
    try{
        const newProduct = new Product({
            id:uuidv4(),
            "title" : req.body.title,
            "description" : req.body.description,
            "category" : req.body.category,
            "price" : req.body.price,
            "image" : req.body.image,
            "rating" :{
                "rate" : req.body.rate,
                "count" : req.body.count
            }
    })
        newProduct.save()
        res.status(201).json({
            "status" : "success",
            "message" : "new product posted"
        })
        
    }catch(err){
        res.status(500).json({
            "status" : "failure",
            "message" : "product not posted",
            "error" : err
        })
        console.error(err)
    }

};

const deleteProducts = async(req, res) => {
    try{
        const id = req.params.id;
        console.log(id)
        const deleteproduct = await Product.findByIdAndDelete({_id : id});
        res.status(200).json({
            "status" : "success",
            "message" : "product deleted"
        })
        console.log(deleteproduct)
    }catch(err){
        res.status(500).json({
            "status" : "failure",
            "message" : "product not deleted"
        })
        console.log(err)

    }
}

const putProducts = async(req, res) => {
    try{
        const productData = await Product.findById({ _id :req.params.id})
        if(productData){
            console.log(req.body)
            await productData.updateOne(req.body)

            res.status(200).json({
                "status" : "success",
                "message" : "entry updated"
            })
        }
        else{
            res.status(404).json({
                "status" : "failure",
                "message" : "could not find entry"
            })
        }
    }catch(error){
        res.status(500).json({
            "status" : "failure",
            "message" : "could not update entry",
        })
        console.log(error)
    }
}



module.exports = {getProducts, postProducts, deleteProducts, putProducts}
