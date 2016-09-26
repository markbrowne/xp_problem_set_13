var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/', function(req, res) {
  Product.forge({}).fetchAll().then(function(collection) {
    res.json(collection.toJSON())
  });
});

router.post('/', function(req, res) {
  var book = new Product(req.body);
  book.save().then(function(bookInDB) {
    res.json(bookInDB);
  });
});

module.exports = router;
