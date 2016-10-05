// in test/integration/books_test.js
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../app');
var Product = require('../../models/product');

describe('Products', function() {
    beforeEach(function(done) {
        Product.forge({}).fetchAll().then(function(collection) {
            collection.forEach(function(model) {
                model.destroy();
            });
            done();
        });
    });

    after(function(done) {
        Product.forge({}).fetchAll().then(function(collection) {
            collection.forEach(function(model) {
                model.destroy();
            });
            done();
        });
    });

    describe('GET /products', function() {
        it('returns a list of products in the database', function(done) {
            var attrs = {
                name: 'Plumbus',
                price: 1.00,
                description: 'A regular old Plumbus'
            };

            new Product(attrs).save().then(function(model) {
                request(app).get('/products')
                    .end(function(req, res) {
                        expect(res.body[0].name).to.equal('Plumbus');
                        expect(res.body[0].price).to.equal(1.00);
                        expect(res.body[0].description).to.equal('A regular old Plumbus');
                        done();
                    });
            });
        });
    });

    describe('POST /products', function() {
        it('inserts a new product into the database', function(done) {

            var attrs = {
                name: 'Plumbus',
                price: 1.00,
                description: 'A regular old Plumbus'
            };

            request(app).post('/products')
                .send(attrs)
                .end(function(req, res) {
                    expect(res.body.name).to.equal('Plumbus');
                    Product.forge({}).fetchAll().then(function(collection) {
                        expect(collection.length).to.equal(1);
                        done();
                    });
                });
        });
    });

    describe('PUT /products', function() {
        it('updates a product in the database', function(done) {

            var attrs1 = {
                name: 'Miele',
                price: 350.00,
                description: 'A washing machine'
            };

            var attrs2 = {
                name: 'Bendix',
                price: 250.00,
                description: 'Another washing machine'
            };

            var temp
            var product = new Product(attrs1);
            product.save().then(function(productInDB) {
                return productInDB.id;
            }).then(function(result) {
                request(app).put('/products/' + result)
                    .send(attrs2)
                    .end(function(req, res) {
                        expect(res.body.name).to.equal('Bendix');
                        Product.forge({}).fetchAll().then(function(collection) {
                            expect(collection.length).to.equal(1);
                            done();
                        });
                    });
            })
        });
    });

    describe('DELETE /products', function() {
        it('DELETE a product from the database', function(done) {

            var attrs1 = {
                name: 'Miele',
                price: 350.00,
                description: 'A washing machine'
            };

            var product = new Product(attrs1);
            product.save().then(function(productInDB) {
                return productInDB.id;
            }).then(function(result) {
                request(app).delete('/products/' + result)
                    .send()
                    .end(function(req, res) {
                        expect(res.body).to.equal('deleted');
                        Product.forge({}).fetchAll().then(function(collection) {
                            expect(collection.length).to.equal(0)
                            done()
                        });
                    });
            });
        });
    });

});
