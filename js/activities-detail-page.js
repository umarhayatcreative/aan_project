// price date celender
document.addEventListener('DOMContentLoaded', function () {
    const elem = document.getElementById('tourDate');
    if (elem) {
        flatpickr(elem, {
            minDate: "today",
            dateFormat: "Y-m-d"
        });
    }
});
// price date celender



// check availibilty start
// Guest count management
let guestCounts = {
    adults: 2,
    children: 3
};

// Pricing
const pricing = {
    adult: 68.32,
    child: 0.00,
    infant: 0.00
};

function changeGuestCount(type, change) {
    const currentCount = guestCounts[type];
    const newCount = Math.max(0, currentCount + change);

    // Minimum 1 adult required
    if (type === 'adults' && newCount < 1) {
        return;
    }

    guestCounts[type] = newCount;
    document.getElementById(type + 'Count').textContent = newCount;
    updateTotalPrice();
    updateButtonStates();
}

function updateTotalPrice() {
    const total = (guestCounts.adults * pricing.adult) + (guestCounts.children * pricing.child);
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function updateButtonStates() {
    // Adults buttons
    const adultMinusBtn = document.getElementById('adultsMinus');
    const adultsCount = guestCounts.adults;

    if (adultsCount <= 1) {
        adultMinusBtn.classList.add('disabled');
        adultMinusBtn.setAttribute('disabled', 'true');
    } else {
        adultMinusBtn.classList.remove('disabled');
        adultMinusBtn.removeAttribute('disabled');
    }

    // Children buttons
    const childMinusBtn = document.getElementById('childrenMinus');
    const childrenCount = guestCounts.children;

    if (childrenCount <= 0) {
        childMinusBtn.classList.add('disabled');
        childMinusBtn.setAttribute('disabled', 'true');
    } else {
        childMinusBtn.classList.remove('disabled');
        childMinusBtn.removeAttribute('disabled');
    }
}

// Form submission
document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        pickupLocation: document.getElementById('pickupLocation').value,
        transferOption: document.getElementById('transferOption').value,
        adults: guestCounts.adults,
        children: guestCounts.children,
        totalPrice: document.getElementById('totalPrice').textContent
    };

    console.log('Booking Data:', formData);
    alert('Booking form submitted! Check console for details.');
});

// Check availability button
document.querySelector('.btn-orange').addEventListener('click', function () {
    const pickupLocation = document.getElementById('pickupLocation').value;
    const transferOption = document.getElementById('transferOption').value;

    if (!pickupLocation || !transferOption) {
        alert('Please select pickup location and transfer option first.');
        return;
    }

    alert('Checking availability for ' + guestCounts.adults + ' adults and ' + guestCounts.children + ' children...');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    updateTotalPrice();
    updateButtonStates();
});

// check availibilty start




// tour option card start
function selectTourOption(cardElement, optionId) {
    // Remove selected class from all cards
    document.querySelectorAll('.activity-option-card').forEach(card => {
        card.classList.remove('selected-option');
    });

    // Add selected class to clicked card
    cardElement.classList.add('selected-option');

    // Check the radio button
    document.getElementById(optionId).checked = true;
}
// tour option card start