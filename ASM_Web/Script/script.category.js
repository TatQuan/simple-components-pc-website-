// Filter logic for sidebar links & search (category page)
document.addEventListener('DOMContentLoaded', function() {
    fetch('data/product.json')
        .then(res => res.json())
        .then(data => {
            const productsContent = document.getElementById('category-products-content');
            const filterLinks = document.querySelectorAll('.filter-link');
            const searchForm = document.getElementById('search-form');
            const searchInput = document.getElementById('search-input');

            function renderProducts(type, value) {
                let products = [];
                if (type === 'component') {
                    products = data.Category.Components[value] || [];
                } else if (type === 'peripheral') {
                    products = data.Category.Peripherals[value] || [];
                }
                productsContent.innerHTML = `
                    <h2>${type === 'component' ? value.charAt(0).toUpperCase() + value.slice(1) : value.charAt(0).toUpperCase() + value.slice(1)} Products</h2>
                    <div class="category-detail-grid">
                        ${products.map(p => `
                            <div class="card-product">
                                <img src="${p.image}" alt="${p.name}" class="category-detail-img" />
                                <h3>${p.name}</h3>
                                <p>${p.description}</p>
                                <p class="product-price">$${p.price}</p>
                                <a href="#" class="recommend-btn">Add to Cart</a>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            function showAllCategories() {
                productsContent.innerHTML = `
                    <h2>Components</h2>
                    <div class="category-grid">
                        ${Object.keys(data.Category.Components).map(key => `
                            <div class="category-card" data-type="component" data-value="${key}"><h4>${key.charAt(0).toUpperCase() + key.slice(1)}</h4></div>
                        `).join('')}
                    </div>
                    <h2>Peripherals</h2>
                    <div class="category-grid">
                        ${Object.keys(data.Category.Peripherals).map(key => `
                            <div class="category-card" data-type="peripheral" data-value="${key}"><h4>${key.charAt(0).toUpperCase() + key.slice(1)}</h4></div>
                        `).join('')}
                    </div>
                `;
            }

            showAllCategories();

            filterLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    renderProducts(this.dataset.type, this.dataset.value);
                });
            });

            productsContent.addEventListener('click', function(e) {
                const card = e.target.closest('.category-card');
                if (card) {
                    renderProducts(card.dataset.type, card.dataset.value);
                }
            });

            if (searchForm && searchInput) {
                searchForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const keyword = searchInput.value.trim().toLowerCase();
                    let found = [];
                    Object.values(data.Category.Components).forEach(arr => found = found.concat(arr.filter(p => p.name.toLowerCase().includes(keyword))));
                    Object.values(data.Category.Peripherals).forEach(arr => found = found.concat(arr.filter(p => p.name.toLowerCase().includes(keyword))));
                    productsContent.innerHTML = found.length
                        ? `<h2>Search Results</h2>
                            <div class="category-detail-grid">
                                ${found.map(p => `
                                    <div class="card-product">
                                        <img src="${p.image}" alt="${p.name}" class="category-detail-img" />
                                        <h3>${p.name}</h3>
                                        <p>${p.description}</p>
                                        <p class="product-price">$${p.price}</p>
                                        <a href="#" class="recommend-btn">Add to Cart</a>
                                    </div>
                                `).join('')}
                            </div>`
                        : `<div class="no-results">No products found.</div>`;
                });
            }
        });
});