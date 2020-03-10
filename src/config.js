require("dotenv").config();

const environment = {
  development: process.env.MONGO_URI,
  production: process.env.MONGODB_URI
};
module.exports = environment;
