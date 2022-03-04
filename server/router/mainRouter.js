const express = require('express')
const router = express.Router()
const {registerValidate, loginValidation, createItemValidation, buyItemValidation, changeItemPriceValidation,
    sellItemValidation, changeEmailValidation, changePasswordValidation} = require("../middleware/validator")
const {registerUser, loginUser, createItem, buyItem, changeItemPrice, sellItem, changeEmail, changePassword} = require("../controllers/mainController")

router.post("/register", registerValidate, registerUser)
router.post("/login",loginValidation, loginUser)
router.post("/create", createItemValidation, createItem)
router.post("/buy", buyItemValidation, buyItem)
router.post("/changePrice", changeItemPriceValidation, changeItemPrice)
router.post("/sell", sellItemValidation, sellItem)
router.post("/profileEmail", changeEmailValidation, changeEmail)
router.post("/profilePassword", changePasswordValidation, changePassword)

module.exports = router