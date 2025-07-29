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
