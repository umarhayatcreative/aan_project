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
let rooms = [{
    adults: 2,
    children: 0,
    childrenAges: []
}];

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
                ageSection.style.display = 'block';
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
                    ageSection.style.display = 'none';
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
            ${Array.from({length: 17}, (_, i) => `<option value="${i+1}">${i+1} year${i !== 0 ? 's' : ''}</option>`).join('')}
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
        rooms.push({
            adults: 2,
            children: 0,
            childrenAges: []
        });
        
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
                                <button type="button" class="btn btn-outline-secondary rounded-circle btn-sm px-2" onclick="event.stopPropagation(); updateGuests('adults', 'decrease', ${newRoomIndex})">-</button>
                                <span class="mx-3 fw-medium adults-count">2</span>
                                <button type="button" class="btn btn-outline-secondary rounded-circle btn-sm px-2" onclick="event.stopPropagation(); updateGuests('adults', 'increase', ${newRoomIndex})">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-secondary">Children</span>
                            <div class="d-flex align-items-center">
                                <button type="button" class="btn btn-outline-secondary rounded-circle btn-sm px-2" onclick="event.stopPropagation(); updateGuests('children', 'decrease', ${newRoomIndex})">-</button>
                                <span class="mx-3 fw-medium children-count">0</span>
                                <button type="button" class="btn btn-outline-secondary rounded-circle btn-sm px-2" onclick="event.stopPropagation(); updateGuests('children', 'increase', ${newRoomIndex})">+</button>
                            </div>
                        </div>
                    </div>
                    <div id="childrenAgesSection${newRoomIndex}" style="display: none;">
                        <div class="mb-2">
                            <div class="d-flex align-items-center">
                                <span class="text-secondary">Age of Children</span>
                                <i class="fas fa-info-circle ms-1 text-secondary" data-bs-toggle="tooltip" title="Please select the age of each child"></i>
                            </div>
                        </div>
                        <div class="row g-2" id="childrenAges${newRoomIndex}"></div>
                    </div>
                </div>
            `;
            additionalRooms.insertAdjacentHTML('beforeend', roomHtml);
            // Initialize new tooltips
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
        // Show/hide room control buttons
        document.getElementById('removeRoomBtn').style.display = 'block';
        if (rooms.length === 3) {
            document.getElementById('addRoomBtn').style.display = 'none';
        }
        updateSummary();
    }
}

function removeRoom() {
    if (rooms.length > 1) {
        rooms.pop();
        const additionalRooms = document.getElementById('additionalRooms');
        if (additionalRooms) {
            const lastRoom = additionalRooms.lastElementChild;
            const lastHr = lastRoom.previousElementSibling;
            if (lastHr && lastHr.tagName === 'HR') {
                lastHr.remove();
            }
            lastRoom.remove();
        }
        // Show/hide room control buttons
        document.getElementById('addRoomBtn').style.display = 'block';
        if (rooms.length === 1) {
            document.getElementById('removeRoomBtn').style.display = 'none';
        }
        updateSummary();
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
    const dropdownInstance = bootstrap.Dropdown.getInstance(dropdownToggle);
    if (dropdownInstance) {
        dropdownInstance.hide();
    }
}

// Make functions globally accessible
window.updateGuests = updateGuests;
window.updateChildAge = updateChildAge;
window.addRoom = addRoom;
window.removeRoom = removeRoom;
window.applyGuestRoom = applyGuestRoom;