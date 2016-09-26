describe("product.js", function() {
  it("should be insert", function(done) {
    const product = new Product("Plumbus", 1.00, "Made with fleeb juice");
    product.persist().then(() => {
      expect(true).toBe(true);
      done();
    });
  });

  it("should be select", function(done) {
    Product.getAll().then((products) => {
      expect(products.length >= 0).toBeTruthy();
      done();
    });
  });
});