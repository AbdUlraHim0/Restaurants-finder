const express = require("express")
const { getRestaurants } = require("../controller/restaurants")

const router = express.Router()

router.get("/restaurants", getRestaurants)

module.exports = router
