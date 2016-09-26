class Product {

  constructor(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
  }

  persist() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = (e) => resolve(e.target.response);
      xhr.onerror = (e) => reject(e);
      xhr.open('POST', '/products');
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      xhr.send(JSON.stringify(this));
    });
  }
}

Product.getAll = function() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
      const products = JSON.parse(e.target.responseText);
      resolve(products);
    };
    xhr.onerror = (err) => reject(err);
    xhr.open("GET", '/products', true);
    xhr.send();
  });
};
