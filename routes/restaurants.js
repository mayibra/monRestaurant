const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Connection à Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/NoYelp");

let restaurantModel = require('../models/restaurant');

router.get('/', (req, res) => {
        res.redirect('/');
});

router.post('/search', (req, res) => {

    console.log("resultat",req.body.query);
    restaurantModel.find({name: new RegExp('^'+req.body.query+'$', "i")},(err, data) => {  
        if (err) return res.send(err);
        else
        {
            let search_results = data
            console.log("===============================================================")
            console.log(search_results)
            res.render('restaurants/search', { items: search_results });
        }
        
});
    
});

router.get('/create', (req, res) => {
    res.render('restaurants/create');
});


router.post('/create', (req, res) => {
    //FAIRE CREATION
         if(!err)
             res.redirect('/restaurants');
        else
           res.send(err);
});

router.get('/view/:id', (req, res) =>{
    //TODO
    // I added request params id 89+
        var item = req.params.id
        res.render('restaurants/view', { page: 'restaurant', restaurant : item , meals : [] /* TODO */ });

});

router.get('/edit/:id', (req, res) => {
    // TODO
     // I added request params id 89+
     var item = req.params.id
        res.render('restaurants/edit', { restaurant : item });
});


router.get('/delete/:id', (req, res) => {
     TODO
        if(!err)
             res.redirect('/restaurants');
         else
            res.send(err);
});

router.post('/edit/:id', (req, res) => {
   // TODO
         if(!err)
             res.redirect('/restaurants/view/' + req.params.id);
         else
            res.send(err);
});


module.exports = router;