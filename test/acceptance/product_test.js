require('../helper');

var http = require('http');
var db = require('../../config/db');
var Product = require('../../models/product');
var server;

before(function() {
  server = http.createServer(require('../../app'));
  server.listen(0);
  browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function(done) {
  browser.ignoreSynchronization = true;
  Product.forge().query().del().then(() => {
    done();
  });
});

afterEach(function() {})

after(function() {
  server.close();
});

describe('Given that a user is on the home page', function() {
  describe('When the user fills out the product form and clicks submit', function() {
    it('Then a new product should appear in the product list', function(done) {
      browser.get('/index.html');
      element(by.id('productName')).sendKeys('Plumbus');
      element(by.id('productPrice')).sendKeys('$20.00');
      element(by.id('productDescription')).sendKeys('A regular old Plumbus');
      element(by.id('productSubmit')).click();

      const elements = element.all(by.cssContainingText('#productList li', 'Plumbus'));

      function test() {
        elements.count().then(function(count) {
          if (count === 0) {
            setTimeout(test, 10);
          } else {
            // const start = new Date().getTime();
            // while (new Date().getTime() < start + 3000);
            expect(count).to.equal(1);
            done();
          }
        });
      }
      setTimeout(test, 10);
    });

  });
});
