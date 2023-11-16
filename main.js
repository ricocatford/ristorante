import data from "./data/products.json" assert { type: "json" };

const shop = document.getElementById("shop");
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
    shop.appendChild(productArticle).append(
        productIngredients,
        productControls
    );
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
    const productControlsWrapper = document.createElement("div");
    const productButton = document.createElement("button");
    const productDecreaseQtyButton = document.createElement("button");
    const productIncreaseQtyButton = document.createElement("button");
    const productQtyInput = document.createElement("input");
    productButton.innerText = "Add to cart";
    productDecreaseQtyButton.innerText = "-";
    productQtyInput.type = "number";
    productQtyInput.disabled = true;
    productQtyInput.value = 1;
    productIncreaseQtyButton.innerText = "+";
    productDecreaseQtyButton.addEventListener("click", () =>
        updateProductQuantityInput("decrease", productQtyInput)
    );
    productIncreaseQtyButton.addEventListener("click", () =>
        updateProductQuantityInput("increase", productQtyInput)
    );
    productButton.addEventListener("click", () =>
        addProductToCart(product, parseInt(productQtyInput.value))
    );
    productControlsWrapper.append(
        productDecreaseQtyButton,
        productQtyInput,
        productIncreaseQtyButton,
        productButton
    );
    return productControlsWrapper;
}

function updateProductQuantityInput(action, quantityInput) {
    switch (action) {
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

function addProductToCart(product, quantity) {
    const existingProduct = searchProductInCart(product.name);
    if (existingProduct) {
        existingProduct.quantity += quantity;
        console.log(cart);
    } else {
        cart.push({
            name: product.name,
            quantity: quantity,
        });
        console.log(cart);
    }
}

function searchProductInCart(productName) {
    return cart.find((product) => product.name === productName);
}

displayProducts(data);
