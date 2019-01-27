const express = require('express');
const router = express.Router();


router.get('/create/:restaurantId', (req, res) => {
    res.send('respond with a resource');
});

router.post('/create/:restaurantId', (req, res) => {

});



module.exports = router;