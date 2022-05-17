require("dotenv").config()
const express = require("express")
const restaurantsRoutes = require("./routes/restaurants")

const app = express()

app.use(express.json())

app.use("/api/v1/restaurants", restaurantsRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`server is listing on port ${PORT}`)
})
