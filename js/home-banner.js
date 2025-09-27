

// hotel javascript complete e

document.addEventListener('DOMContentLoaded', function () {
    const today = new Date();

    flatpickr("#returnRange", {
        mode: "range",
        dateFormat: "Y-m-d", // internal format
        defaultDate: [today, today], // both start and end as today
        allowInput: false,
        clickOpens: true,
        onReady: function (selectedDates, dateStr, instance) {
            // Format today's date on load
            const options = { month: 'short', day: 'numeric' };
            const year = today.getFullYear();
            const formatted = `${today.toLocaleDateString('en-US', options)} - ${today.toLocaleDateString('en-US', options)} ${year}`;
            instance.input.value = formatted;
        },
        onChange: function (selectedDates, dateStr, instance) {
            if (selectedDates.length === 2) {
                const start = selectedDates[0];
                const end = selectedDates[1];

                const options = { month: 'short', day: 'numeric' };
                const year = end.getFullYear();

                const formatted = `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)} ${year}`;
                instance.input.value = formatted;
            }
        }
    });
});


// Guests & Rooms logic moved from hotel.html
let rooms = [{ adults: 2, children: 0, childrenAges: [] }];

function updateGuests(type, action, roomIndex) {
    const room = rooms[roomIndex - 1];
    const roomElement = document.getElementById(`room${roomIndex}`);
    
    if (!room || !roomElement) return;
    
    if (action === 'increase') {
        if (type === 'adults' && room.adults < 4) {
            room.adults++;
            roomElement.querySelector('.adults-count').textContent = room.adults;
        } else if (type === 'children' && room.children < 4) {
            room.children++;
            room.childrenAges.push(null);
            roomElement.querySelector('.children-count').textContent = room.children;
            
            // Show and update children ages section
            const ageSection = document.getElementById(`childrenAgesSection${roomIndex}`);
            const ageContainer = document.getElementById(`childrenAges${roomIndex}`);
            if (ageSection && ageContainer) {
                ageSection.classList.remove('d-none');
                const ageDropdown = createAgeDropdown(roomIndex, room.children - 1);
                ageContainer.appendChild(ageDropdown);
            }
        }
    } else if (action === 'decrease') {
        if (type === 'adults' && room.adults > 1) {
            room.adults--;
            roomElement.querySelector('.adults-count').textContent = room.adults;
        } else if (type === 'children' && room.children > 0) {
            room.children--;
            room.childrenAges.pop();
            roomElement.querySelector('.children-count').textContent = room.children;
            
            // Update children ages section
            const ageContainer = document.getElementById(`childrenAges${roomIndex}`);
            if (ageContainer && ageContainer.lastChild) {
                ageContainer.removeChild(ageContainer.lastChild);
            }
            
            // Hide age section if no children
            if (room.children === 0) {
                const ageSection = document.getElementById(`childrenAgesSection${roomIndex}`);
                if (ageSection) {
                    ageSection.classList.add('d-none');
                }
            }
        }
    }
    
    updateSummary();
}

function createAgeDropdown(roomIndex, childIndex) {
    const div = document.createElement('div');
    div.className = 'col-6 mb-2';
    div.innerHTML = `
        <select class="form-select" onchange="updateChildAge(${roomIndex}, ${childIndex}, this.value)">
            <option value="">Select Age</option>
            ${Array.from({ length: 17 }, (_, i) => 
                `<option value="${i + 1}">${i + 1} year${i !== 0 ? 's' : ''}</option>`
            ).join('')}
        </select>
    `;
    return div;
}

function updateChildAge(roomIndex, childIndex, age) {
    const room = rooms[roomIndex - 1];
    if (room && room.childrenAges) {
        room.childrenAges[childIndex] = parseInt(age);
    }
}

