// export let  cart=[
//     {
//         productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 1
//     },{
//         productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
//         quantity: 2
//     },{

//         productId:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
//         quantity: 2
//     }
// ];

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
