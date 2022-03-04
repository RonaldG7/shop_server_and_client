const express = require("express")
const app = express()
const cors = require('cors')
const mainRouter = require('./router/mainRouter')

app.use(cors())
app.use(express.json())
app.use("/", mainRouter)
app.listen(4000, () => console.log("The server is running on port 4000"))