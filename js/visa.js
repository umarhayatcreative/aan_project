
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
    const dateInput = document.getElementById('SelectDatemodal');
    if (dateInput) {
        const today = new Date();
        flatpickr(dateInput, {
            minDate: "today",
            dateFormat: "Y-m-d",
            defaultDate: today
        });
    }
});

    function selectTimeSlot(element, timeSlot) {
        const button = element.closest('.dropdown').querySelector('.btn');
        button.textContent = timeSlot;
    }
// // visa modal date