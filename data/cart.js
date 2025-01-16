export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {

    let existingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            cartItem.quantity += 1;
            existingItem = true;
        }
    })

    if (!existingItem) {
        cart.push({
            productId : productId,
            quantity: 1,
            deliveryID : 1
        });
    }
}

export function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function deleteCartItem(index) {
    cart.splice(index, 1);
}

export function updateDeliveryOption(index, delivery) {
    cart[index].deliveryID = delivery;
    updateCartStorage();
}