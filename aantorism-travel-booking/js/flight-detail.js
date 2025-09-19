class FlightBooking {
    constructor() {
        this.init();
    }

    init() {
        this.setupEditTripButton();
        this.setupModalTabs();
    }

    setupEditTripButton() {
        const editTripButton = document.getElementById('editTripButton');
        editTripButton.addEventListener('click', () => {
            const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
            modal.show();
        });
    }

    setupModalTabs() {
        const tabLinks = document.querySelectorAll('.nav-tabs .nav-link');
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href');

                tabLinks.forEach(link => {
                    link.classList.remove('active');
                });
                e.target.classList.add('active');

                const tabContents = document.querySelectorAll('.tab-content .tab-pane');
                tabContents.forEach(content => {
                    content.classList.remove('show', 'active');
                });
                document.querySelector(target).classList.add('show', 'active');
            });
        });
    }
}

// Initialize the booking functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new FlightBooking();
});