// in test/integration/books_test.js
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../app');
var Product = require('../../models/product');

describe('Products', function () {
  beforeEach(function (done) {
    Product.forge({}).fetchAll().then(function (collection) {
      collection.forEach(function (model) {
        model.destroy();
      });
      done();
    });
  });

  after(function (done) {
    Product.forge({}).fetchAll().then(function (collection) {
      collection.forEach(function (model) {
        model.destroy();
      });
      done();
    });
  });

  describe('GET /products', function () {
    it('returns a list of products in the database', function (done) {
      var attrs = {
        name: 'Plumbus',
        price: 1.00,
        description: 'A regular old Plumbus'
      };

      new Product(attrs).save().then(function(model) {
        request(app).get('/products')
          .end(function (req, res) {
            expect(res.body[0].name).to.equal('Plumbus');
            expect(res.body[0].price).to.equal(1.00);
            expect(res.body[0].description).to.equal('A regular old Plumbus');
            done();
          });
      });
    });
  });
});