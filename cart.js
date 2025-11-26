// Cart management functions
const getCart = () => {
    const cart = localStorage.getItem('shopEaseCart');
    return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart) => {
    localStorage.setItem('shopEaseCart', JSON.stringify(cart));
};

// Update cart count in header
const updateCartCount = () => {
    const cart = getCart();
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
};

// Display cart items
const displayCartItems = () => {
    const cart = getCart();
    const cartItemsList = document.getElementById('cart-items-list');
    const cartSummary = document.getElementById('cart-summary');
    const emptyCart = document.getElementById('empty-cart');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsList.style.display = 'none';
        cartSummary.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    emptyCart.style.display = 'none';
    cartItemsList.style.display = 'block';
    cartSummary.style.display = 'block';

    cartItemsList.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Price: $${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <p>Total: $${itemTotal.toFixed(2)}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsList.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
};

// Update item quantity
const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        saveCart(cart);
        updateCartCount();
        displayCartItems();
    }
};

// Remove item from cart
const removeFromCart = (productId) => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
    updateCartCount();
    displayCartItems();
};

// Navigation toggle for mobile
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Checkout functionality
const handleCheckout = () => {
    const checkoutBtn = document.getElementById('checkout-btn');

    checkoutBtn.addEventListener('click', () => {
        const cart = getCart();
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Thank you for your purchase! Your order has been placed.');
            saveCart([]);
            updateCartCount();
            displayCartItems();
        }
    });
};

// Continue shopping button
const handleContinueShopping = () => {
    const continueBtn = document.getElementById('continue-shopping-btn');

    continueBtn.addEventListener('click', () => {
        window.location.href = 'index.html#products';
    });
};

// Initialize cart page
const init = () => {
    navSlide();
    updateCartCount();
    displayCartItems();
    handleCheckout();
    handleContinueShopping();
};

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
