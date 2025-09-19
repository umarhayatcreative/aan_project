//  header fixed
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar-scroll");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

//  header fixed

    // Optional: Initialize carousel with specific behavior
                document.addEventListener('DOMContentLoaded', function () {
                    var carousel = new bootstrap.Carousel(document.getElementById('imageCarousel'), {
                        interval: 4000,
                        wrap: true
                    });
                });