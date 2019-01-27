const mongoose = require('mongoose');


// Connection à Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/NoYelp");


module.exports = mongoose;