function addRoom() {
    if (rooms.length < 3) {
        rooms.push({ adults: 2, children: 0, childrenAges: [] });
        const newRoomIndex = rooms.length;
        const additionalRooms = document.getElementById('additionalRooms');
        
        if (additionalRooms) {
            const roomHtml = `
                <hr class="my-3">
                <div class="room-container mb-3" id="room${newRoomIndex}">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="mb-0 fw-medium">Room ${newRoomIndex}</h6>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-secondary">Adults</span>
                            <div class="d-flex align-items-center">
                                <button type="button" class="btn btn-infants-add-remove btn-outline-secondary guest-counter-btn" 
                                        onclick="event.stopPropagation(); updateGuests('adults', 'decrease', ${newRoomIndex})">−</button>
                                <span class="mx-3 fw-medium adults-count">2</span>
                                <button type="button" class="btn btn-infants-add-remove btn-outline-secondary guest-counter-btn" 
                                        onclick="event.stopPropagation(); updateGuests('adults', 'increase', ${newRoomIndex})">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-secondary">Children</span>
                            <div class="d-flex align-items-center">
                                <button type="button" class="btn btn-infants-add-remove btn-outline-secondary guest-counter-btn" 
                                        onclick="event.stopPropagation(); updateGuests('children', 'decrease', ${newRoomIndex})">−</button>
                                <span class="mx-3 fw-medium children-count">0</span>
                                <button type="button" class="btn btn-infants-add-remove btn-outline-secondary guest-counter-btn" 
                                        onclick="event.stopPropagation(); updateGuests('children', 'increase', ${newRoomIndex})">+</button>
                            </div>
                        </div>
                    </div>
                    <div id="childrenAgesSection${newRoomIndex}" class="d-none">
                        <div class="mb-2">
                            <div class="d-flex align-items-center">
                                <span class="text-secondary">Age of Children</span>
                                <i class="fas fa-info-circle ms-1 text-secondary" data-bs-toggle="tooltip" 
                                   title="Please select the age of each child"></i>
                            </div>
                        </div>
                        <div class="row g-2" id="childrenAges${newRoomIndex}"></div>
                    </div>
                </div>
            `;
            additionalRooms.insertAdjacentHTML('beforeend', roomHtml);
            
            // Initialize new tooltips if Bootstrap is available
            if (typeof bootstrap !== 'undefined') {
                var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl);
                });
            }
        }
        
        updateRoomButtons();
        updateSummary();
    }
}

function removeRoom() {
    if (rooms.length > 1) {
        rooms.pop();
        const additionalRooms = document.getElementById('additionalRooms');
        
        if (additionalRooms && additionalRooms.children.length > 0) {
            // Remove the last room and its hr separator
            const lastElement = additionalRooms.lastElementChild;
            if (lastElement) lastElement.remove();
            
            const hrElement = additionalRooms.lastElementChild;
            if (hrElement && hrElement.tagName === 'HR') {
                hrElement.remove();
            }
        }
        
        updateRoomButtons();
        updateSummary();
    }
}

function updateRoomButtons() {
    const addBtn = document.getElementById('addRoomBtn');
    const removeBtn = document.getElementById('removeRoomBtn');
    
    if (addBtn && removeBtn) {
        // Show add button if less than 3 rooms
        addBtn.style.display = rooms.length < 3 ? 'block' : 'none';
        
        // Show remove button if more than 1 room
        removeBtn.style.display = rooms.length > 1 ? 'block' : 'none';
    }
}

function updateSummary() {
    let totalAdults = 0;
    let totalChildren = 0;
    
    rooms.forEach(room => {
        totalAdults += room.adults;
        totalChildren += room.children;
    });
    
    const summary = `${totalAdults} Adult${totalAdults !== 1 ? 's' : ''}${totalChildren > 0 ? `, ${totalChildren} Child${totalChildren !== 1 ? 'ren' : ''}` : ''} - ${rooms.length} Room${rooms.length !== 1 ? 's' : ''}`;
    
    const guestRoomBtn = document.getElementById('guestRoomBtn');
    if (guestRoomBtn) {
        const span = guestRoomBtn.querySelector('span');
        if (span) {
            span.textContent = summary;
        }
    }
}

function applyGuestRoom() {
    const dropdownToggle = document.getElementById('guestRoomBtn');
    if (typeof bootstrap !== 'undefined') {
        const dropdownInstance = bootstrap.Dropdown.getInstance(dropdownToggle);
        if (dropdownInstance) {
            dropdownInstance.hide();
        }
    }
}

