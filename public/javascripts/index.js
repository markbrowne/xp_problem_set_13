'use strict';

window.onload = () => {
  function refreshProducts() {
    Product.getAll().then((products) => {
      const productList = document.getElementById("productList");
      productList.innerHTML = '';
      products.forEach((product) => {
        const liProduct = document.createElement("li");
        liProduct.innerText = product.name;
        productList.appendChild(liProduct);
      });
    })
  }
  refreshProducts();

  productSubmit.onclick = function() {
    const product = new Product(
      document.getElementById("productName").value,
      document.getElementById("productPrice").value,
      document.getElementById("productDescription").value
    );
    product.persist().then(refreshProducts);
  }
};
