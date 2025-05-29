import { cart, deleteCartItem } from "../data/cart.js";
import { products } from "../data/products.js";

const getDeliveryDate = (daysToAdd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

let html = '';
cart.forEach(cartItem => {
    const productId = cartItem.productId;
    let matchedItem = products.find(product => product.id === productId);

    html += `
      <div class="cart-item-container js-cart-item-container-${matchedItem.id}">
            <div class="delivery-date" id="delivery-date-${matchedItem.id}">
              Delivery date: ${getDeliveryDate(7)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchedItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchedItem.name}
                </div>
                <div class="product-price">
                    <span class="product-price-amount">
                        $${(matchedItem.price / 100).toFixed(2)}
                    </span>
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${matchedItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    data-delivery-date="${getDeliveryDate(7)}"
                    data-delivery-price="0"
                    name="${matchedItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${getDeliveryDate(7)}
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    data-delivery-date="${getDeliveryDate(3)}"
                    data-delivery-price="4.99"
                    name="${matchedItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${getDeliveryDate(3)}
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    data-delivery-date="${getDeliveryDate(1)}"
                    data-delivery-price="9.99"
                    name="${matchedItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${getDeliveryDate(1)}
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
});

document.querySelector('.order-summary').innerHTML = html;

// Add event listeners for delete links
document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        deleteCartItem(productId);
        const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        if (cartItemContainer) {
            cartItemContainer.remove();
        }
    });
});

// Move total price calculation into a function for reusability
const calculateTotalPrice = () => {
    let total = 0;
    let deliveryTotal = 0;

    cart.forEach(cartItem => {
        const productId = cartItem.productId;
        const matchedItem = products.find(product => product.id === productId);
        if (matchedItem) {
            total += (matchedItem.price / 100) * cartItem.quantity;
            
            // Get selected delivery option for this product
            const selectedDelivery = document.querySelector(`input[name="${productId}"]:checked`);
            if (selectedDelivery) {
                deliveryTotal += parseFloat(selectedDelivery.dataset.deliveryPrice);
            }
        }
    });

    return { itemsTotal: total, deliveryTotal, finalTotal: total + deliveryTotal };
};

const updatePriceSummary = () => {
    const { itemsTotal, deliveryTotal, finalTotal } = calculateTotalPrice();
    
    // Update shipping cost
    const deliveryMoneyElement = document.querySelector('.shipping-money');
    if (deliveryMoneyElement) {
        deliveryMoneyElement.textContent = `$${deliveryTotal.toFixed(2)}`;
    }
    const totalBeforeTax = document.querySelector('.shipping-money-2');
    if (totalBeforeTax) {
        totalBeforeTax.textContent = `$${finalTotal.toFixed(2)}`;
    }
    document.querySelector('.afterTax').textContent=`$${(finalTotal /10).toFixed(2)}`;
    document.querySelector('.final-cost').textContent = `$${(finalTotal + (finalTotal / 10)).toFixed(2)}`;
    // Update total price
    document.querySelector('.payment-summary-money').textContent = `$${finalTotal.toFixed(2)}`;
};

// Update the delivery options event listener
document.querySelectorAll('.delivery-option-input').forEach((input) => {
    input.addEventListener('change', () => {
        const deliveryDate = input.dataset.deliveryDate;
        const productId = input.name;
        
        // Update delivery date display
        const deliveryDateElement = document.getElementById(`delivery-date-${productId}`);
        if (deliveryDateElement) {
            deliveryDateElement.textContent = `Delivery date: ${deliveryDate}`;
        }

        // Update all price displays
        updatePriceSummary();
    });
});

// Initial price calculation
updatePriceSummary();

// Update cart quantity displays
document.querySelector('.cart-quantity').innerText = `${cart.length} items`;
document.querySelector('.cart-items-count').innerText = cart.length;