// Initialize button visibility on page load
document.addEventListener('DOMContentLoaded', function() {
    updateRoomButtons();
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

// Make functions globally accessible
window.updateGuests = updateGuests;
window.updateChildAge = updateChildAge;
window.addRoom = addRoom;
window.removeRoom = removeRoom;
window.applyGuestRoom = applyGuestRoom;




// hotel javascript complete end

// flight javascript complete start 
class FlightBookingForm {
    constructor() {
        this.currentTripType = 'roundtrip';
        this.multiCitySegmentCount = 0;
        this.flatpickrInstances = [];

        // Traveler counters for standard form
        this.travelers = {
            adults: 1,
            children: 0,
            infants: 0,
            class: 'economy'
        };

        // Traveler counters for multicity form
        this.multicityTravelers = {
            adults: 1,
            children: 0,
            infants: 0,
            class: 'economy'
        };

        this.init();
    }

    init() {
        this.setupTripTypeRadios();
        this.initializeDatePickers();
        this.setupMultiCityForm();
        this.setupFormSubmission();
        this.setupTravelersDropdown();
        this.initCityDropdowns();
        this.setupCounterAndClassButtons();
    }

    setupCounterAndClassButtons() {
        // Standard form travelers and class
        document.querySelectorAll('#travelers-menu .counter-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Counter button clicked (standard): ', e.target.textContent);
                const counterValueSpan = button.parentNode.querySelector('.counter-value');
                const type = counterValueSpan.id.split('-')[0]; // e.g., 'adults-count' -> 'adults'
                const change = button.textContent === '+' ? 1 : -1;
                this.updateCounter(type, change);
            });
        });

        document.querySelectorAll('#travelers-menu input[name="class"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                console.log('Class radio changed (standard): ', e.target.value);
                this.travelers.class = e.target.value;
                this.applyTravelers();
            });
            radio.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop propagation for the radio button itself
                console.log('Class radio clicked (standard) - stopPropagation');
            });
        });

        document.querySelectorAll('#travelers-menu .class-option label').forEach(label => {
            label.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop propagation for the label
                console.log('Class label clicked (standard) - stopPropagation');
            });
        });

        document.querySelector('#travelers-menu .apply-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent dropdown from immediately re-opening
            console.log('Apply button clicked (standard)');
            this.applyTravelers();
            document.getElementById('travelers-menu').classList.remove('show');
        });

        // Multi-city form travelers and class
        document.querySelectorAll('#multicity-travelers-menu .counter-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Counter button clicked (multicity): ', e.target.textContent);
                const counterValueSpan = button.parentNode.querySelector('.counter-value');
                const type = counterValueSpan.id.split('-')[1]; // e.g., 'multicity-adults-count' -> 'adults'
                const change = button.textContent === '+' ? 1 : -1;
                this.updateMulticityCounter(type, change);
            });
        });

        document.querySelectorAll('#multicity-travelers-menu input[name="multicity-class"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                console.log('Class radio changed (multicity): ', e.target.value);
                this.multicityTravelers.class = e.target.value;
                this.applyMulticityTravelers();
            });
            radio.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop propagation for the radio button itself
                console.log('Class radio clicked (multicity) - stopPropagation');
            });
        });

        document.querySelectorAll('#multicity-travelers-menu .class-option label').forEach(label => {
            label.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop propagation for the label
                console.log('Class label clicked (multicity) - stopPropagation');
            });
        });

        document.querySelector('#multicity-travelers-menu .apply-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent dropdown from immediately re-opening
            console.log('Apply button clicked (multicity)');
            this.applyMulticityTravelers();
            document.getElementById('multicity-travelers-menu').classList.remove('show');
        });
    }

    setupCityInputForElement(inputElement, suggestionsMenuElement) {
        const cities = ["Lahore, Pakistan", "Karachi, Pakistan", "Islamabad, Pakistan", "Multan, Pakistan", "Faisalabad, Pakistan", "Peshawar, Pakistan", "Quetta, Pakistan", "Sialkot, Pakistan", "Rawalpindi, Pakistan", "Hyderabad, Pakistan"];
        const suggestionsList = suggestionsMenuElement.querySelector('ul');

        inputElement.addEventListener('input', () => {
            const query = inputElement.value.toLowerCase();
            const filteredCities = cities.filter(city => city.toLowerCase().includes(query));
            this.displaySuggestions(filteredCities, suggestionsList, inputElement);
            if (query.length > 0 && filteredCities.length > 0) {
                suggestionsMenuElement.classList.add('show');
            } else {
                suggestionsMenuElement.classList.remove('show');
            }
        });

        inputElement.addEventListener('focus', () => {
            const query = inputElement.value.toLowerCase();
            const filteredCities = cities.filter(city => city.toLowerCase().includes(query));
            if (query.length > 0 && filteredCities.length > 0) {
                this.displaySuggestions(filteredCities, suggestionsList, inputElement);
                suggestionsMenuElement.classList.add('show');
            } else if (query.length === 0) { // Show all if input is empty on focus
                this.displaySuggestions(cities, suggestionsList, inputElement);
                suggestionsMenuElement.classList.add('show');
            }
        });

        document.addEventListener('click', (e) => {
            if (!inputElement.contains(e.target) && !suggestionsMenuElement.contains(e.target)) {
                suggestionsMenuElement.classList.remove('show');
            }
        });
    }

    initCityDropdowns() {
        const departureInput = document.getElementById('departure-city');
        const departureSuggestions = document.getElementById('departure-city-suggestions');
        this.setupCityInputForElement(departureInput, departureSuggestions);

        const arrivalInput = document.getElementById('arrival-city');
        const arrivalSuggestions = document.getElementById('arrival-city-suggestions');
        this.setupCityInputForElement(arrivalInput, arrivalSuggestions);
    }

    displaySuggestions(filteredCities, suggestionsList, inputElement) {
        suggestionsList.innerHTML = '';
        filteredCities.forEach(city => {
            const li = document.createElement('li');
            li.textContent = city;
            li.addEventListener('click', () => {
                inputElement.value = city;
                suggestionsList.parentNode.classList.remove('show');
            });
            suggestionsList.appendChild(li);
        });
    }

    setupTripTypeRadios() {
        const radios = document.querySelectorAll('input[name="tripType"]');

        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.currentTripType = e.target.value;
                    this.switchTripType();
                }
            });
        });
    }

    switchTripType() {
        const standardForm = document.getElementById('standard-form');
        const multiCityForm = document.getElementById('multicity-form');
        const dateLabel = document.getElementById('date-label');
        const dateInput = document.getElementById('date-range');

        switch (this.currentTripType) {
            case 'roundtrip':
                standardForm.style.display = 'block';
                multiCityForm.style.display = 'none';
                dateLabel.textContent = 'Depart , Return';
                dateInput.placeholder = 'Jul 23    Jul 25 2025';
                this.initializeDateRange(true);
                break;

            case 'oneway':
                standardForm.style.display = 'block';
                multiCityForm.style.display = 'none';
                dateLabel.textContent = 'Depart';
                dateInput.placeholder = 'Jul 25 2025';
                this.initializeDateRange(false);
                break;

            case 'multicity':
                standardForm.style.display = 'none';
                multiCityForm.style.display = 'block';
                this.ensureMinimumSegments();
                break;
        }
    }

    initializeDatePickers() {
        this.initializeDateRange(true); // Default to round trip
    }

    initializeDateRange(isRoundTrip) {
        // Destroy existing instance if it exists
        const existingInstance = this.flatpickrInstances.find(fp => fp.element.id === 'date-range');
        if (existingInstance) {
            existingInstance.destroy();
            this.flatpickrInstances = this.flatpickrInstances.filter(fp => fp.element.id !== 'date-range');
        }

        const dateInput = document.getElementById('date-range');

        if (isRoundTrip) {
            // Range picker for round trip
            const rangePicker = flatpickr(dateInput, {
                mode: "range",
                dateFormat: "M d Y",
                minDate: "today",
                defaultDate: ["2025-07-23", "2025-07-25"],
                onReady: function (selectedDates, dateStr, instance) {
                    if (selectedDates.length === 2) {
                        const startDate = selectedDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        const endDate = selectedDates[1].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                        instance.input.value = `${startDate}    ${endDate}`;
                    }
                },
                onChange: function (selectedDates, dateStr, instance) {
                    if (selectedDates.length === 2) {
                        const startDate = selectedDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        const endDate = selectedDates[1].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                        instance.input.value = `${startDate}    ${endDate}`;
                    }
                }
            });
            this.flatpickrInstances.push(rangePicker);
            // Explicitly set the value after initialization for round trip
            const defaultDates = rangePicker.config.defaultDate;
            if (Array.isArray(defaultDates) && defaultDates.length === 2) {
                const startDate = new Date(defaultDates[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const endDate = new Date(defaultDates[1]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                dateInput.value = `${startDate}    ${endDate}`;
            }
        } else {
            // Single date picker for one way
            const singlePicker = flatpickr(dateInput, {
                dateFormat: "M d Y",
                minDate: "today",
                defaultDate: "2025-07-25",
                onChange: function (selectedDates, dateStr, instance) {
                    if (selectedDates.length === 1) {
                        const date = selectedDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                        instance.input.value = date;
                    }
                }
            });
            this.flatpickrInstances.push(singlePicker);
            // Explicitly set the value after initialization for one way
            const defaultDate = singlePicker.config.defaultDate;
            if (defaultDate) {
                const date = new Date(defaultDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                dateInput.value = date;
            }
        }
    }

    setupMultiCityForm() {
        const addFlightBtn = document.getElementById('add-flight-btn');
        addFlightBtn.addEventListener('click', () => this.addFlightSegment());

        // Initialize with two segments
        this.ensureMinimumSegments();
    }

    ensureMinimumSegments() {
        const segmentsContainer = document.getElementById('flight-segments');
        if (segmentsContainer.children.length < 2) {
            // Clear and add initial segments
            segmentsContainer.innerHTML = '';
            this.multiCitySegmentCount = 0;

            this.addFlightSegment('Lahore, Pakistan', 'Multan, Pakistan');
            this.addFlightSegment('Islamabad, Pakistan', 'Karachi, Pakistan');
        }
    }

    addFlightSegment(fromCity = '', toCity = '') {
        this.multiCitySegmentCount++;
        const segmentsContainer = document.getElementById('flight-segments');

        const segmentHTML = `
                    <div class="flight-multi-city-segment" data-segment="${this.multiCitySegmentCount}">
                        ${this.multiCitySegmentCount > 2 ? '<button type="button" class="flight-remove-segment" onclick="flightForm.removeFlightSegment(' + this.multiCitySegmentCount + ')">⊗</button>' : ''}
                        <div class="row g-3">
                            <div class="col-md-6 col-lg-4 col-xl-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control fw-semibold" placeholder="Leaving from" value="${fromCity}">
                                    <label>Leaving from</label>
                                    <div class="city-suggestions-menu bg-white">
                                        <ul></ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-4 col-xl-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control fw-semibold" placeholder="Going to" value="${toCity}">
                                    <label>Going to</label>
                                    <div class="city-suggestions-menu bg-white">
                                        <ul></ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-4 col-xl-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control segment-date date-single-input fw-semibold" placeholder="Fri, Jul 25" value="Fri, Jul 25" readonly>
                                    <label>Depart</label>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-4 col-xl-3">
                                    <div class="travelers-dropdown mb-3">
                                        <div class="form-floating">
                                            <input type="text" class="form-control travelers-toggle fw-semibold"
                                                id="multicity-travelers-display" placeholder="Travelers & Class"
                                                readonly value="1 Adults Economy">
                                            <label for="multicity-travelers-display">Travelers & Class</label>
                                        </div>
                                        <div class="travelers-menu" id="multicity-travelers-menu">
                                            <div class="traveler-row">
                                                <span>Adults</span>
                                                <div class="traveler-controls">
                                                    <button type="button" class="counter-btn">-</button>
                                                    <span class="counter-value" id="multicity-adults-count">1</span>
                                                    <button type="button" class="counter-btn">+</button>
                                                </div>
                                            </div>
                                            <div class="traveler-row">
                                                <span>Children</span>
                                                <div class="traveler-controls">
                                                    <button type="button" class="counter-btn">-</button>
                                                    <span class="counter-value" id="multicity-children-count">0</span>
                                                    <button type="button" class="counter-btn">+</button>
                                                </div>
                                            </div>
                                            <div class="traveler-row">
                                                <span>Infants</span>
                                                <div class="traveler-controls">
                                                    <button type="button" class="counter-btn">-</button>
                                                    <span class="counter-value" id="multicity-infants-count">0</span>
                                                    <button type="button" class="counter-btn">+</button>
                                                </div>
                                            </div>
                                            <div class="class-options">
                                                <div class="class-option">
                                                    <input type="radio" id="multicity-economy" name="multicity-class"
                                                        value="economy" checked>
                                                    <label for="multicity-economy">Economy</label>
                                                </div>
                                                <div class="class-option">
                                                    <input type="radio" id="multicity-business" name="multicity-class"
                                                        value="business">
                                                    <label for="multicity-business">Business Class</label>
                                                </div>
                                                <div class="class-option">
                                                    <input type="radio" id="multicity-first" name="multicity-class"
                                                        value="first">
                                                    <label for="multicity-first">First Class</label>
                                                </div>
                                            </div>
                                            <button type="button" class="apply-btn text-white">Apply</button>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">Search</button>
                                </div>
                        </div>
                    </div>
                `;

        segmentsContainer.insertAdjacentHTML('beforeend', segmentHTML);

        // Initialize date picker for the new segment
        const newSegment = segmentsContainer.lastElementChild;
        const dateInput = newSegment.querySelector('.segment-date');
        const datePicker = flatpickr(dateInput, {
            dateFormat: "D, M d",
            minDate: "today",
            defaultDate: "2025-07-25",
            onChange: function (selectedDates, dateStr, instance) {
                if (selectedDates.length === 1) {
                    const date = selectedDates[0].toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                    instance.input.value = date;
                }
            }
        });

        this.flatpickrInstances.push(datePicker);

        // Explicitly set the value after initialization for multicity segments
        const defaultSegmentDate = datePicker.config.defaultDate;
        if (defaultSegmentDate) {
            const date = new Date(defaultSegmentDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            dateInput.value = date;
        }

        // Initialize city dropdowns for the new segment
        const fromInput = newSegment.querySelector('div.col-md-3:nth-child(1) input[type="text"]');
        const fromSuggestions = newSegment.querySelector('div.col-md-3:nth-child(1) .city-suggestions-menu');
        this.setupCityInputForElement(fromInput, fromSuggestions);

        const toInput = newSegment.querySelector('div.col-md-3:nth-child(2) input[type="text"]');
        const toSuggestions = newSegment.querySelector('div.col-md-3:nth-child(2) .city-suggestions-menu');
        this.setupCityInputForElement(toInput, toSuggestions);
    }

    removeFlightSegment(segmentId) {
        const segment = document.querySelector(`[data-segment="${segmentId}"]`);
        if (segment) {
            // Find and destroy the associated flatpickr instance
            const dateInput = segment.querySelector('.segment-date');
            const fpIndex = this.flatpickrInstances.findIndex(fp => fp.element === dateInput);
            if (fpIndex > -1) {
                this.flatpickrInstances[fpIndex].destroy();
                this.flatpickrInstances.splice(fpIndex, 1);
            }

            segment.remove();
        }
    }

    setupFormSubmission() {
        const form = document.getElementById('flightBookingForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data based on trip type
            const formData = this.collectFormData();
            console.log('Flight search data:', formData);

            // Here you would typically send the data to your backend
            alert('Search functionality would be implemented here!\n\nForm Data:\n' + JSON.stringify(formData, null, 2));
        });
    }

    collectFormData() {
        const data = {
            tripType: this.currentTripType
        };

        if (this.currentTripType === 'multicity') {
            data.segments = [];
            const segments = document.querySelectorAll('.flight-multi-city-segment');

            segments.forEach(segment => {
                const inputs = segment.querySelectorAll('input');
                data.segments.push({
                    from: inputs[0].value,
                    to: inputs[1].value,
                    date: inputs[2].value
                });
            });

            data.travelers = this.multicityTravelers;
        } else {
            data.from = document.getElementById('departure-city').value;
            data.to = document.getElementById('arrival-city').value;
            data.dateRange = document.getElementById('date-range').value;
            data.travelers = this.travelers;
        }

        return data;
    }

    setupTravelersDropdown() {
        // Setup standard form dropdown
        const travelersToggle = document.getElementById('travelers-display');
        const travelersMenu = document.getElementById('travelers-menu');

        travelersToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            travelersMenu.classList.toggle('show');
            console.log('Travelers toggle clicked. Menu show state:', travelersMenu.classList.contains('show'));
        });

        // Setup multicity form dropdown
        const multicityToggle = document.getElementById('multicity-travelers-display');
        const multicityMenu = document.getElementById('multicity-travelers-menu');

        multicityToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            multicityMenu.classList.toggle('show');
            console.log('Multicity travelers toggle clicked. Menu show state:', multicityMenu.classList.contains('show'));
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!travelersMenu.contains(e.target) && !travelersToggle.contains(e.target)) {
                travelersMenu.classList.remove('show');
                console.log('Document click - closing standard travelers menu');
            }
            if (!multicityMenu.contains(e.target) && !multicityToggle.contains(e.target)) {
                multicityMenu.classList.remove('show');
                console.log('Document click - closing multicity travelers menu');
            }
        });
    }

    updateCounter(type, change) {
        const currentValue = this.travelers[type];
        const newValue = Math.max(0, currentValue + change);

        // Adults must be at least 1
        if (type === 'adults' && newValue < 1) return;

        this.travelers[type] = newValue;
        document.getElementById(`${type}-count`).textContent = newValue;

        // Update counter button states
        this.updateCounterButtons();
        this.applyTravelers(); // Update display immediately
    }

    updateMulticityCounter(type, change) {
        const currentValue = this.multicityTravelers[type];
        const newValue = Math.max(0, currentValue + change);

        // Adults must be at least 1
        if (type === 'adults' && newValue < 1) return;

        this.multicityTravelers[type] = newValue;
        document.getElementById(`multicity-${type}-count`).textContent = newValue;

        // Update counter button states
        this.updateMulticityCounterButtons();
        this.applyMulticityTravelers(); // Update display immediately
    }

    updateCounterButtons() {
        // Disable minus buttons at minimum values
        document.querySelector('#travelers-menu .traveler-row:nth-child(1) .counter-btn:first-child').disabled = this.travelers.adults <= 1;
        document.querySelector('#travelers-menu .traveler-row:nth-child(2) .counter-btn:first-child').disabled = this.travelers.children <= 0;
        document.querySelector('#travelers-menu .traveler-row:nth-child(3) .counter-btn:first-child').disabled = this.travelers.infants <= 0;
    }

    updateMulticityCounterButtons() {
        // Disable minus buttons at minimum values for multicity
        document.querySelector('#multicity-travelers-menu .traveler-row:nth-child(1) .counter-btn:first-child').disabled = this.multicityTravelers.adults <= 1;
        document.querySelector('#multicity-travelers-menu .traveler-row:nth-child(2) .counter-btn:first-child').disabled = this.multicityTravelers.children <= 0;
        document.querySelector('#multicity-travelers-menu .traveler-row:nth-child(3) .counter-btn:first-child').disabled = this.multicityTravelers.infants <= 0;
    }

    applyTravelers() {
        // Get selected class
        const selectedClass = document.querySelector('input[name="class"]:checked').value;
        this.travelers.class = selectedClass;

        // Update display
        const total = this.travelers.adults + this.travelers.children;
        const displayText = `${total} Travelers ${selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)}`;
        document.getElementById('travelers-display').value = displayText;
        console.log('applyTravelers called. New display text:', displayText);

        // The dropdown will be closed by the Apply button's onclick handler
    }

    applyMulticityTravelers() {
        // Get selected class
        const selectedClass = document.querySelector('input[name="multicity-class"]:checked').value;
        this.multicityTravelers.class = selectedClass;

        // Update display
        const total = this.multicityTravelers.adults + this.multicityTravelers.children;
        const displayText = `${total} Travelers ${selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)}`;
        document.getElementById('multicity-travelers-display').value = displayText;
        console.log('applyMulticityTravelers called. New display text:', displayText);

        // The dropdown will be closed by the Apply button's onclick handler
    }
}

