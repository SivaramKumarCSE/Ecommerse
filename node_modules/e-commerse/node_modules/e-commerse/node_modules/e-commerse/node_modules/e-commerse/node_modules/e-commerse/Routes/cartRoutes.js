const express = require('express')
const router = express.Router() 
const cartController = require('../controllers/cartController') 
const auth = require('../middlewares/auth')

router.post("/addcart", auth,cartController.postCart_items)
router.get("/getcart", auth,cartController.getCart_items)
router.delete("/deletecart", auth,cartController.deleteCart_items)

module.exports = router;