const express = require('express')
const router = express.Router() 
const orderController = require('../controllers/orderController')
const auth = require('../middlewares/auth')

router.post("/postorder", auth, orderController.postOrder)
router.get("/getorder", auth,orderController.getOrder)

module.exports = router;