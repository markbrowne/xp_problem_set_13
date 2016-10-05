// in test/integration/books_test.js
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../app');
var Category = require('../../models/category');

describe('Categories', function() {
    beforeEach(function(done) {
        Category.forge({}).fetchAll().then(function(collection) {
            collection.forEach(function(model) {
                model.destroy();
            });
            done();
        });
    });

    after(function(done) {
        Category.forge({}).fetchAll().then(function(collection) {
            collection.forEach(function(model) {
                model.destroy();
            });
            done();
        });
    });

    describe('GET /categories', function() {
        it('returns a list of categories in the database', function(done) {
            var attrs = {
                name: 'Books'
            };

            new Category(attrs).save().then(function(model) {
                request(app).get('/categories')
                    .end(function(req, res) {
                        expect(res.body[0].name).to.equal('Books');
                        done();
                    });
            });
        });
    });

    describe('POST /categories', function() {
        it('inserts a new category into the database', function(done) {

            var attrs = {
                name: 'Books'
            };

            request(app).post('/categories')
                .send(attrs)
                .end(function(req, res) {
                    expect(res.body.name).to.equal('Books');
                    Category.forge({}).fetchAll().then(function(collection) {
                        expect(collection.length).to.equal(1);
                        expect(res.body.name).to.equal('Books');
                        done();
                    });
                });
        });
    });
});
