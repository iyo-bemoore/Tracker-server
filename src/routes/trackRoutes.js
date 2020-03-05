const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");
const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations, snapShot, distance, timeElapsed } = req.body;

  if (!name || !locations || !distance) {
    return res
      .status(422)
      .send({ error: "You must provide a name and locations" });
  }
  try {
    const track = new Track({
      name,
      locations,
      snapShot,
      distance,
      timeElapsed,
      userId: req.user._id
    });
    await track.save();
    res.send(track);
  } catch (e) {
    res.status(422).res.send({ error: e.message });
  }
});

module.exports = router;
