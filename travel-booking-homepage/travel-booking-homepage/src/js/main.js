// filepath: travel-booking-homepage/src/js/main.js

document.addEventListener('DOMContentLoaded', function () {
    const editTripButton = document.getElementById('editTripButton');
    const modal = document.getElementById('bookingModal');
    const modalCloseButton = document.querySelector('.modal-close');

    // Show the modal when the 'Edit Trip' button is clicked
    editTripButton.addEventListener('click', function () {
        modal.classList.add('show');
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
    });

    // Close the modal when the close button is clicked
    modalCloseButton.addEventListener('click', function () {
        closeModal();
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    // Handle dropdowns for travelers and locations
    const travelersToggle = document.getElementById('travelersToggle');
    const travelersMenu = document.getElementById('travelersMenu');

    travelersToggle.addEventListener('click', function () {
        travelersMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', function (event) {
        if (!event.target.matches('#travelersToggle')) {
            if (travelersMenu.classList.contains('show')) {
                travelersMenu.classList.remove('show');
            }
        }
    });
});