import { cart , deleteCartItem , updateCartStorage , updateDeliveryOption } from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { getProduct, products } from '../../data/products.js';
import { getPrice } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import createPaymentSummary from './paymentSummary.js';

export function createOrderSummary() {
    let cartSectionHTML = '';

    cart.forEach((cartItem, index) => {
        const productFound = getProduct(cartItem.productId);

        let deliveryTime = 0;
        deliveryOptions.forEach((option) => {
            if (cartItem.deliveryID === option.id) {
                deliveryTime = option.days;
            } 
        })

        cartSectionHTML += 
        `<div class="cart-item-container">
            <div class="delivery-date">
                Delivery date: ${dayjs().add(deliveryTime, 'days').format('dddd, MMMM D')}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${productFound.image}">
                <div class="cart-item-details">
                    <div class="product-name">
                        ${productFound.name}
                    </div>
                    <div class="product-price">
                        $${getPrice(productFound.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-item">
                            Delete
                        </span>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${generateDeliveryHTML(index)}
                </div>
            </div>
        </div>`;
    });
    document.querySelector('.js-order-summary').innerHTML = cartSectionHTML;
    addDeleteListners();
    addDeliveryOptionsListeners()
}

function generateDeliveryHTML(productIndex) {
    let generatedHTML = '';
    const deliveryID = cart[productIndex].deliveryID;
    deliveryOptions.forEach((option, index) => {
        const deliveryChoice = deliveryID === index + 1 ? 'checked' : '';
        generatedHTML += 
        `<div class="delivery-option js-delivery-option" data-index="${productIndex}" data-delivery-id="${index + 1}">
            <input type="radio" ${deliveryChoice} class="delivery-option-input" data-option-id="${deliveryID}" name="delivery-option-${productIndex}">
            <div>
                <div class="delivery-option-date">
                    ${dayjs().add(option.days, 'days').format('dddd, MMMM D')}
                </div>
                <div class="delivery-option-price">
                    ${option.priceCents===0 ? 'FREE Shipping' : '$' + getPrice(option.priceCents) + ' - Shipping'}
                </div>
            </div>
        </div>`;
    })
    return generatedHTML;
}

function addDeleteListners() {
    document.querySelectorAll('.js-delete-item').forEach((deleteBtn, index) => {
        deleteBtn.addEventListener('click', () => {
            deleteCartItem(index);
            updateCartStorage();
            createOrderSummary();
            createPaymentSummary();
        })
    });
}

function addDeliveryOptionsListeners() {
    document.querySelectorAll('.js-delivery-option').forEach((option) => {
        option.addEventListener('click', () => {
            const productIndex = option.dataset.index;
            const deliveryID = Number(option.dataset.deliveryId);
            updateDeliveryOption(productIndex, deliveryID);
            createOrderSummary();
            createPaymentSummary();
        })
    });
}