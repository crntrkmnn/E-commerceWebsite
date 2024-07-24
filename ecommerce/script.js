const products = [
    { id: 1, name: 'Gold Necklace', price: 100, image: 'images/goldnecklace.png' },
    { id: 2, name: 'Silver Necklace', price: 150, image: 'images/silver.png' },
    { id: 3, name: 'Diamond Necklace', price: 200, image: 'images/diamondnecklace.png' },
    { id: 4, name: 'Pearl Necklace', price: 250, image: 'images/pearlnecklace.jpeg' },
    { id: 5, name: 'Ruby Necklace', price: 300, image: 'images/rubynecklace.jpeg' },
    { id: 6, name: 'Emerald Necklace', price: 350, image: 'images/emeraldnecklace.jpeg' },
];


const productList = document.querySelector('.product-list');
const cartItems = document.getElementById('cart-items');
const emptyCart = document.getElementById('empty-cart');
const itemCount = document.getElementById('item-count');
const totalPriceElem = document.getElementById('total-price');

let cart = {};

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (cart[productId]) {
        cart[productId].quantity += 1;
    } else {
        cart[productId] = { ...product, quantity: 1 };
    }
    renderCart();
}

function removeFromCart(productId) {
    if (cart[productId].quantity > 1) {
        cart[productId].quantity -= 1;
    } else {
        delete cart[productId];
    }
    renderCart();
}

function renderProducts() {
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product', 'col-md-4');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productList.appendChild(productElement);
    });
}


function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    Object.values(cart).forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
        removeButton.onclick = () => removeFromCart(item.id);
        cartItem.appendChild(removeButton);
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
        totalItems += item.quantity;
    });

    if (totalItems === 0) {
        emptyCart.style.display = 'block';
        itemCount.textContent = '0';
        totalPriceElem.textContent = '0.00';
    } else {
        emptyCart.style.display = 'none';
        itemCount.textContent = totalItems;
        totalPriceElem.textContent = total.toFixed(2);
    }
}

renderProducts();
renderCart();
