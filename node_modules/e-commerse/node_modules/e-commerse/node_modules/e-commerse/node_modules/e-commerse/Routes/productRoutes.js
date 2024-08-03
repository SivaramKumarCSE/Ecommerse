const express = require('express')
const router = express.Router()
const { getProducts, postProducts, deleteProducts, putProducts } = require('../controllers/productController')
const auth = require('../middlewares/auth')

router.get("/getproducts", getProducts)
router.post("/postproducts", postProducts)
router.delete("/deleteproducts", deleteProducts)
router.put("/putproducts/:id", putProducts)

module.exports = router;