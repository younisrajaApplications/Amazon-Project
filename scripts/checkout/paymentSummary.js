import { cart , getQuantity } from "../../data/cart.js";
import { getPrice } from "../utils/money.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryCost } from "../../data/deliveryOptions.js";

export default function createPaymentSummary() {
    const totalPrice = getTotalPrice();
    const shippingCost = getShippingCost();
    const beforeTax = totalPrice + shippingCost;
    const tax = beforeTax / 10
    const totalCost = beforeTax + tax;

    const numberOfItems = getQuantity();

    document.querySelector('.js-return-to-home-link').innerHTML = numberOfItems;

    const paymentHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
        <div>Items (${numberOfItems}):</div>
        <div class="payment-summary-money">$${getPrice(totalPrice)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${getPrice(shippingCost)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${getPrice(beforeTax)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${getPrice(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${getPrice(totalCost)}</div>
    </div>

    <button class="place-order-button button-primary">Place your order</button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
}

function getTotalPrice() {
    let totalPrice = 0;
    cart.forEach((cartItem) => {
        const productFound = getProduct(cartItem.productId);
        totalPrice += (productFound.priceCents * cartItem.quantity);
    })
    return totalPrice;
}

function getShippingCost() {
    let totalShipping = 0;
    cart.forEach((cartItem) => {
        totalShipping += getDeliveryCost(cartItem.deliveryID);
    });
    return totalShipping;
}