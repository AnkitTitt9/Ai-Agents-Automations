const products = [
    {
        id: 1,
        name: "Spicy Masala Cashews",
        price: 250,
        category: "Flavoured Dry Fruits",
        image: "https://img.freepik.com/free-photo/top-view-cashew-nuts-bowl-with-copy-space_23-2148429323.jpg",
        hot: true,
        rating: 4.5,
        bundle: { quantity: 3, discount: 0.15 } // Bundle option: 3 items for 15% off
    },
    {
        id: 2,
        name: "Sweet Dried Mango",
        price: 300,
        category: "Dehydrated Fruits",
        image: "https://img.freepik.com/free-photo/dried-mango-fruit-background_1339-10993.jpg",
        hot: true,
        rating: 5,
        bundle: { quantity: 3, discount: 0.15 }
    },
    {
        id: 3,
        name: "Shahi Royal Mix",
        price: 150,
        category: "Mouth Fresheners",
        image: "https://img.freepik.com/premium-photo/traditional-indian-mouth-freshener-mukhwas-saunf-sweet-after-meal-digestive-chew_558828-2629.jpg",
        hot: true,
        rating: 4,
        bundle: { quantity: 3, discount: 0.15 }
    },
    {
        id: 4,
        name: "Golden Honey Almonds",
        price: 275,
        category: "Flavoured Dry Fruits",
        image: "https://img.freepik.com/free-photo/almonds-honey-wooden-bowl-white-background_114579-4399.jpg",
        rating: 4.5,
        bundle: { quantity: 3, discount: 0.15 }
    },
    {
        id: 5,
        name: "Tangy Dried Pineapple",
        price: 200,
        category: "Dehydrated Fruits",
        image: "https://img.freepik.com/free-photo/dried-pineapple-chips-background_136595-1644.jpg",
        rating: 4,
        bundle: { quantity: 3, discount: 0.15 }
    },
    {
        id: 6,
        name: "Classic Calcutta Paan",
        price: 175,
        category: "Mouth Fresheners",
        image: "https://img.freepik.com/premium-photo/calcutta-mitha-meetha-masala-paan-mouth-freshener-is-good-digestion-served-plate-selective-focus_466689-89699.jpg",
        rating: 5,
        bundle: { quantity: 3, discount: 0.15 }
    }
];

const cartItemsContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const purchaseBtn = document.getElementById("purchase-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function observeAnimatedElements() {
    // Observe sections for fade-in
    const animatedElements = document.querySelectorAll('.section, .product, .recipe-card, .promise-content');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Handle header scroll effect
    const header = document.querySelector('.site-header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Handle mobile menu
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-toggle');
    menuButton.setAttribute('aria-label', 'Toggle menu');
    menuButton.innerHTML = '<span></span><span></span><span></span>';

    const nav = document.querySelector('.main-nav');
    const utilities = document.querySelector('.utilities');

    if (nav && !document.querySelector('.menu-toggle')) {
        document.querySelector('.header-inner').insertBefore(menuButton, nav);
        
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            utilities.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }

    // Smooth image loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
}

function renderRating(rating) {
    let stars = '';
    let fullStars = Math.floor(rating);
    let halfStar = rating % 1 !== 0;
    for(let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for(let i = 0; i < 5 - Math.ceil(rating); i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return `<div class="rating">${stars}</div>`;
}

function renderProducts(grid, productList) {
    grid.innerHTML = "";
    productList.forEach(product => {
        const productEl = document.createElement("div");
        productEl.classList.add("product");
        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-content">
                <h3>${product.name}</h3>
                ${renderRating(product.rating)}
                <p>Rs ${product.price}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        grid.appendChild(productEl);
    });
}

function renderFeaturedProducts() {
    const featuredProductsGrid = document.querySelector("#featured-products .product-grid");
    if (featuredProductsGrid) {
        renderProducts(featuredProductsGrid, products.slice(0, 4));
        observeAnimatedElements();
    }
}

function renderShopProducts(category = 'all', searchTerm = '') {
    const shopProductGrid = document.getElementById("shop-product-grid");
    const recommendedGrid = document.getElementById("recommended-product-grid");
    const recommendedTitle = document.querySelector(".recommended-title");

    if (shopProductGrid) {
        let allProducts = products;
        if (searchTerm) {
            allProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        let filteredProducts = allProducts;
        let recommendedProducts = [];

        if (category !== 'all') {
            shopProductGrid.classList.remove('four-columns');
            filteredProducts = allProducts.filter(p => p.category === category);
            recommendedProducts = allProducts.filter(p => p.category !== category);
            recommendedTitle.style.display = 'block';
        } else {
            shopProductGrid.classList.add('four-columns');
            recommendedTitle.style.display = 'none';
        }

        renderProducts(shopProductGrid, filteredProducts);
        renderProducts(recommendedGrid, recommendedProducts);
        observeAnimatedElements();
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image, // Add product image to cart item
            isBundle: false // Default to not a bundle
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    showAddToCartPopup();
}

function showAddToCartPopup() {
    const popup = document.createElement('div');
    popup.classList.add('add-to-cart-popup');
    popup.innerHTML = `
        <p>Item added to cart!</p>
        <a href="cart.html" class="btn-view-cart">View Cart</a>
    `;
    document.body.appendChild(popup);

    // Automatically remove the popup after 2 seconds
    setTimeout(() => {
        popup.remove();
    }, 2000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function updateQuantity(productId, quantity) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = quantity;
    }
    cart = cart.filter(item => item.quantity > 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function toggleBundle(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && products.find(p => p.id === productId).bundle) {
        cartItem.isBundle = !cartItem.isBundle;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

function renderCart() {
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;

            let itemPrice = product.price;
            if (item.isBundle) {
                itemPrice *= (1 - product.bundle.discount);
            }

            const itemTotalPrice = item.quantity * itemPrice;
            subtotal += itemTotalPrice;

            const cartItemEl = document.createElement("div");
            cartItemEl.classList.add("cart-item");
            cartItemEl.innerHTML = `
                <img src="${product.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Price: Rs ${itemPrice.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                </div>
                <span>Rs ${itemTotalPrice.toFixed(2)}</span>
                <button class="remove-from-cart-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });

        const subtotalPriceEl = document.getElementById('subtotal-price');
        const discountPriceEl = document.getElementById('discount-price');
        const totalPriceEl = document.getElementById('total-price');

        const discount = parseFloat(localStorage.getItem('discount')) || 0;
        const discountAmount = subtotal * discount;
        const total = subtotal - discountAmount;

        if (subtotalPriceEl) subtotalPriceEl.textContent = `Rs ${subtotal.toFixed(2)}`;
        if (discountPriceEl) discountPriceEl.textContent = `- Rs ${discountAmount.toFixed(2)}`;
        if (totalPriceEl) totalPriceEl.textContent = `Rs ${total.toFixed(2)}`;
    }
}


document.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart-btn")) {
        addToCart(parseInt(e.target.dataset.id));
    }

    if (e.target.classList.contains("remove-from-cart-btn")) {
        removeFromCart(parseInt(e.target.dataset.id));
    }

    if (e.target.classList.contains("quantity-btn")) {
        const id = parseInt(e.target.dataset.id);
        const action = e.target.dataset.action;
        const item = cart.find(i => i.id === id);
        if (item) {
            if (action === 'increase') {
                item.quantity++;
            } else if (action === 'decrease') {
                item.quantity--;
            }
            updateQuantity(id, item.quantity);
        }
    }
});

if (cartItemsContainer) {
    cartItemsContainer.addEventListener("change", e => {
        if (e.target.tagName === "INPUT" && e.target.type === "number") {
            updateQuantity(parseInt(e.target.dataset.id), parseInt(e.target.value));
        } else if (e.target.type === "checkbox" && e.target.id.startsWith("bundle-")) {
            toggleBundle(parseInt(e.target.dataset.id));
        }
    });
}

const applyCouponBtn = document.getElementById('apply-coupon-btn');
if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', () => {
        const couponCodeInput = document.getElementById('coupon-code');
        if (couponCodeInput.value === 'MANWAAR15') {
            localStorage.setItem('discount', 0.15);
            renderCart();
            alert('Coupon applied successfully!');
        } else {
            alert('Invalid coupon code.');
        }
    });
}

if (purchaseBtn) {
    purchaseBtn.addEventListener("click", () => {
        if(cart.length > 0) {
            cart = [];
            localStorage.removeItem("cart");
            localStorage.removeItem("discount");
            renderCart();
            alert("Thank you for your purchase!");
        } else {
            alert("Your cart is empty!");
        }
    });
}

// Custom Cursor Animation
const customCursor = document.getElementById('custom-cursor');
const cursorTrail = document.createElement('div');
cursorTrail.id = 'cursor-trail';
document.body.appendChild(cursorTrail);

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    if (customCursor) {
        customCursor.style.transform = `translate(${mouseX - 15}px, ${mouseY - 15}px)`;
    }

    const dx = mouseX - trailX;
    const dy = mouseY - trailY;
    trailX += dx * 0.4;
    trailY += dy * 0.4;

    if (cursorTrail) {
        cursorTrail.style.transform = `translate(${trailX - 4}px, ${trailY - 4}px)`;
    }

    requestAnimationFrame(animateCursor);
}

requestAnimationFrame(animateCursor);

const interactiveElements = document.querySelectorAll('a, button');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (customCursor) {
            customCursor.classList.add('cursor-grow');
        }
    });
    el.addEventListener('mouseleave', () => {
        if (customCursor) {
            customCursor.classList.remove('cursor-grow');
        }
    });
});

// Smooth background movement effect
let mouseXBg = 0, mouseYBg = 0;
let bgX = 0, bgY = 0;

document.addEventListener('mousemove', (e) => {
    mouseXBg = e.clientX;
    mouseYBg = e.clientY;
});

function animateBackground() {
    const { innerWidth: width, innerHeight: height } = window;
    const xPos = (mouseXBg / width - 0.5) * 30;
    const yPos = (mouseYBg / height - 0.5) * 30;

    bgX += (xPos - bgX) * 0.05;
    bgY += (yPos - bgY) * 0.05;

    document.body.style.backgroundPosition = `${bgX}px ${bgY}px`;

    requestAnimationFrame(animateBackground);
}

requestAnimationFrame(animateBackground);

// Ripple effect
const rippleBackground = document.getElementById('ripple-background');

document.addEventListener('mousemove', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    rippleBackground.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
});


// Header scroll effect
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Search bar toggle and search
const searchIcon = document.getElementById("search-icon");
const searchBar = document.getElementById("search-bar");
const searchInput = searchBar.querySelector('input');
const searchButton = searchBar.querySelector('button');

if(searchIcon) {
    searchIcon.addEventListener("click", (e) => {
        e.preventDefault();
        if (searchBar.style.display === "block") {
            searchBar.style.display = "none";
        } else {
            searchBar.style.display = "block";
        }
    });
}

if(searchButton) {
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        window.location.href = `shop.html?search=${searchTerm}`;
    });
}

// Newsletter forms
const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for subscribing!");
        e.target.reset();
    });
}

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Profile page form toggle
const loginToggleBtn = document.getElementById('login-toggle');
const signupToggleBtn = document.getElementById('signup-toggle');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

if (loginToggleBtn && signupToggleBtn && loginForm && signupForm) {
    loginToggleBtn.addEventListener('click', () => {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        loginToggleBtn.classList.add('active');
        signupToggleBtn.classList.remove('active');
    });

    signupToggleBtn.addEventListener('click', () => {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        signupToggleBtn.classList.add('active');
        loginToggleBtn.classList.remove('active');
    });

    // Initialize form visibility based on which button is active by default
    if (loginToggleBtn.classList.contains('active')) {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    } else {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    }
}