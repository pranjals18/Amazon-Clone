import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  let totalQuantity = calculateCartQuantity();
  let quantityString;
  if(totalQuantity > 0)
    quantityString = `${totalQuantity} items`;
  else
    quantityString = '';

    document.querySelector('.js-return-to-home-link').innerHTML = quantityString;
}