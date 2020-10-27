const router = require("express").Router();
const { owner: ownerModel } = require("../models");

router.get("/owners", async (req, res) => {
  try {
    const owners = await ownerModel.find();
    res.json({
      status: true,
      owners,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

router.post("/owners", async (req, res) => {
  const { name, about, photo } = req.body;
  try {
    const owner = new ownerModel({
      name,
      about,
    });

    await owner.save();

    res.json({
      status: true,
      message: "Successfully saved",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
});

module.exports = router;
