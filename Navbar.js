const btnToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");

btnToggle.addEventListener("click", function() {
    mobileMenu.classList.toggle("nav-active");
    // mobileMenu.classList.toggle("hidden");

    navLinks.forEach((link, index) => {
        if(link.style.animation) {
            link.style.animation = '';
        } else {

            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.5}s`;
        }
    });

    btnToggle.classList.toggle("toggle");
})