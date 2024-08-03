const express = require('express')
const router = express.Router()
const { register_User, login_User } = require('../controllers/userController')


router.post("/registeruser", register_User);
router.post("/loginuser", login_User)


module.exports = router;