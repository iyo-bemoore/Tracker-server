const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Profile = mongoose.model("Profile");
const router = express.Router();

router.use(requireAuth);

router.post("/profile", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(422)
      .send({ error: "You must enter a valid profile name" });
  }
  try {
    const profile = new Profile({
      name,
      userId: req.user._id
    });
    await profile.save();
    res.send(profile);
  } catch (e) {
    res.status(422).res.send({ error: e.message });
  }
});

router.post("/photo", async (req, res) => {
  const { uri } = req.body;
  try {
    await Profile.updateOne(
      { userId: req.user._id },
      { $set: { image_uri: uri } }
    );
    res.status(200).send("Image saved");
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/photo", async (req, res) => {
  const profile = await Profile.find({ userId: req.user._id });
  res.send(profile);
});

router.get("/profile", async (req, res) => {
  const profile = await Profile.find({ userId: req.user._id });
  res.send(profile);
});
module.exports = router;
