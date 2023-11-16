import data from "./data/products.json" assert { type: "json" };

const app = document.getElementById("app");
let cart = [];

function displayProducts(products) {
    products.forEach((product) => {
        const productCard = getProductCard(product);
    });
}

function getProductCard(product) {
    const productArticle = document.createElement("article");
    const productIngredients = listProductIngredients(product.ingredients);
    const productControls = getProductCardControls(product);
    productArticle.innerHTML = `
        <h2>${product.name}</h2>
        <p>Ingredients:</p>
    `;
    app.appendChild(productArticle).appendChild(productIngredients);
    app.appendChild(productControls);
}

function listProductIngredients(productIngredients) {
    const productIngredientsList = document.createElement("ul");
    productIngredients.forEach((ingredient) => {
        const productIngredientListItem = document.createElement("li");
        productIngredientListItem.innerText = `${ingredient}`;
        productIngredientsList.appendChild(productIngredientListItem);
    });
    return productIngredientsList;
}

function getProductCardControls(product) {
    const productButton = document.createElement("button");
    productButton.innerText = "Add to cart";
    productButton.addEventListener("click", () => addProductToCart(product));
    return productButton;
}

function addProductToCart(product, quantity) {
    const existingProduct = searchProductInCart(product.name);
    if (existingProduct) {
        existingProduct.quantity++;
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

const decreaseProductQuantityButton =
    document.getElementById("decrease-quantity");

decreaseProductQuantityButton.addEventListener("click", () =>
    updateProductQuantityInput("decrease")
);

const increaseProductQuantityButton =
    document.getElementById("increase-quantity");

increaseProductQuantityButton.addEventListener("click", () =>
    updateProductQuantityInput("increase")
);

const quantityInput = document.querySelector("input[name='product-quantity']");

function updateProductQuantityInput(expression) {
    switch (expression) {
        case "decrease":
            if (quantityInput.value > 1) quantityInput.value--;
            break;
        case "increase":
            if (quantityInput.value < 9) quantityInput.value++;
            break;
        default:
            console.log("Error has occured, please try again.");
    }
}

displayProducts(data);
