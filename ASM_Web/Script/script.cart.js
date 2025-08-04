document.addEventListener("DOMContentLoaded", function () {
    // Lấy user hiện tại
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!currentUser) {
        document.getElementById("cart-list").innerHTML = "<div style='color:#c00;font-weight:600;'>Please sign in to view your cart.</div>";
        document.getElementById("history-list").innerHTML = "";
        document.getElementById("checkout-btn").style.display = "none";
        return;
    }

    // Lấy giỏ hàng từ localStorage
    function getCart() {
        const carts = JSON.parse(localStorage.getItem("carts") || "{}");
        return carts[currentUser.email] || [];
    }
    function setCart(cart) {
        const carts = JSON.parse(localStorage.getItem("carts") || "{}");
        carts[currentUser.email] = cart;
        localStorage.setItem("carts", JSON.stringify(carts));
    }

    // Lấy lịch sử mua hàng từ localStorage
    function getHistory() {
        const histories = JSON.parse(localStorage.getItem("histories") || "{}");
        return histories[currentUser.email] || [];
    }
    function addHistory(order) {
        const histories = JSON.parse(localStorage.getItem("histories") || "{}");
        if (!histories[currentUser.email]) histories[currentUser.email] = [];
        histories[currentUser.email].push(order);
        localStorage.setItem("histories", JSON.stringify(histories));
    }

    // Hiển thị giỏ hàng
    function renderCart() {
        const cart = getCart();
        const cartList = document.getElementById("cart-list");
        if (!cart.length) {
            cartList.innerHTML = "<div style='color:#888;'>Your cart is empty.</div>";
            return;
        }
        cartList.innerHTML = `
            <table style="width:100%;border-collapse:collapse;">
                <thead>
                    <tr style="background:#eee;">
                        <th style="padding:8px;">Product</th>
                        <th style="padding:8px;">Price</th>
                        <th style="padding:8px;">Quantity</th>
                        <th style="padding:8px;">Total</th>
                        <th style="padding:8px;">Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map((item, idx) => `
                        <tr>
                            <td style="padding:8px;">
                                <img src="${item.image}" alt="${item.name}" style="width:40px;height:40px;vertical-align:middle;border-radius:6px;margin-right:8px;">
                                ${item.name}
                            </td>
                            <td style="padding:8px;">$${item.price}</td>
                            <td style="padding:8px;">
                                <input type="number" min="1" value="${item.quantity}" data-idx="${idx}" class="cart-qty-input" style="width:50px;">
                            </td>
                            <td style="padding:8px;">$${(item.price * item.quantity).toFixed(2)}</td>
                            <td style="padding:8px;">
                                <button class="remove-cart-btn" data-idx="${idx}" style="padding:4px 12px;border-radius:6px;background:#c00;color:#fff;border:none;cursor:pointer;">Remove</button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
        // Sự kiện thay đổi số lượng
        cartList.querySelectorAll(".cart-qty-input").forEach(input => {
            input.addEventListener("change", function () {
                const idx = +this.dataset.idx;
                let cart = getCart();
                let val = Math.max(1, parseInt(this.value) || 1);
                cart[idx].quantity = val;
                setCart(cart);
                renderCart();
            });
        });
        // Sự kiện xóa sản phẩm
        cartList.querySelectorAll(".remove-cart-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const idx = +this.dataset.idx;
                let cart = getCart();
                cart.splice(idx, 1);
                setCart(cart);
                renderCart();
            });
        });
    }

    // Hiển thị lịch sử mua hàng
    function renderHistory() {
        const history = getHistory();
        const historyList = document.getElementById("history-list");
        if (!history.length) {
            historyList.innerHTML = "<div style='color:#888;'>No purchase history yet.</div>";
            return;
        }
        historyList.innerHTML = history.map(order => `
            <div style="border:1px solid #ddd;border-radius:8px;padding:16px;margin-bottom:18px;">
                <div style="font-weight:bold;margin-bottom:8px;">Order Date: ${order.date}</div>
                <table style="width:100%;border-collapse:collapse;">
                    <thead>
                        <tr style="background:#eee;">
                            <th style="padding:6px;">Product</th>
                            <th style="padding:6px;">Price</th>
                            <th style="padding:6px;">Quantity</th>
                            <th style="padding:6px;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td style="padding:6px;">
                                    <img src="${item.image}" alt="${item.name}" style="width:32px;height:32px;vertical-align:middle;border-radius:6px;margin-right:6px;">
                                    ${item.name}
                                </td>
                                <td style="padding:6px;">$${item.price}</td>
                                <td style="padding:6px;">${item.quantity}</td>
                                <td style="padding:6px;">$${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div style="margin-top:8px;text-align:right;font-weight:bold;">Order Total: $${order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}</div>
            </div>
        `).join("");
    }

    // Xử lý nút checkout
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            const cart = getCart();
            if (!cart.length) {
                alert("Your cart is empty!");
                return;
            }
            // Lưu lịch sử mua hàng
            addHistory({
                date: new Date().toLocaleString(),
                items: cart
            });
            setCart([]);
            renderCart();
            renderHistory();
            alert("Checkout successful! Your order has been saved to history.");
        });
    }

    // Hàm thêm sản phẩm vào giỏ hàng (dùng ở các trang khác)
    window.addToCart = function(product) {
        if (!currentUser) {
            alert("Please sign in to add products to cart.");
            return;
        }
        let cart = getCart();
        // Nếu đã có sản phẩm thì tăng số lượng
        const idx = cart.findIndex(item => item.id === product.id);
        if (idx >= 0) {
            cart[idx].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        setCart(cart);
        alert("Added to cart!");
    };

    // Hiển thị khi vào trang
    renderCart();
    renderHistory();
});
