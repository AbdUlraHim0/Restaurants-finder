const express = require("express")
const {
  getRestaurants,
  getSingleRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controller/restaurants")

const router = express.Router()

router.route("/").get(getRestaurants).post(createRestaurant)

router
  .route("/:id")
  .get(getSingleRestaurants)
  .put(updateRestaurant)
  .delete(deleteRestaurant)

module.exports = router
