var express = require('express');
var router = express.Router();
var getCoffeeData = require('./coffeeData');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// New route for displaying coffee API data
router.get('/coffee-data', getCoffeeData);

module.exports = router;
