// Filter logic for sidebar links & search (category page)
document.addEventListener('DOMContentLoaded', function() {
    const filterLinks = document.querySelectorAll('.filter-link');
    const productsContent = document.getElementById('category-products-content');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // Danh sách sản phẩm mẫu
    const products = [
        {type:'component', value:'case', name:'Case'},
        {type:'component', value:'motherboard', name:'Motherboard'},
        {type:'component', value:'cpu', name:'CPU'},
        {type:'component', value:'ram', name:'RAM'},
        {type:'component', value:'storage', name:'Storage'},
        {type:'component', value:'power-supply', name:'Power Supply'},
        {type:'component', value:'cooling', name:'Cooling'},
        {type:'peripheral', value:'keyboard', name:'Keyboard'},
        {type:'peripheral', value:'mouse', name:'Mouse'},
        {type:'peripheral', value:'monitor', name:'Monitor'}
    ];

    function showAll() {
        productsContent.innerHTML = `
            <h2>Components</h2>
            <div class="category-grid" id="components-grid">
                <div class="category-card" data-type="component" data-value="case"><h4>Case</h4></div>
                <div class="category-card" data-type="component" data-value="motherboard"><h4>Motherboard</h4></div>
                <div class="category-card" data-type="component" data-value="cpu"><h4>CPU</h4></div>
                <div class="category-card" data-type="component" data-value="ram"><h4>RAM</h4></div>
                <div class="category-card" data-type="component" data-value="storage"><h4>Storage</h4></div>
                <div class="category-card" data-type="component" data-value="power-supply"><h4>Power Supply</h4></div>
                <div class="category-card" data-type="component" data-value="cooling"><h4>Cooling</h4></div>
            </div>
            <h2>Peripherals</h2>
            <div class="category-grid" id="peripherals-grid">
                <div class="category-card" data-type="peripheral" data-value="keyboard"><h4>Keyboard</h4></div>
                <div class="category-card" data-type="peripheral" data-value="mouse"><h4>Mouse</h4></div>
                <div class="category-card" data-type="peripheral" data-value="monitor"><h4>Monitor</h4></div>
            </div>
        `;
    }

    if (filterLinks && productsContent) {
        filterLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const type = this.getAttribute('data-type');
                const value = this.getAttribute('data-value');
                e.preventDefault();
                let html = '';
                // Hiển thị sản phẩm chi tiết cho từng mục
                if(type === 'component' && value === 'case') {
                    html = `<h2>Case Products</h2><div class="category-detail-grid">`
                        + `<div class="category-detail-card"><img src="https://cdn.pcpartpicker.com/static/forever/images/product/6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e.256p.jpg" alt="Case 1" class="category-detail-img" /><h3>NZXT H510</h3><p>Mid-tower ATX case, tempered glass, modern design.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://cdn.pcpartpicker.com/static/forever/images/product/7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e.256p.jpg" alt="Case 2" class="category-detail-img" /><h3>Phanteks Eclipse P400A</h3><p>High airflow, mesh front, RGB lighting, ATX support.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://cdn.pcpartpicker.com/static/forever/images/product/8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e8e.256p.jpg" alt="Case 3" class="category-detail-img" /><h3>Lian Li PC-O11 Dynamic</h3><p>Premium dual-chamber, tempered glass, E-ATX support.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://cdn.pcpartpicker.com/static/forever/images/product/9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e9e.256p.jpg" alt="Case 4" class="category-detail-img" /><h3>Cooler Master MasterBox Q300L</h3><p>Compact mATX, modular design, magnetic dust filters.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://cdn.pcpartpicker.com/static/forever/images/product/aeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeae.256p.jpg" alt="Case 5" class="category-detail-img" /><h3>Fractal Design Meshify C</h3><p>Mesh front panel, compact ATX, excellent airflow.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `</div>`;
                } else if(type === 'component' && value === 'motherboard') {
                    html = `<h2>Motherboard Products</h2><div class="category-detail-grid">`
                        + `<div class="category-detail-card"><img src="https://example.com/mb1.jpg" alt="MB 1" class="category-detail-img" /><h3>ASUS ROG Strix B550-F</h3><p>ATX, Ryzen 5000 support, robust power delivery.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mb2.jpg" alt="MB 2" class="category-detail-img" /><h3>MSI MAG B460M Mortar</h3><p>mATX, Intel 10th Gen, strong VRM cooling.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mb3.jpg" alt="MB 3" class="category-detail-img" /><h3>Gigabyte Z490 AORUS Elite</h3><p>ATX, Intel 10th/11th Gen, RGB Fusion.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mb4.jpg" alt="MB 4" class="category-detail-img" /><h3>ASRock B450M Steel Legend</h3><p>mATX, Ryzen, stylish design, affordable.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mb5.jpg" alt="MB 5" class="category-detail-img" /><h3>ASUS TUF Gaming X570-Plus</h3><p>ATX, PCIe 4.0, military-grade components.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `</div>`;
                } else if(type === 'component' && value === 'cpu') {
                    html = `<h2>CPU Products</h2><div class="category-detail-grid">`
                        + `<div class="category-detail-card"><img src="https://example.com/cpu1.jpg" alt="CPU 1" class="category-detail-img" /><h3>Intel Core i7-12700K</h3><p>12th Gen, 12 cores, high performance.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/cpu2.jpg" alt="CPU 2" class="category-detail-img" /><h3>AMD Ryzen 7 5800X</h3><p>8 cores, 16 threads, Zen 3 architecture.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/cpu3.jpg" alt="CPU 3" class="category-detail-img" /><h3>Intel Core i5-12400F</h3><p>6 cores, great value for gaming.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/cpu4.jpg" alt="CPU 4" class="category-detail-img" /><h3>AMD Ryzen 5 5600G</h3><p>Integrated graphics, 6 cores, budget friendly.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/cpu5.jpg" alt="CPU 5" class="category-detail-img" /><h3>Intel Core i9-12900K</h3><p>16 cores, flagship performance.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `</div>`;
                } else if(type === 'component' && value === 'ram') {
                    html = `<h2>RAM Products</h2><div class="category-detail-grid">`
                        + `<div class="category-detail-card"><img src="https://example.com/ram1.jpg" alt="RAM 1" class="category-detail-img" /><h3>Corsair Vengeance LPX 16GB</h3><p>DDR4-3200, low profile, reliable.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/ram2.jpg" alt="RAM 2" class="category-detail-img" /><h3>G.Skill Trident Z RGB 32GB</h3><p>DDR4-3600, RGB lighting, high performance.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/ram3.jpg" alt="RAM 3" class="category-detail-img" /><h3>Kingston Fury Beast 16GB</h3><p>DDR4-3200, stylish heatspreader.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/ram4.jpg" alt="RAM 4" class="category-detail-img" /><h3>Team T-Force Delta RGB 16GB</h3><p>DDR4-3200, vibrant RGB, gaming style.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/ram5.jpg" alt="RAM 5" class="category-detail-img" /><h3>Patriot Viper Steel 16GB</h3><p>DDR4-4400, high speed, solid build.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `</div>`;
                } else if(type === 'component' && value === 'storage') {
                    html = `<h2>Storage Products</h2><div class="category-detail-grid">`
                        + `<div class="category-detail-card"><img src="https://example.com/ssd1.jpg" alt="SSD 1" class="category-detail-img" /><h3>Samsung 970 EVO Plus 1TB</h3><p>NVMe M.2, blazing fast, reliable.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/ssd2.jpg" alt="SSD 2" class="category-detail-img" /><h3>WD Blue 1TB SATA SSD</h3><p>2.5" SATA, affordable, solid performance.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/ssd3.jpg" alt="SSD 3" class="category-detail-img" /><h3>Crucial MX500 500GB</h3><p>2.5" SATA, great value, reliable.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/ssd4.jpg" alt="SSD 4" class="category-detail-img" /><h3>Seagate Barracuda 2TB</h3><p>3.5" HDD, high capacity, budget friendly.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/ssd5.jpg" alt="SSD 5" class="category-detail-img" /><h3>Kingston A2000 1TB</h3><p>NVMe M.2, affordable, good speeds.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `</div>`;
                } else if(type === 'component' && value === 'power-supply') {
                    html = `<h2>Power Supply Products</h2><div class="category-detail-grid">`
                        + `<div class="category-detail-card"><img src="https://example.com/psu1.jpg" alt="PSU 1" class="category-detail-img" /><h3>Corsair RM750x</h3><p>750W, fully modular, 80+ Gold.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/psu2.jpg" alt="PSU 2" class="category-detail-img" /><h3>EVGA SuperNOVA 650 G5</h3><p>650W, compact, 80+ Gold, modular.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/psu3.jpg" alt="PSU 3" class="category-detail-img" /><h3>Seasonic Focus GX-550</h3><p>550W, silent fan, 80+ Gold.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/psu4.jpg" alt="PSU 4" class="category-detail-img" /><h3>Cooler Master MWE 650</h3><p>650W, affordable, reliable.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/psu5.jpg" alt="PSU 5" class="category-detail-img" /><h3>Thermaltake Smart 500W</h3><p>500W, budget, non-modular.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `</div>`;
                } else if(type === 'component' && value === 'cooling') {
                    html = `<h2>Cooling Products</h2><div class="category-detail-grid">`
                        + `<div class="category-detail-card"><img src="https://example.com/cool1.jpg" alt="Cool 1" class="category-detail-img" /><h3>Noctua NH-D15</h3><p>Dual tower, quiet, top-tier air cooling.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/cool2.jpg" alt="Cool 2" class="category-detail-img" /><h3>Corsair iCUE H100i</h3><p>240mm AIO, RGB, high performance.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/cool3.jpg" alt="Cool 3" class="category-detail-img" /><h3>be quiet! Pure Rock 2</h3><p>Quiet, affordable, easy install.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/cool4.jpg" alt="Cool 4" class="category-detail-img" /><h3>Deepcool GAMMAXX 400</h3><p>Budget air cooler, blue LED.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/cool5.jpg" alt="Cool 5" class="category-detail-img" /><h3>NZXT Kraken X53</h3><p>240mm AIO, stylish, great cooling.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `</div>`;
                } else if(type === 'peripheral' && value === 'keyboard') {
                    html = `<h2>Keyboard Products</h2><div class="category-detail-grid">`
                        + `<div class="category-detail-card"><img src="https://example.com/key1.jpg" alt="Key 1" class="category-detail-img" /><h3>Logitech G Pro X</h3><p>Hot-swappable switches, compact, RGB.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/key2.jpg" alt="Key 2" class="category-detail-img" /><h3>Razer BlackWidow V3</h3><p>Mechanical, green switches, RGB.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/key3.jpg" alt="Key 3" class="category-detail-img" /><h3>Keychron K6</h3><p>Wireless, compact, Mac/Win support.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/key4.jpg" alt="Key 4" class="category-detail-img" /><h3>Akko 3068B Plus</h3><p>68 keys, wireless, PBT keycaps.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/key5.jpg" alt="Key 5" class="category-detail-img" /><h3>Ducky One 2 Mini</h3><p>60%, RGB, high quality build.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `</div>`;
                } else if(type === 'peripheral' && value === 'mouse') {
                    html = `<h2>Mouse Products</h2><div class="category-detail-grid">`
                        + `<div class="category-detail-card"><img src="https://example.com/mouse1.jpg" alt="Mouse 1" class="category-detail-img" /><h3>Logitech G502 Hero</h3><p>11 buttons, adjustable weight, RGB.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mouse2.jpg" alt="Mouse 2" class="category-detail-img" /><h3>Razer DeathAdder V2</h3><p>Ergonomic, fast sensor, lightweight.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mouse3.jpg" alt="Mouse 3" class="category-detail-img" /><h3>Glorious Model O</h3><p>Ultra-light, honeycomb shell, RGB.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mouse4.jpg" alt="Mouse 4" class="category-detail-img" /><h3>SteelSeries Rival 3</h3><p>Affordable, RGB, durable switches.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mouse5.jpg" alt="Mouse 5" class="category-detail-img" /><h3>Corsair Katar Pro XT</h3><p>Lightweight, fast, simple design.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `</div>`;
                } else if(type === 'peripheral' && value === 'monitor') {
                    html = `<h2>Monitor Products</h2><div class="category-detail-grid">`
                        + `<div class="category-detail-card"><img src="https://example.com/mon1.jpg" alt="Mon 1" class="category-detail-img" /><h3>LG UltraGear 27GL850</h3><p>27", 144Hz, 1ms, QHD, IPS.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mon2.jpg" alt="Mon 2" class="category-detail-img" /><h3>Dell S2721DGF</h3><p>27", 165Hz, QHD, FreeSync/G-Sync.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mon3.jpg" alt="Mon 3" class="category-detail-img" /><h3>ASUS TUF Gaming VG249Q</h3><p>24", 165Hz, IPS, ELMB.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mon4.jpg" alt="Mon 4" class="category-detail-img" /><h3>AOC 24G2</h3><p>24", 144Hz, IPS, affordable.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `<div class="category-detail-card"><img src="https://example.com/mon5.jpg" alt="Mon 5" class="category-detail-img" /><h3>Samsung Odyssey G5</h3><p>32", 144Hz, curved, immersive.</p><a href="#" class="recommend-btn">Add to Cart</a></div>`
                        + `</div>`;
                } else if(type === 'component') {
                    html = `<h2>Components</h2><div class="category-grid"><div class="category-card" data-type="component" data-value="${value}"><h4>${this.textContent}</h4></div></div>`;
                } else if(type === 'peripheral') {
                    html = `<h2>Peripherals</h2><div class="category-grid"><div class="category-card" data-type="peripheral" data-value="${value}"><h4>${this.textContent}</h4></div></div>`;
                }
                productsContent.innerHTML = html + '<div style="margin-top:24px;"><a href="#" id="show-all-link" style="color:#222;text-decoration:underline;font-weight:600;">Show All</a></div>';
                document.getElementById('show-all-link').onclick = function(ev) { ev.preventDefault(); showAll(); };
            });
        });
    }

    if (searchForm && searchInput && productsContent) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const keyword = searchInput.value.trim().toLowerCase();
            if(!keyword) { showAll(); return; }
            const found = products.filter(p => p.name.toLowerCase().includes(keyword));
            let html = '';
            if(found.length > 0) {
                let comp = found.filter(p=>p.type==='component');
                let peri = found.filter(p=>p.type==='peripheral');
                if(comp.length) {
                    html += '<h2>Components</h2><div class="category-grid">' + comp.map(p=>`<div class=\"category-card\" data-type=\"component\" data-value=\"${p.value}\"><h4>${p.name}</h4></div>`).join('') + '</div>';
                }
                if(peri.length) {
                    html += '<h2>Peripherals</h2><div class="category-grid">' + peri.map(p=>`<div class=\"category-card\" data-type=\"peripheral\" data-value=\"${p.value}\"><h4>${p.name}</h4></div>`).join('') + '</div>';
                }
            } else {
                html = '<div style="padding:24px 0;color:#c00;font-weight:600;">No products found.</div>';
            }
            html += '<div style="margin-top:24px;"><a href="#" id="show-all-link" style="color:#222;text-decoration:underline;font-weight:600;">Show All</a></div>';
            productsContent.innerHTML = html;
            document.getElementById('show-all-link').onclick = function(ev) { ev.preventDefault(); showAll(); };
        });
    }
});


// Login form validation
// This script validates the login form to ensure the email is in the correct format and the password is not empty.

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-login");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", function (e) {
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Kiểm tra email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
        alert("Please enter the correct email format..");
        e.preventDefault(); // Ngăn form gửi đi
        return;
        }

        // Kiểm tra mật khẩu rỗng
        if (password.length === 0) {
        alert("Please enter your password.");
        e.preventDefault();
        return;
        }

        // Nếu qua kiểm tra thì form sẽ gửi bình thường
    });
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-list').classList.toggle('active');
});


// category 
const items = {
    Components: [
        "Case", "Motherboard", "CPU", "GPU", "RAM",
        "Storage", "Power Supply", "Cooling"
    ],
    Peripherals: [
        "Keyboard", "Mouse", "Monitor"
    ]
};

const itemList = document.getElementById("item-list");
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;
        displayItems(category);
    });
});

function displayItems(category) {
    itemList.innerHTML = "";
    items[category].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        itemList.appendChild(li);
    });
}


