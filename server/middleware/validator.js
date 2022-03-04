const emailValidator = require("email-validator");
const {users, products} = require("../db/db")

module.exports = {
    registerValidate: (req, res, next) => {
        const {username, email, password, password2} = req.body

        const registeredUser = users.find(x => x.username === username)
        const emailInUse = users.find(x => x.email === email)

        if (registeredUser) return res.send({success: false, message: "Username is in use..."})
        if (emailInUse) return res.send({success: false, message: "Email is in use..."})
        if (!emailValidator.validate(email)) return res.send({success: false, message: "Check your email please..."})
        if (5 > password.length) return res.send({success: false, message: "Password too short"})
        if (20 < password.length) return res.send({success: false, message: "Password too long"})
        if (password !== password2) return res.send({success: false, message: "Passwords don't match"})
        next()
    },
    loginValidation: (req, res, next) => {
        const loginUser = req.body
        const findUser = users.find(x => x.username === loginUser.username && x.password === loginUser.password)
        if(!findUser) return res.send({success: false, message: "Login doesn't match email or password"})
        next()
    },
    createItemValidation: (req, res, next) => {
        const {secretKey, username, title, image, price} = req.body

        const findUser = users.find(x => x.secretKey === secretKey && x.username === username)
        if(!findUser) return res.send({success: false, message: "Not logged in"})
        if (image.length === 0) return res.send({success: false, message: "Missing image url"})
        if (title.length === 0) return res.send({success: false, message: "Missing title"})
        if (price.length === 0) return res.send({success: false, message: "Missing price"})
        next()
    },
    buyItemValidation: (req, res, next) => {
        const {id, secretKey} = req.body

        const findUser = users.find(x => x.secretKey === secretKey)
        const findItem = products.find(x => x.id === id)
        if(!findUser) return res.send({success: false, message: "Not logged in"})
        if (findUser.money <= findItem.price) return res.send({success: false, message: "Not enough money"})
        next()
    },
    changeItemPriceValidation: (req, res, next) => {
        const {newPrice, secretKey} = req.body

        const findUser = users.find(x => x.secretKey === secretKey)
        if(!findUser) return res.send({success: false, message: "Not logged in"})
        if (newPrice.length === 0) return res.send({success: false, message: "Missing price"})
        next()
    },
    sellItemValidation: (req, res, next) => {
        const {secretKey} = req.body

        const findUser = users.find(x => x.secretKey === secretKey)
        if(!findUser) return res.send({success: false, message: "Not logged in"})
        next()
    },
    changeEmailValidation: (req, res, next) => {
        const {secretKey, email, emailRepeat} = req.body

        const findUser = users.find(x => x.secretKey === secretKey)

        if(!findUser) return res.send({success: false, message: "Not logged in"})
        if (!emailValidator.validate(email)) return res.send({success: false, message: "Check email please"})
        if (email !== emailRepeat) return res.send({success: false, message: "Emails don't match"})
        next()
    },
    changePasswordValidation: (req, res, next) => {
        const {secretKey, oldPassword, password, passwordRepeat} = req.body

        const findUser = users.find(x => x.secretKey === secretKey)

        if (!findUser) return res.send({success: false, message: "Please login again"})
        if (findUser.password !== oldPassword) return res.send({success: false, message: "Old password is wrong"})
        if (5 > password.length) return res.send({success: false, message: "Password too short"})
        if (20 < password.length) return res.send({success: false, message: "Password too long"})
        if (findUser.password === password) return res.send({
            success: false,
            message: "New password is the same as old one"
        })
        if (password !== passwordRepeat) return res.send({success: false, message: "Passwords don't match"})
        next()
    }
}