const mongoose = require("mongoose");
require('dotenv').config()
const DB = process.env.URI_LINK;
const connectToMongo = () => {
  mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log("Server up and running!")))
  .catch((error) => console.log(error.message))
};
module.exports = connectToMongo;
