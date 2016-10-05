var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.get('/', function(req, res) {
    // TODO: Get products
    Product.forge({}).fetchAll().then(function(collection) {
        res.json(collection.toJSON())
    });
});

router.post('/', function(req, res) {
    // TODO: Create products
});

module.exports = router;
