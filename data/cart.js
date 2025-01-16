export const cart = [];

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
            quantity: 1
        });
    }
}