import { cart ,deleteCartItem} from "../data/cart.js";
import { products } from "../data/products.js";


let html = '';
cart.forEach(cartItem => {
    const productId = cartItem.productId;

    let matchedItem= products.find(product => product.id === productId);
    console.log(cartItem);

    html += `
      <div class="cart-item-container js-cart-item-container-${matchedItem.id}">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
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
                  <input type="radio" class="delivery-option-input"
                    name="delevery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delevery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delevery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
    `

})
document.querySelector('.order-summary').innerHTML = html;
// Add event listeners for delete links
document.querySelectorAll('.delete-quantity-link')
.forEach((link) => {
    link.addEventListener('click', (event) => {
        const productId = link.dataset.productId;
        deleteCartItem(productId);
        // console.log(cart)
        // Remove the cart item from the DOM
        const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        if (cartItemContainer) {
            cartItemContainer.remove();
        }



    });
});

