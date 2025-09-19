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

  document.addEventListener('DOMContentLoaded', function () {
    const dateInputs = document.querySelectorAll('.select-date-visa');
    const today = new Date();
    dateInputs.forEach(function(input) {
        flatpickr(input, {
            minDate: "today",
            dateFormat: "Y-m-d",
            defaultDate: today
        });
    });
  });

