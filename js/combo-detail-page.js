document.addEventListener('DOMContentLoaded', function () {
    // ===== Flatpickr Setup =====
    const datepickerElem = document.getElementById('datepicker');
    if (datepickerElem) {
        flatpickr(datepickerElem, {
            inline: true,
            minDate: "today",
            dateFormat: "Y-m-d",
            onChange: function(selectedDates, dateStr, instance) {
                if (selectedDates.length > 0) {
                    updateDateCards(selectedDates[0]);
                    const calendarModal = bootstrap.Modal.getInstance(document.getElementById('calendarModal'));
                    if (calendarModal) calendarModal.hide();
                }
            }
        });
    }

    function updateDateCards(dateObj) {
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dateCardRow = document.querySelector('.date-card-combo .row');
        if (!dateCardRow) return;

        const cols = Array.from(dateCardRow.children);
        cols.forEach(col => {
            if (!col.querySelector('.more-dates-btn')) col.remove();
        });

        for (let i = 0; i < 7; i++) {
            const d = new Date(dateObj);
            d.setDate(d.getDate() + i);
            const month = months[d.getMonth()];
            const day = days[d.getDay()];
            const date = d.getDate();
            const selectedClass = i === 0 ? 'selected' : 'bg-white';
            const col = document.createElement('div');
            col.className = 'col';
            col.innerHTML = `
                <div class="date-card d-flex flex-column align-items-center justify-content-center ${selectedClass}" onclick="selectDate(this)">
                    <div class="month-text">${month}</div>
                    <div class="day-text">${day}</div>
                    <div class="date-number">${date}</div>
                </div>
            `;
            dateCardRow.insertBefore(col, dateCardRow.querySelector('.more-dates-btn').closest('.col'));
        }
    }

    // ===== Price Update Setup =====
    function updatePrice() {
        const adultPrice = 50.40, childPrice = 30.00, infantPrice = 10.00;
        const adults = parseInt(document.getElementById('adultsSelect').value);
        const children = parseInt(document.getElementById('childrenSelect').value);
        const infants = parseInt(document.getElementById('infantsSelect').value);
        const total = (adults * adultPrice) + (children * childPrice) + (infants * infantPrice);
        const priceElem = document.querySelector('.combo-detail-page-details h5.fw-bold');
        if (priceElem) priceElem.textContent = `AED ${total.toFixed(2)}`;
    }

    ['adultsSelect', 'childrenSelect', 'infantsSelect'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', updatePrice);
    });
    updatePrice();

    // ===== Check Availability Loader =====
    const checkBtn = document.getElementById('checkAvailabilityBtn');
    if (checkBtn) {
        checkBtn.addEventListener('click', function () {
            checkBtn.disabled = true;
            const originalText = checkBtn.innerHTML;
            checkBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Checking...';
            setTimeout(() => {
                checkBtn.disabled = false;
                checkBtn.innerHTML = originalText;
            }, 2000);
        });
    }
});


// time slot btn

  document.addEventListener('DOMContentLoaded', function() {
        var dropdownItems = document.querySelectorAll('.combo-time-slot .dropdown-item');
        var timeSlotBtn = document.querySelector('.combo-time-slot .dropdown-toggle');
        dropdownItems.forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                if (timeSlotBtn) {
                    timeSlotBtn.textContent = this.textContent.trim();
                }
            });
        });
    });
    // time slot btn