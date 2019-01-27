const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Connection à Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/NoYelp");
const db = mongoose.connection;
//Vérification
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let restaurantModel = require('../models/restaurant');



/* GET home page. */
router.get('/', (req, res, next) => {
      //TODO
      restaurantModel.find({}, (err, items) => {  
            if (err)
            return res.send(err);
            res.render('index', { title: 'Mon Restaurant', restaurants: items });
  });
});

router.get('/create', function (req, res, next) {
  res.render('create');
 });

 router.get('/delete/:id', function (req, res, next) {
  mongoose.model('Restaurant').findByIdAndRemove(req.params.id, function (err, item) {
    if (!err)
      return res.redirect('/');

    res.send(err);
  });
});



    

    
    
    

module.exports = router;
