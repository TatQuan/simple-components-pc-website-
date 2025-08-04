document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (currentUser) {
        // Tạo khối Hello + Cart + Logout
        const userNav = document.createElement("div");
        userNav.className = "user-info";
        userNav.innerHTML = `
            <span class="user-greeting">Hello, <strong>${currentUser.name}</strong></span>
            <a href="cart.html" class="cart-link">🛒 Cart</a>
            <a href="#" id="logout-btn" class="logout">Log Out</a>
        `;

        // Ẩn nút Sign In / Sign Up
        const authDiv = document.querySelector(".signin-signup");
        if (authDiv) authDiv.style.display = "none";

        // Gắn vào navigation
        const nav = document.querySelector(".nav-container");
        if (nav) nav.appendChild(userNav);

        // Log out event with confirmation dialog
        const logoutBtn = userNav.querySelector("#logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", function (e) {
                e.preventDefault();
                // Tạo dialog xác nhận
                const dialog = document.createElement("div");
                dialog.style.position = "fixed";
                dialog.style.top = "0";
                dialog.style.left = "0";
                dialog.style.width = "100vw";
                dialog.style.height = "100vh";
                dialog.style.background = "rgba(0,0,0,0.3)";
                dialog.style.display = "flex";
                dialog.style.alignItems = "center";
                dialog.style.justifyContent = "center";
                dialog.style.zIndex = "9999";
                dialog.innerHTML = `
                    <div class="log-out-confirm">
                        <div class="title-log-out">Are you sure to log out your account?</div>
                        <button id="confirm-logout-yes" class="confirm-logout-btn">Yes</button>
                        <button id="confirm-logout-no" class="confirm-logout-btn">No</button>
                    </div>
                `;
                document.body.appendChild(dialog);

                dialog.querySelector("#confirm-logout-yes").onclick = function () {
                    localStorage.removeItem("currentUser");
                    dialog.remove();
                    location.reload();
                };
                dialog.querySelector("#confirm-logout-no").onclick = function () {
                    dialog.remove();
                };
            });
        }
    }
});
