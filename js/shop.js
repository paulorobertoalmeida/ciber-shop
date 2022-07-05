// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

const cartClean = document.querySelector('cart_list');

// Exercise 1
const buy = (id) => {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    let product = products.find(product => id == product.id);
    cartList.push(product);
    console.log(cartList);
}

// Exercise 2
const cleanCart = () => {
    cartList.length = 0;
}

// Exercise 3
const calculateTotal = () => {
    let total = 0;
    for (let product of cartList) {
        total += product.price;
    }
    return total;
    // Calculate total price of the cart using the "cartList" array
}

// Exercise 4 ******
const generateCart = () => {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    for (let product of cartList) {
        let foundIndex,
            found = cart.find((item, index) => {
                foundIndex = index;
                return item.id == product.id;
            });

        if (found) {
            cart[foundIndex].quantity++;
        } else {
            cart.push(product);
            cart[cart.length - 1].quantity = 1;
        }
    }
    return cart;
}

// Exercise 5
const applyPromotionsCart = () => {
    // Apply promotions to each item in the array "cart"
    cart.forEach(product => {
        if (product.id == 1 && product.quantity >= 3) {
            product.promotion = 10;
        } else if (product.id == 1 && product.quantity < 3) {
            if (product.hasOwnProperty("promotion")) {
                delete product.promotion;
            }
        }
        if (product.id == 3 && product.quantity >= 10) {
            product.promotion = Number(((2 / 3) * product.price).toFixed(2));
        } else if (product.id == 3 && product.quantity < 10) {
            if (product.hasOwnProperty("promotion")) {
                delete product.promotion;
            }
        }
    });
}

// Exercise 6
const printCart = () => {

    let cartEl = document.querySelector("#cartModal .modal-body .list");
    document.querySelector(".check-out-button").classList.add("d-none");

    cartEl.innerHTML = "";
    // Fill the shopping cart modal manipulating the shopping cart dom
    if (cart.length) {

        cartEl.innerHTML = `<h2 class="text-center mb-4">Lista de la compra</h2>`;

        document.getElementById("empty-cart-title").classList.add("d-none");
        document.querySelector(".check-out-button").classList.remove("d-none");

        let checkoutTotal = 0;
        for (item of cart) {

            cartEl.innerHTML += `
			<li class="item-id-${item.id} fw-light list-group-item d-flex justify-content-between align-items-center">
			<span class="flex-grow-1">
				<span class=" badge bg-dark me-2">${item.quantity}</span> ${item.name}
			</span>  ${((item.promotion ?? item.price) * item.quantity).toFixed(2)} €
			<span class=" remove-cart badge bg-danger  ms-3" onclick="removeFromCart(${item.id})" role="button">-</span>
			</li>
			`;
            checkoutTotal += (item.promotion ?? item.price) * item.quantity;
        }
        cartEl.innerHTML += `
		<li class="text-center pb-4 h3 mt-4 mb-3 list-group-item d-flex justify-content-between align-items-center">
		<span>Total</span>
		<span>${Number(checkoutTotal).toFixed(2)} €</span>
		</li>
		`;
    }

}


// ** Nivell II **

// Exercise 7

const addToCart = (id) => {
    // Refactor previous code in order to simplify it
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    const clickCounter = document.getElementById("count_product")
    clickCounter.innerHTML++

    for (let product of products) {
        let found = cart.find(item => item.id == id);
        if (id == product.id && !found) {
            cart.push(product);
            cart[cart.length - 1].quantity = 1;
        } else if (id == product.id && id == found.id) {
            let itemToSum = cart.findIndex(e => e.id == id);
            cart[itemToSum].quantity++;
        }
    }

}


// Exercise 8
const removeFromCart = (id) => {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    let found = cart.find(item => item.id == id);
    let itemToMin = cart.findIndex(element => element.id == id);

    if (!found) {
        return;
    } else if (found && found.quantity > 1) {
        cart[itemToMin].quantity--;
    } else {
        cart.splice(itemToMin, 1);
    }

    if (cart.length == 0) {
        document.getElementById("empty-cart-title").classList.remove("d-none");
    }
    applyPromotionsCart();
    printCart(); 
}

const open_modal = () => printCart();

//console.log("Open Modal")
console.log(buy());
console.log(cartList);
console.log(removeFromCart());
printCart();
applyPromotionsCart();
