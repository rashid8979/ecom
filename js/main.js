// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = button.closest('.product-card');
            const productInfo = {
                id: Math.random().toString(36).substr(2, 9),
                name: product.querySelector('h3').textContent,
                price: product.querySelector('.price').textContent,
                image: product.querySelector('img').src
            };

            cartItems.push(productInfo);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Show notification
            showNotification('Product added to cart!');
        });
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

// Responsive menu
const menuButton = document.createElement('button');
menuButton.className = 'menu-button';
menuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.header-top').prepend(menuButton);

menuButton.addEventListener('click', function() {
    const categories = document.querySelector('.categories ul');
    categories.classList.toggle('show');
});

// Add responsive styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .menu-button {
            display: block;
            background: none;
            border: none;
            color: white;
            font-size: 1.5em;
            cursor: pointer;
        }
        
        .categories ul {
            display: none;
        }
        
        .categories ul.show {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
    
    @media (min-width: 769px) {
        .menu-button {
            display: none;
        }
    }
`;
document.head.appendChild(style);
