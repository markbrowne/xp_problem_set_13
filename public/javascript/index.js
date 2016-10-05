window.onload = () => {

    document.getElementById('createCategory').addEventListener("click", saveCategory);
    document.getElementById('createProduct').addEventListener("click", saveProduct);

    function saveCategory() {
        const req = new XMLHttpRequest();
        req.open('POST', '/categories');
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.responseType = 'json';
        req.addEventListener('load', (e) => {
            console.log(e)
            document.getElementById("category").innerHTML =
                e.target.response.name;
        });
        req.send(JSON.stringify(GetCategoryDataFromUi()));
    }

    function saveProduct() {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@ PRODUCT  @@@@@@@@@@@@@@@@@@@@')
    }


    function GetCategoryDataFromUi() {
        const catName = document.getElementById("categoryName").value;

        return {
            name: catName
        };
    }
}
