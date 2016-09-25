'use strict';

window.onload = () => {
  function refreshProducts() {
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
      const products = JSON.parse(e.target.responseText);
      const productList = document.getElementById("productList");
      productList.innerHTML = '';
      products.forEach((product) => {
        const liProduct = document.createElement("li");
        liProduct.innerText = product.name;
        productList.appendChild(liProduct);
      });
    };
    xhr.open("GET", '/products', true);
    xhr.send();
  }
  refreshProducts();

  productSubmit.onclick = function() {
    const product = {
      name: document.getElementById("productName").value,
      price: document.getElementById("productPrice").value,
      description: document.getElementById("productDescription").value
    };
    const xhr = new XMLHttpRequest();
    xhr.onload = refreshProducts;
    xhr.open('POST', '/products');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(product));

    // const product = document.createElement('li');
    // product.innerText = productName.value;
    // productList.appendChild(product);
  }
}
