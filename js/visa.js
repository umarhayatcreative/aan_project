
// // Set today's date as default in the input field

document.addEventListener('DOMContentLoaded', function () {
    const checkInInput = document.getElementById('checkInDate');
    if (checkInInput) {
        const today = new Date();
        flatpickr(checkInInput, {
            minDate: "today",
            dateFormat: "Y-m-d",
            defaultDate: today
        });
    }
});

// // visa modal date
document.addEventListener('DOMContentLoaded', function () {
    const checkInInput = document.getElementById('checkInDateM');
    if (checkInInput) {
        const today = new Date();
        flatpickr(checkInInput, {
            minDate: "today",
            dateFormat: "Y-m-d",
            defaultDate: today
        });
    }
});

