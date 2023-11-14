import data from "./data/products.json" assert { type: "json" };

const app = document.getElementById("app");
let cart = [];

function displayProducts(products) {
    products.forEach((product) => {
        var productItem = document.createElement("li");
        var productBtn = document.createElement("button");
        productItem.innerHTML = `${product.name}. Ingredients: ${product.ingredients}`;
        productBtn.innerHTML = "Add to cart";
        productBtn.id = product.id;

        productBtn.addEventListener("click", () => addProductToCart(product));
        app.appendChild(productItem).appendChild(productBtn);
    });
}

function addProductToCart(product) {
    const existingProduct = searchProductInCart(product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
        console.log(cart);
    } else {
        cart.push({
            name: product.name,
            quantity: 1,
        });
        console.log(cart);
    }
}

function searchProductInCart(productName) {
    return cart.find((product) => product.name === productName);
}

displayProducts(data);
