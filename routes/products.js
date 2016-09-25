var router = require('express').Router();
var db = require('../config/database');

router.get('/', function(req, res) {
  db.get('products').find({}, function(err, products) {
    if (err) throw err;

    res.json(products);
  });
});

router.post('/', function(req, res) {
  db.get('products').insert(req.body, function(err, product) {
    res.json(product);
  });
});

module.exports = router;
