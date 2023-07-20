const express = require("express");
const {getAllUsers,signup, login, getSingleUser} = require("../service/userService")
const router = express.Router();

router.route('/getAllUsers').get(getAllUsers)
router.route('/getSingleUser/:id').get(getSingleUser)
router.route('/signup').post(signup)
router.route('/login').post(login)
module.exports = router;