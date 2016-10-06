var http = require('http');
var expect = require('chai').expect;
var assert = require('chai').assert;
var app = require('../../app');
var Categories = require('../../models/category');
var Products = require('../../models/product');

before(function() {
    var server = http.createServer(app);
    server.listen(0);
    browser.baseUrl = 'http://localhost:' + server.address().port;
    browser.ignoreSynchronization = true;
    var productID = 0;
});

after(function(done) {
    Products.forge({}).fetchAll().then(function(collection) {
        collection.forEach(function(model) {
            model.destroy();
        });
        done();
    });
    Categories.forge({}).fetchAll().then(function(collection) {
        collection.forEach(function(model) {
            model.destroy();
        });
        done();
    });
});

describe('Express CRUD', function() {

    describe('Category Functions', function() {
        it('Can I Submit A New Category', function() {
            browser.get('/');

            element(by.id('categoryName')).sendKeys('Monitors')
            element(by.id('createCategory')).click().then(function() {
                return new Promise(function(resolve, reject) {
                    Categories.where({
                        name: 'Monitors'
                    }).fetch().then(function(categoryInDB) {
                        categoryInDB.attributes.name != 'Monitors' ? reject() : resolve(categoryInDB.attributes.name);
                    });
                }).then((result) => {
                    expect(result).to.equal('Monitors');
                }).catch((error) => {
                    throw new Error(error.message)
                })
            });
        });

        it('Can I dynamically add a new Category checkbox to the DOM', function() {

            browser.get('/');
            element(by.id('categoryName')).sendKeys('Monitors')
            element(by.id('createCategory')).click().then(function() {
                return new Promise(function(resolve, reject) {
                    element.all(by.name('categories[]')).then(function(items) {
                        items.length == 1 ? resolve(items.length) : reject('Cant find checkboxes');
                    });
                }).then((result) => {
                    expect(result).to.equal(1);
                }).catch((error) => {
                    throw new Error(error.message)
                })
            });
        });
    });

    describe('Product Functions', function() {
        it('Can I Submit A New Product', function() {

            browser.get('/');

            element(by.id('productName')).sendKeys('Google Pixel')
            element(by.id('productPrice')).sendKeys('350')
            element(by.id('productDescription')).sendKeys('phone')
            element(by.id('createProduct')).click().then(function() {
                return new Promise(function(resolve, reject) {
                    Products.where({
                        name: 'Google Pixel',
                        price: '350.00',
                        description: 'phone'
                    }).fetch().then(function(productInDB) {
                        productInDB.attributes.name != 'Google Pixel' ? reject() : resolve(productInDB);
                    });
                }).then((result) => {
                    expect(result.attributes.name + result.attributes.price + result.attributes.description).to.equal('Google Pixel' + '350' + 'phone');
                }).catch((error) => {
                    throw new Error(error.message)
                })
            });
        });
    });
});
