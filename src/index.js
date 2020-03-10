require("./models/User");
require("./models/Track");
require("./models/Profile");
const environment = require("./config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const profileRoutes = require("./routes/profileRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
app.use(profileRoutes);
const mongoURI = environment[NODE_ENV];
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Conntected to Mongo instance");
});
mongoose.connection.on("error", e => {
  console.error("Error connecting to Mongo ", e);
});
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});
app.listen(PORT, () => {
  console.log(`Listening on  ${PORT}`);
});
