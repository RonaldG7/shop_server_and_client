const {v4: uuid} = require("uuid")
const {users, products} = require("../db/db")

module.exports = {
    registerUser: (req, res) => {
        const {username, email, password} = req.body
        users.push({
            secretKey: uuid(),
            username,
            email,
            password,
            money: 1000,
            boughtItems: []
        })
        res.send({success: true, message: "Successfully registered"})
    },
    loginUser: (req, res) => {
        const loginUser = req.body

        const findUser = users.find(x => x.username === loginUser.username && x.password === loginUser.password)
        res.send({success: true, message: "Login successful", findUser, products})
    },
    createItem: (req, res) => {
        const {username, title, image, price} = req.body
        const item = {
            id: uuid(),
            username,
            title,
            image,
            price: Number(price)
        }
        products.push(item)
        res.send({success: true, message: "Item listed for sale successfully", products})
    },
    buyItem: (req, res) => {
        const {id, secretKey} = req.body

        const findUser = users.find(x => x.secretKey === secretKey)
        const findItem = products.find(x => x.id === id)

        findUser.money -= findItem.price
        findUser.boughtItems.push(findItem)
        const findSeller = users.find(x => x.username === findItem.username)
        findSeller.money += findItem.price
        products.splice(products.indexOf(findItem), 1)
        res.send({success: true, message: "Bought successfully", products, findUser})
    },
    changeItemPrice: (req, res) => {
        const {newPrice, id, secretKey} = req.body

        const findUser = users.find(x => x.secretKey === secretKey)
        const findItem = findUser.boughtItems.find(x => x.id === id)

        findItem.price = Number(newPrice)
        res.send({success: true, message: "Price changed successfully", findUser})
    },
    sellItem: (req, res) => {
        const {id, secretKey} = req.body

        const findUser = users.find(x => x.secretKey === secretKey)
        const findItem = findUser.boughtItems.find(x => x.id === id)
        findItem.username = findUser.username
        products.push(findItem)
        findUser.boughtItems.splice(findUser.boughtItems.indexOf(findItem), 1)
        res.send({success: true, message: "Successfully placed for sale", findUser, products})
    },
    changeEmail: (req, res) => {
        const {secretKey, email} = req.body

        const findUser = users.find(x => x.secretKey === secretKey)

        findUser.email = email
        res.send({success: true, message: "Email changed successfully", findUser})
    },
    changePassword: (req, res) => {
        const {secretKey, password} = req.body

        const findUser = users.find(x => x.secretKey === secretKey)

        findUser.password = password
        res.send({success: true, message: "Passwords changed successfully", findUser})
    }
}