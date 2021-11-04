const btnToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

btnToggle.addEventListener("click", function() {
    mobileMenu.classList.toggle("hidden");
})