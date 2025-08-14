const products = [
    { id: 1, name: "Frozen Peas", price: 250, category: "Frozen", img: "https://via.placeholder.com/150" },
    { id: 2, name: "Frozen Chicken Nuggets", price: 500, category: "Frozen", img: "https://via.placeholder.com/150" },
    { id: 3, name: "Basmati Rice", price: 180, category: "Pulses", img: "https://via.placeholder.com/150" },
    { id: 4, name: "Sugar 1kg", price: 160, category: "Flour", img: "https://via.placeholder.com/150" },
    { id: 5, name: "Potato Chips", price: 80, category: "Snacks", img: "https://via.placeholder.com/150" },
    { id: 6, name: "Soft Drink 1.5L", price: 120, category: "Drinks", img: "https://via.placeholder.com/150" },
    { id: 7, name: "Brown Bread", price: 90, category: "Bakery", img: "https://via.placeholder.com/150" },
    { id: 8, name: "Dishwashing Liquid", price: 150, category: "Household", img: "https://via.placeholder.com/150" }
];


let cart = [];

function displayProducts(category = "all") {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";
    const filtered = category === "all" ? products : products.filter(p => p.category === category);
    filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Rs. ${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartTotal();
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cart-total").textContent = `Rs. ${total}`;
}

document.getElementById("checkout-btn").addEventListener("click", () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (total < 500) {
        alert("Minimum order is Rs. 500");
        return;
    }
    const orderText = cart.map(i => `${i.name} - Rs.${i.price}`).join("%0A");
    window.open(`https://wa.me/923001234567?text=Order:%0A${orderText}%0ATotal: Rs.${total}`, "_blank");
});

document.querySelectorAll(".categories button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".categories button.active").classList.remove("active");
        btn.classList.add("active");
        displayProducts(btn.dataset.category);
    });
});

displayProducts();