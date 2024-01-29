export let cart = JSON.parse(localStorage.getItem('cart'));

if(cart === null) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: '1'
    }, 
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      deliveryOptionId: '1'
    }
  ];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, itemQuantity) {

  let matchingItem;
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId)
      matchingItem = cartItem;
  });

  if(matchingItem) {
    matchingItem.quantity += itemQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: itemQuantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId)
      newCart.push(cartItem);
  });
  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if(cartItem.productId === productId)
      matchingItem = cartItem;
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if(cartItem.productId === productId)
      matchingItem = cartItem;
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}