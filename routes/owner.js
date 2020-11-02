const router = require("express").Router();
const { owner: ownerModel } = require("../models");

const upload = require('../middlewares/upload_photo');

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

router.post("/owners",upload.single('photo'), async (req, res) => {
  const { name, about } = req.body;
  try {
    const owner = new ownerModel({
      name,
      about,
      photo: req.file.location,
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
