const db = require("../DB/db")
const catchAsync = require("../middleware/catchAsync")
const ErrorResponse = require("../utils/ErrorResponse")

exports.getRestaurants = catchAsync(async (req, res) => {
  const results = await db.query("SELECT * FROM restaurants")

  if (results) {
    res.status(200).json({
      status: "success",
      results: results.rowCount,
      data: { restaurants: results.rows },
    })
  } else {
    return ErrorResponse("there are not restaurants", 400)
  }
})

exports.getSingleRestaurants = catchAsync(async (req, res) => {
  // paramerized query to avoid sql injection
  const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [
    req.params.id,
  ])

  if (results) {
    res.status(200).json({
      status: "success",
      data: { restaurants: results.rows },
    })
  } else {
    return ErrorResponse("there are not restaurants", 400)
  }
})

exports.createRestaurant = catchAsync(async (req, res) => {
  const { name, location, price_range } = req.body
  const restaurants = await db.query(
    "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
    [name, location, price_range]
  )

  if (restaurants) {
    res.status(201).json({
      status: "success",
      data: { restaurants: restaurants.rows[0] },
    })
  } else {
    return ErrorResponse("something went wrong", 404)
  }
})

exports.updateRestaurant = catchAsync(async (req, res) => {
  const { id } = req.params
  const { name, location, price_range } = req.body

  const result = await db.query(
    "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
    [name, location, price_range, id]
  )

  res.status(200).json({
    status: "success",
    data: { result: result.rows[0] },
  })
})

exports.deleteRestaurant = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await db.query("DELETE FROM restaurants WHERE id = $1", [id])

  if (result) {
    res.status(200).json({
      status: "success",
      data: {},
    })
  } else {
    return ErrorResponse("something went wrong", 404)
  }
})
