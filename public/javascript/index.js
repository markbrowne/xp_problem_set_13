window.onload = () => {

    document.getElementById('createCategory').addEventListener("click", saveCategory);
    document.getElementById('createProduct').addEventListener("click", saveProduct);
    loadCategories()

    function loadCategories() {
        const req = new XMLHttpRequest();
        req.open('GET', '/categories');
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.responseType = 'json';
        req.addEventListener('load', (e) => {
            for (var i = 0 ; i < e.target.response.length; i++ ){
              document.getElementById("category").innerHTML +=
                  '<label><input type="checkbox" name="categories[]" value=' +
                  e.target.response[i].name + '/> ' + e.target.response[i].name + '</label>'
            }
        });
        req.send(JSON.stringify(GetCategoryDataFromUi()));
    }


    function saveCategory() {
        const req = new XMLHttpRequest();
        req.open('POST', '/categories');
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.responseType = 'json';
        req.addEventListener('load', (e) => {
            console.log(e)
            document.getElementById("category").innerHTML +=
                '<label><input type="checkbox" name="categories[]" value=' +
                e.target.response.name + '/> ' + e.target.response.name + '</label>'
        });
        req.send(JSON.stringify(GetCategoryDataFromUi()));
        document.getElementById("categoryName").value = ''
    }

    function saveProduct() {
        const req = new XMLHttpRequest();
        req.open('POST', '/products');
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.responseType = 'json';
        req.addEventListener('load', (e) => {
            console.log(e)
        });
        req.send(JSON.stringify(GetProductDataFromUi()));
    }

    function GetCategoryDataFromUi() {
        const catName = document.getElementById("categoryName").value;
        return {
            name: catName
        };
    }

    function GetProductDataFromUi() {
        const productName = document.getElementById("productName").value;
        const productPrice = document.getElementById("productPrice").value;
        const productDescription = document.getElementById("productDescription").value;
        return {
            name: productName,
            price: productPrice,
            description: productDescription
        };
    }
}
