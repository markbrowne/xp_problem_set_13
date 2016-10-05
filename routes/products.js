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
    var product = new Product(req.body);
    product.save().then(function(productInDB) {
        res.json(productInDB);
    });
});

router.put('/:id', function(req, res) {
    Product.forge({
        id: req.params.id
    }).fetch().then(function(product) {
        product.save(req.body).then(function(productInDB) {
            res.json(productInDB);
        })
    });
})

router.delete('/:id', function(req, res) {
    Product.forge({
        id: req.params.id
    }).fetch().then(function(product) {
        product.destroy().then(function() {
            res.json('deleted');
        })
    });
})

module.exports = router;