// Initialize the form when the page loads
let flightForm;
document.addEventListener('DOMContentLoaded', () => {
    flightForm = new FlightBookingForm();
});

// Travelers & Class Dropdown Logic (Reusable for both standard and multicity forms)
document.addEventListener('DOMContentLoaded', function () {
    // --- Travelers & Class Dropdown (Reusable) ---
    function setupTravelersDropdown(toggleSelector, menuSelector, applyBtnSelector, displaySelector, counts, classRadioName) {
        const toggle = document.querySelector(toggleSelector);
        const menu = document.querySelector(menuSelector);
        const applyBtn = menu.querySelector(applyBtnSelector);
        const display = document.querySelector(displaySelector);

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            document.querySelectorAll('.travelers-menu.show').forEach(m => {
                if (m !== menu) m.classList.remove('show');
            });
            menu.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.remove('show');
            }
        });

        counts.forEach(count => {
            const minusBtn = menu.querySelector(`#${count.id}-count`).previousElementSibling;
            const plusBtn = menu.querySelector(`#${count.id}-count`).nextElementSibling;
            const valueSpan = menu.querySelector(`#${count.id}-count`);
            let value = parseInt(valueSpan.textContent, 10);

            minusBtn.addEventListener('click', function () {
                if (value > count.min) {
                    value--;
                    valueSpan.textContent = value;
                }
            });
            plusBtn.addEventListener('click', function () {
                if (value < count.max) {
                    value++;
                    valueSpan.textContent = value;
                }
            });
        });

        applyBtn.addEventListener('click', function () {
            const adults = menu.querySelector(`#${counts[0].id}-count`).textContent;
            const children = menu.querySelector(`#${counts[1].id}-count`).textContent;
            const infants = menu.querySelector(`#${counts[2].id}-count`).textContent;
            const classValue = menu.querySelector(`input[name="${classRadioName}"]:checked`).nextElementSibling.textContent;
            let travelerStr = `${adults} Adults`;
            if (parseInt(children, 10) > 0) travelerStr += `, ${children} Children`;
            if (parseInt(infants, 10) > 0) travelerStr += `, ${infants} Infants`;
            display.value = `${travelerStr} ${classValue}`;
            menu.classList.remove('show');
        });
    }

    // Standard (oneway/roundtrip)
    setupTravelersDropdown(
        '#travelers-display',
        '#travelers-menu',
        '.apply-btn',
        '#travelers-display',
        [
            { id: 'adults', min: 1, max: 9 },
            { id: 'children', min: 0, max: 9 },
            { id: 'infants', min: 0, max: 9 }
        ],
        'class'
    );

    // --- Multicity Logic ---
    const multicityRowsContainer = document.getElementById('multicity-rows');
    const actionsRow = document.getElementById('multicity-actions-row');
    const addBtn = document.getElementById('add-multicity-flight-btn');
    const maxFlights = 5;
    let multicityRowCount = 0;

    // HTML for Travelers & Class Dropdown (same as in your form)
    function travelersDropdownHTML() {
        return `
        <div class="travelers-dropdown ">
            <div class="form-floating">
                <input type="text" class="form-control travelers-toggle fw-semibold"
                    id="multicity-travelers-display" placeholder="Travelers & Class"
                    readonly value="1 Adults Economy">
                <label for="multicity-travelers-display">Travelers & Class</label>
            </div>
            <div class="travelers-menu" id="multicity-travelers-menu">
                <div class="traveler-row">
                    <span>Adults</span>
                    <div class="traveler-controls">
                        <button type="button" class="counter-btn">-</button>
                        <span class="counter-value" id="multicity-adults-count">1</span>
                        <button type="button" class="counter-btn">+</button>
                    </div>
                </div>
                <div class="traveler-row">
                    <span>Children</span>
                    <div class="traveler-controls">
                        <button type="button" class="counter-btn">-</button>
                        <span class="counter-value" id="multicity-children-count">0</span>
                        <button type="button" class="counter-btn">+</button>
                    </div>
                </div>
                <div class="traveler-row">
                    <span>Infants</span>
                    <div class="traveler-controls">
                        <button type="button" class="counter-btn">-</button>
                        <span class="counter-value" id="multicity-infants-count">0</span>
                        <button type="button" class="counter-btn">+</button>
                    </div>
                </div>
                <div class="class-options">
                    <div class="class-option">
                        <input type="radio" id="multicity-economy" name="multicity-class"
                            value="economy" checked>
                        <label for="multicity-economy">Economy</label>
                    </div>
                    <div class="class-option">
                        <input type="radio" id="multicity-business" name="multicity-class"
                            value="business">
                        <label for="multicity-business">Business Class</label>
                    </div>
                    <div class="class-option">
                        <input type="radio" id="multicity-first" name="multicity-class"
                            value="first">
                        <label for="multicity-first">First Class</label>
                    </div>
                </div>
                <button type="button" class="apply-btn text-white">Apply</button>
            </div>
        </div>
        `;
    }

    // Row HTML generator
    function multicityRowHTML(idx, removable) {
        // First row: 4 columns (last is travelers & class + search)
        if (idx === 0) {
            return `
            <div class="row g-3 multicity-row mb-3" data-row="${idx}">
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="form-floating">
                        <input type="text" class="form-control fw-semibold multicity-departure" placeholder="Leaving from">
                        <label>Leaving from</label>
                        <div class="city-suggestions-menu bg-white"></div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="form-floating">
                        <input type="text" class="form-control fw-semibold multicity-arrival" placeholder="Going to">
                        <label>Going to</label>
                        <div class="city-suggestions-menu bg-white"></div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="form-floating">
                        <input type="text" class="form-control date-single-input fw-semibold multicity-date" placeholder="Depart" readonly>
                        <label>Depart</label>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-3 d-flex flex-column gap-2">
                    ${travelersDropdownHTML()}
                   
                </div>
            </div>
            `;
        }
        // Second row: 3 columns, no remove button
        if (idx === 1) {
            return `
            <div class="row g-3 multicity-row mb-3" data-row="${idx}">
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="form-floating">
                        <input type="text" class="form-control fw-semibold multicity-departure" placeholder="Leaving from">
                        <label>Leaving from</label>
                        <div class="city-suggestions-menu bg-white"></div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="form-floating">
                        <input type="text" class="form-control fw-semibold multicity-arrival" placeholder="Going to">
                        <label>Going to</label>
                        <div class="city-suggestions-menu bg-white"></div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="form-floating">
                        <input type="text" class="form-control date-single-input fw-semibold multicity-date" placeholder="Depart" readonly>
                        <label>Depart</label>
                    </div>
                </div>
            </div>
            `;
        }
        // 3rd+ row: 3 columns + remove button
        return `
        <div class="row g-3 multicity-row mb-3" data-row="${idx}">
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="form-floating">
                    <input type="text" class="form-control fw-semibold multicity-departure" placeholder="Leaving from">
                    <label>Leaving from</label>
                    <div class="city-suggestions-menu bg-white"></div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="form-floating">
                    <input type="text" class="form-control fw-semibold multicity-arrival" placeholder="Going to">
                    <label>Going to</label>
                    <div class="city-suggestions-menu bg-white"></div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="form-floating">
                    <input type="text" class="form-control date-single-input fw-semibold multicity-date" placeholder="Depart" readonly>
                    <label>Depart</label>
                </div>
            </div>
            <div class="col-md-1 d-flex align-items-center justify-content-center">
                <button type="button" class="btn btn-link text-muted remove-multicity-row fs-4 text-decoration-none" title="Remove">&times;</button>
            </div>
        </div>
        `;
    }

    // Render all rows
    function renderMulticityRows() {
        multicityRowsContainer.innerHTML = '';
        for (let i = 0; i < multicityRowCount; i++) {
            multicityRowsContainer.insertAdjacentHTML('beforeend', multicityRowHTML(i, i > 1));
        }
        // Setup Flatpickr for all .multicity-date
        multicityRowsContainer.querySelectorAll('.multicity-date').forEach(input => {
            flatpickr(input, { minDate: "today", dateFormat: "D, M d" });
        });
        // Setup travelers dropdown for first row only
        if (multicityRowCount > 0) {
            setupTravelersDropdown(
                '#multicity-travelers-display',
                '#multicity-travelers-menu',
                '.apply-btn',
                '#multicity-travelers-display',
                [
                    { id: 'multicity-adults', min: 1, max: 9 },
                    { id: 'multicity-children', min: 0, max: 9 },
                    { id: 'multicity-infants', min: 0, max: 9 }
                ],
                'multicity-class'
            );
        }
        // Move actions row below the last multicity row
        multicityRowsContainer.parentNode.insertBefore(actionsRow, multicityRowsContainer.nextSibling);
    }

    function addMulticityRow() {
        if (multicityRowCount < maxFlights) {
            multicityRowCount++;
            renderMulticityRows();
        }
        addBtn.disabled = multicityRowCount >= maxFlights;
    }

    multicityRowsContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-multicity-row')) {
            const row = e.target.closest('.multicity-row');
            if (row) {
                row.remove();
                multicityRowCount--;
                renderMulticityRows();
            }
        }
    });

    addBtn.addEventListener('click', function () {
        addMulticityRow();
    });

    // Initialize with 2 default rows
    multicityRowCount = 2;
    renderMulticityRows();
});

// flight javascript complete end

// visa javascript complete start



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

// visa javascript complete end

// Immediately initialize cart functionality
const cartToggleBtn = document.querySelector('.cart-toggle-btn');
const cartDropdown = document.querySelector('.cart-dropdown');
const closeBtn = document.querySelector('.dropdown-close-btn');

if (cartToggleBtn && cartDropdown && closeBtn) {
    // Toggle cart dropdown on cart icon click
    cartToggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        cartDropdown.classList.toggle('d-none');
    });

    // Close dropdown when close button is clicked
    closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        cartDropdown.classList.add('d-none');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!cartDropdown.contains(e.target) && !cartToggleBtn.contains(e.target)) {
            cartDropdown.classList.add('d-none');
        }
    });
}