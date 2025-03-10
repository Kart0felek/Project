document.querySelectorAll('select').forEach(select => {
    select.addEventListener('mouseover', () => {
        select.size = select.options.length;
    });
    select.addEventListener('mouseout', () => {
        select.size = 1;
    });
});

document.getElementById("play-game").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("game-popup").style.display = "flex";
});

document.querySelector(".close-btn").addEventListener("click", function() {
    document.getElementById("game-popup").style.display = "none";
    document.getElementById("game-frame").contentWindow.location.reload();
});

document.getElementById("closeGame").addEventListener("click", function() {
    document.getElementById("game-popup").style.display = "none";
    document.getElementById("game-frame").contentWindow.location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
    let cart = [];
    let diamondFishCaught = false;

    function updateCart() {
        const cartItems = document.getElementById("cart-items");
        const cartCount = document.getElementById("cart-count");
        const totalPrice = document.getElementById("total-price");
        const discountInfo = document.getElementById("discount-info");

        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            let li = document.createElement("li");
            if (diamondFishCaught) {
                const discountedPrice = item.price * 0.9;
                li.innerHTML = `${item.name} - <del>${item.price.toFixed(2)} zł</del> ${discountedPrice.toFixed(2)} zł x ${item.quantity} <button onclick="removeFromCart(${index})">Usuń</button>`;
            } else {
                li.innerHTML = `${item.name} - ${item.price.toFixed(2)} zł x ${item.quantity} <button onclick="removeFromCart(${index})">Usuń</button>`;
            }
            cartItems.appendChild(li);
        });

        cartCount.innerText = cart.length;
        if (diamondFishCaught) {
            const discountedTotal = total * 0.9;
            totalPrice.innerHTML = `<del>${total.toFixed(2)} zł</del> ${discountedTotal.toFixed(2)} zł`;
            discountInfo.innerText = "Znaleziono diamentową rybę! - 10% rabatu!";
        } else {
            totalPrice.innerText = total === 0 ? "0.00" : `${total.toFixed(2)} zł`;
            discountInfo.innerText = "";
        }
    }

    function updateProductPrices() {
        document.querySelectorAll(".product").forEach(product => {
            const priceElement = product.querySelector(".price");
            const originalPrice = parseFloat(priceElement.dataset.originalPrice);
            if (diamondFishCaught) {
                const discountedPrice = originalPrice * 0.9;
                priceElement.innerHTML = `<del>${originalPrice.toFixed(2)} zł</del> ${discountedPrice.toFixed(2)} zł`;
            } else {
                priceElement.innerHTML = `${originalPrice.toFixed(2)} zł`;
            }
        });
    }

    window.addToCart = function(name, price, available, quantity) {
        if (quantity > available) {
            alert("Nie ma wystarczającej ilości produktów dostępnych.");
            return;
        }
        cart.push({ name, price: parseFloat(price), quantity: parseInt(quantity) });
        updateCart();
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCart();
    };

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            const quantityInput = this.previousElementSibling;
            const quantity = parseInt(quantityInput.value);
            const available = parseInt(this.dataset.available);
            if (quantity > available) {
                alert("Nie ma wystarczającej ilości produktów dostępnych.");
                return;
            }
            addToCart(this.dataset.name, this.dataset.price, available, quantity);
        });
    });

    document.getElementById("clear-cart").addEventListener("click", () => {
        cart = [];
        updateCart();
    });

    window.setDiamondFishCaught = function(value) {
        diamondFishCaught = value;
        updateCart();
        updateProductPrices();
    };

    // Listen for the diamond fish caught event from the game iframe
    window.addEventListener("message", (event) => {
        if (event.data === "diamondFishCaught") {
            setDiamondFishCaught(true);
        }
    });

    // Initialize product prices
    document.querySelectorAll(".price").forEach(priceElement => {
        priceElement.dataset.originalPrice = priceElement.textContent.replace(" zł", "");
    });

    // Move products to their respective categories
    document.querySelectorAll('.product').forEach(product => {
        const category = product.getAttribute('data-category');
        const categoryElement = document.querySelector(`#${category} .product-list`);
        if (categoryElement) {
            categoryElement.appendChild(product);
        } else {
            console.error(`Category element not found for category: ${category}`);
        }
    });

    document.getElementById("place-order").addEventListener("click", function() {
        const orderPopup = document.getElementById("order-popup");
        const orderSummary = document.getElementById("order-summary");
        const cartData = document.getElementById("cart-data");
        orderSummary.innerHTML = "";

        cart.forEach(item => {
            const li = document.createElement("li");
            li.innerText = `${item.name} - ${item.price.toFixed(2)} zł x ${item.quantity}`;
            orderSummary.appendChild(li);
        });

        cartData.value = JSON.stringify(cart);
        orderPopup.style.display = "flex";
    });

    document.querySelector("#order-popup .close-btn").addEventListener("click", function() {
        document.getElementById("order-popup").style.display = "none";
    });

    document.getElementById("continue-shopping").addEventListener("click", function() {
        document.getElementById("order-popup").style.display = "none";
    });

    // Add event listeners to display product description on hover over the image
    document.querySelectorAll('.product img').forEach(image => {
        const product = image.closest('.product');
        const descriptionText = product.getAttribute('data-description');
        const descriptionTooltip = document.createElement('div');
        descriptionTooltip.classList.add('description-tooltip');
        descriptionTooltip.textContent = descriptionText;
        document.body.appendChild(descriptionTooltip);

        image.addEventListener('mouseover', () => {
            const rect = image.getBoundingClientRect();
            descriptionTooltip.style.top = `${rect.top + window.scrollY}px`;
            descriptionTooltip.style.left = `${rect.right + window.scrollX + 10}px`;
            descriptionTooltip.style.display = 'block';
        });

        image.addEventListener('mouseout', () => {
            descriptionTooltip.style.display = 'none';
        });
    });
});