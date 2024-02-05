import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";

import { products } from "../data/products.js"

import { formatCents } from "./utils/money.js"

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCents(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart item-${product.id}">
        <img src="images/icons/checkmark.png">
        Added to Cart
      </div>

      <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

updateCartQuantity();

function updateCartQuantity() {
  let totalQuantity = calculateCartQuantity();
  if(totalQuantity > 0)
    document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
  else
    document.querySelector('.js-cart-quantity').innerHTML = '';
}

const addedMessageTimeouts = {};

function showAddedMessage(productId) {
  document.querySelector(`.item-${productId}`).classList.add('added-to-cart-visible');
  setTimeout(() => {
    const previousTimeoutId = addedMessageTimeouts[productId];

    if(previousTimeoutId)
      clearTimeout(previousTimeoutId);

    const timeoutId = setTimeout(() => {
      document.querySelector(`.item-${productId}`).classList.remove('added-to-cart-visible');
    }, 1000)

    addedMessageTimeouts[productId] = timeoutId;
  });
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {

    const productId = button.dataset.productId;

    let itemQuantity = document.querySelector(`.js-quantity-selector-${productId}`).value;

    itemQuantity = Number(itemQuantity);

    addToCart(productId, itemQuantity);
    updateCartQuantity();
    showAddedMessage(productId);
    
  });
});