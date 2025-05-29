export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function savetoLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const deleteCartItem = (productId) => {
    const newCart = [];
    cart.forEach((item) => {
        if (item.productId !== productId) {
            newCart.push(item);
        }
    });
    cart = newCart;
    savetoLocalStorage();
}
