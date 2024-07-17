var express = require("express")
var router = express.Router()
const User = require("../models/user.model.js")
const mongoose = require("mongoose")

const isValidId = (value) => {
  return mongoose.Types.ObjectId.isValid(value)
}

/* GET users listing. */
router.get("/", async (req, res, next) => {
  let query = {}

  const { name } = req.query
  if (name && name.trim() !== "") {
    const regex = new RegExp(name, "i")
    query = { name: regex }
  }
  const resp = await User.find(query).exec()
  res.status(200).json(resp)
})

router.get("/last-queue", async (req, res, next) => {
  const findUser = await User.findOne({}).sort({ createdAt: -1 }).exec()

  res.status(200).json(findUser)
})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    const findUser = await User.findById(id)

    res.status(200).json(resp)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  const count = await User.countDocuments()
  const queueNumber = count + 1

  const resp = await User.create({
    ...req.body,
    queueNumber: "A" + queueNumber.toString().padStart(3, "0"),
  })

  res.status(201).json(resp)
})

router.put("/:id", async (req, res, next) => {
  const { id } = req.params

  await User.findByIdAndUpdate(id, {
    ...req.body,
  })

  const updatedProduct = await User.findById(id)

  res.status(201).json(updatedProduct)
})

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params

  await User.findByIdAndDelete(id, {
    ...req.body,
  })

  res.status(200).json({ message: "User deleted successfully" })
})

module.exports = router
