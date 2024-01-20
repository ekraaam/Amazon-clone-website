import {cart, removeFromCart,updateDeliveryOption} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions, getdeliveryOption} from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { rendorPaymentSummary } from './paymentSummary.js';


export function rendorCheckoutHtml(){
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct = getProduct(productId);

    const deliveryOption=getdeliveryOption(cartItem.deliveryOptionId);
    const today = dayjs();
    const deliveryDate=today.add(`${deliveryOption.deliveryDays}`, 'days');
    const stringDate=deliveryDate.format('dddd, MMMM D');



    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${stringDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHtml(matchingProduct,cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHtml(matchingProduct,cartItem){
    let deliveryHtml='';
    deliveryOptions.forEach((deliveryOption)=>{
      const today = dayjs();
      const deliveryDate=today.add(`${deliveryOption.deliveryDays}`, 'days');
      const stringDate=deliveryDate.format('dddd, MMMM D');

      const priceCents =deliveryOption.priceCents===0 ? 'FREE -' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked=deliveryOption.id ===cartItem.deliveryOptionId;
      deliveryHtml+=
      `
      <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked': ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${stringDate}
            </div>
            <div class="delivery-option-price">
              ${priceCents} - Shipping
            </div>
          </div>
      </div>
    `
    });
    return deliveryHtml;   
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
        rendorPaymentSummary();
      });
    });

  document.querySelectorAll('.js-delivery-option')
      .forEach((element)=>{
      element.addEventListener('click', ()=>{
        const {productId,deliveryOptionId} =element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        rendorCheckoutHtml();
        rendorPaymentSummary();
      })
  });
};