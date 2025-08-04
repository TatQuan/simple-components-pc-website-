// Responsive menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    if(menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.querySelector('.nav-list').classList.toggle('active');
        });
    }
});