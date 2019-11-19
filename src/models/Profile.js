const mongoose = require("mongoose");

const profileShema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    default: ""
  },
  image_uri: {
    type: String,
    default: ""
  }
});

mongoose.model("Profile", profileShema);
