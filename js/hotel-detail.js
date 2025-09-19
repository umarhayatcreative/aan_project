
document.addEventListener('DOMContentLoaded', function () {
document.getElementById('mobileSearchForm').style.display = 'none';
document.getElementById('destinationDropdownMobile').style.display = 'none';
    // Guest and Room Management
    let rooms = [{
        adults: 2,
        children: 0,
        childrenAges: []
    }];

    // Create age options HTML (0-17 years)
    function createAgeDropdown(roomIndex, childIndex, isMobile = false) {
        const div = document.createElement('div');
        div.className = 'col-6';
        const suffix = isMobile ? 'Mobile' : '';
        div.innerHTML = `
                    <select class="form-select" onchange="updateChildAge(${roomIndex}, ${childIndex}, this.value, ${isMobile})">
                        <option value="">Select Age</option>
                        ${Array.from({ length: 17 }, (_, i) => `<option value="${i + 1}">${i + 1} years</option>`).join('')}
                    </select>
                `;
        return div;
    }

    window.updateChildAge = function (roomIndex, childIndex, age, isMobile = false) {
        const room = rooms[roomIndex - 1];
        room.childrenAges[childIndex] = parseInt(age);

        // Sync the age selection between desktop and mobile
        const suffix = isMobile ? 'Mobile' : '';
        const otherSuffix = isMobile ? '' : 'Mobile';
        const otherContainer = document.getElementById(`childrenAges${roomIndex}${otherSuffix}`);
        if (otherContainer) {
            const selects = otherContainer.getElementsByTagName('select');
            if (selects[childIndex]) {
                selects[childIndex].value = age;
            }
        }
    }

    window.updateGuests = function (type, action, roomIndex) {
        const room = rooms[roomIndex - 1];
        if (action === 'increase') {
            if (type === 'adults' && room.adults < 4) {
                room.adults++;
            } else if (type === 'children' && room.children < 4) {
                room.children++;
                room.childrenAges.push(null);
                // Show age section and add new dropdown for both desktop and mobile
                ['', 'Mobile'].forEach(suffix => {
                    const ageSection = document.getElementById(`childrenAgesSection${roomIndex}${suffix}`);
                    const ageContainer = document.getElementById(`childrenAges${roomIndex}${suffix}`);
                    if (ageSection && ageContainer) {
                        ageSection.style.display = 'block';
                        ageContainer.appendChild(createAgeDropdown(roomIndex, room.children - 1, suffix === 'Mobile'));
                    }
                });
            }
        } else if (action === 'decrease') {
            if (type === 'adults' && room.adults > 1) {
                room.adults--;
            } else if (type === 'children' && room.children > 0) {
                room.children--;
                room.childrenAges.pop();
                // Remove last age dropdown from both desktop and mobile
                ['', 'Mobile'].forEach(suffix => {
                    const ageContainer = document.getElementById(`childrenAges${roomIndex}${suffix}`);
                    if (ageContainer && ageContainer.lastChild) {
                        ageContainer.removeChild(ageContainer.lastChild);
                    }
                    // Hide age section if no children
                    if (room.children === 0) {
                        const ageSection = document.getElementById(`childrenAgesSection${roomIndex}${suffix}`);
                        if (ageSection) {
                            ageSection.style.display = 'none';
                        }
                    }
                });
            }
        }
        updateRoomDisplay(roomIndex);
        updateSummary();
    }

    window.addRoom = function () {
        if (rooms.length < 3) {
            rooms.push({
                adults: 2,
                children: 0,
                childrenAges: []
            });
            const newRoomIndex = rooms.length;

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
                                        <button class="btn btn-outline-secondary rounded-circle adult-child-input btn-sm px-2" onclick="updateGuests('adults', 'decrease', ${newRoomIndex})">-</button>
                                        <span class="mx-3 fw-medium adults-count">2</span>
                                        <button class="btn btn-outline-secondary rounded-circle adult-child-input btn-sm px-2" onclick="updateGuests('adults', 'increase', ${newRoomIndex})">+</button>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-secondary">Children</span>
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-outline-secondary rounded-circle adult-child-input btn-sm px-2" onclick="updateGuests('children', 'decrease', ${newRoomIndex})">-</button>
                                        <span class="mx-3 fw-medium children-count">0</span>
                                        <button class="btn btn-outline-secondary rounded-circle adult-child-input btn-sm px-2" onclick="updateGuests('children', 'increase', ${newRoomIndex})">+</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Children ages section -->
                            <div id="childrenAgesSection${newRoomIndex}" style="display: none;">
                                <div class="mb-2">
                                    <div class="d-flex align-items-center">
                                        <span class="text-secondary">Age of Children</span>
                                        <i class="fas fa-info-circle ms-1 text-secondary" data-bs-toggle="tooltip" title="Please select the age of each child"></i>
                                    </div>
                                </div>
                                <div class="row g-2" id="childrenAges${newRoomIndex}">
                                    <!-- Age dropdowns will be inserted here -->
                                </div>
                            </div>
                        </div>
                    `;

            const roomHtmlMobile = `
                        <hr class="my-3">
                        <div class="room-container mb-3" id="room${newRoomIndex}Mobile">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h6 class="mb-0 fw-medium">Room ${newRoomIndex}</h6>
                            </div>
                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-secondary">Adults</span>
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-outline-secondary rounded-circle adult-child-input btn-sm px-2" onclick="updateGuests('adults', 'decrease', ${newRoomIndex})">-</button>
                                        <span class="mx-3 fw-medium adults-count">2</span>
                                        <button class="btn btn-outline-secondary rounded-circle adult-child-input btn-sm px-2" onclick="updateGuests('adults', 'increase', ${newRoomIndex})">+</button>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-secondary">Children</span>
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-outline-secondary rounded-circle adult-child-input btn-sm px-2" onclick="updateGuests('children', 'decrease', ${newRoomIndex})">-</button>
                                        <span class="mx-3 fw-medium children-count">0</span>
                                        <button class="btn btn-outline-secondary rounded-circle adult-child-input btn-sm px-2" onclick="updateGuests('children', 'increase', ${newRoomIndex})">+</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Children ages section -->
                            <div id="childrenAgesSection${newRoomIndex}Mobile" style="display: none;">
                                <div class="mb-2">
                                    <div class="d-flex align-items-center">
                                        <span class="text-secondary">Age of Children</span>
                                        <i class="fas fa-info-circle ms-1 text-secondary" data-bs-toggle="tooltip" title="Please select the age of each child"></i>
                                    </div>
                                </div>
                                <div class="row g-2" id="childrenAges${newRoomIndex}Mobile">
                                    <!-- Age dropdowns will be inserted here -->
                                </div>
                            </div>
                        </div>
                    `;

            document.getElementById('additionalRooms').insertAdjacentHTML('beforeend', roomHtml);
            document.getElementById('additionalRoomsMobile').insertAdjacentHTML('beforeend', roomHtmlMobile);

            // Update both desktop and mobile remove buttons
            ['removeRoomBtn', 'removeRoomBtnMobile'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.style.display = 'block';
            });

            if (rooms.length === 3) {
                // Hide both desktop and mobile add buttons
                ['addRoomBtn', 'addRoomBtnMobile'].forEach(id => {
                    const element = document.getElementById(id);
                    if (element) element.style.display = 'none';
                });
            }
            updateSummary();
        }
    }

    window.removeRoom = function () {
        if (rooms.length > 1) {
            rooms.pop();

            // Remove from both desktop and mobile
            ['', 'Mobile'].forEach(suffix => {
                const lastRoom = document.querySelector(`#additionalRooms${suffix} .room-container:last-child`);
                if (lastRoom) {
                    const hr = lastRoom.previousElementSibling;
                    if (hr && hr.tagName === 'HR') {
                        hr.remove();
                    }
                    lastRoom.remove();
                }
            });

            // Show add room buttons
            ['addRoomBtn', 'addRoomBtnMobile'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.style.display = 'block';
            });

            if (rooms.length === 1) {
                // Hide remove room buttons
                ['removeRoomBtn', 'removeRoomBtnMobile'].forEach(id => {
                    const element = document.getElementById(id);
                    if (element) element.style.display = 'none';
                });
            }
            updateSummary();
        }
    }

    function updateRoomDisplay(roomIndex) {
        const room = rooms[roomIndex - 1];
        // Update both desktop and mobile room displays
        ['', 'Mobile'].forEach(suffix => {
            const roomElement = document.getElementById(`room${roomIndex}${suffix}`);
            if (roomElement) {
                roomElement.querySelector('.adults-count').textContent = room.adults;
                roomElement.querySelector('.children-count').textContent = room.children;
            }
        });
    }

    function updateSummary() {
        let totalAdults = 0;
        let totalChildren = 0;
        rooms.forEach(room => {
            totalAdults += room.adults;
            totalChildren += room.children;
        });

        const summary = `${totalAdults} Adults, ${totalChildren} Children - ${rooms.length} Room${rooms.length > 1 ? 's' : ''}`;
        // Update both desktop and mobile summaries
        ['guestRoomBtn', 'guestRoomBtnMobile'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = `<option selected>${summary}</option>`;
            }
        });
    }

    window.applyGuestRoom = function () {
        // Close both desktop and mobile dropdowns
        ['guestRoomBtn', 'guestRoomBtnMobile'].forEach(id => {
            const dropdownToggle = document.getElementById(id);
            const dropdownInstance = bootstrap.Dropdown.getInstance(dropdownToggle);
            if (dropdownInstance) {
                dropdownInstance.hide();
            }
        });
    }

    // Initialize nationality dropdown
    const nationalityInput = document.getElementById('nationalityInput');
    const nationalityDropdown = document.getElementById('nationalityDropdown');
    const selectedFlag = document.querySelector('.selected-flag');

    if (nationalityInput && nationalityDropdown) {
        // Show dropdown when input is clicked
        nationalityInput.addEventListener('click', function () {
            nationalityDropdown.style.display = 'block';
        });

        // Handle item selection
        nationalityDropdown.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function () {
                const value = this.getAttribute('data-value');
                const flag = this.getAttribute('data-flag');
                const countryName = this.querySelector('.country-name').textContent;

                nationalityInput.value = countryName;
                selectedFlag.innerHTML = `<span class="fi fi-${flag}"></span>`;
                nationalityDropdown.style.display = 'none';
            });
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!nationalityInput.contains(e.target) && !nationalityDropdown.contains(e.target)) {
                nationalityDropdown.style.display = 'none';
            }
        });

        // Set default value (Pakistan)
        const defaultItem = nationalityDropdown.querySelector('[data-value="PK"]');
        if (defaultItem) {
            const flag = defaultItem.getAttribute('data-flag');
            const countryName = defaultItem.querySelector('.country-name').textContent;
            nationalityInput.value = countryName;
            selectedFlag.innerHTML = `<span class="fi fi-${flag}"></span>`;
        }
    }

    // Destination dropdown handling for desktop
    const destinationInput = document.getElementById('destinationInput');
    const destinationDropdown = document.getElementById('destinationDropdown');

    if (destinationInput && destinationDropdown) {
        // Show dropdown only when input is clicked
        destinationInput.addEventListener('click', function () {
            destinationDropdown.style.display = 'block';
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!destinationInput.contains(e.target) && !destinationDropdown.contains(e.target)) {
                destinationDropdown.style.display = 'none';
            }
        });

        // Handle destination selection
        destinationDropdown.querySelectorAll('.list-group-item').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const location = this.querySelector('.fw-semibold').textContent;
                destinationInput.value = location;
                destinationDropdown.style.display = 'none';
            });
        });
    }

    // Destination dropdown handling for mobile
    const destinationInputMobile = document.getElementById('destinationInputMobile');
    const destinationDropdownMobile = document.getElementById('destinationDropdownMobile');

    if (destinationInputMobile && destinationDropdownMobile) {
        // Show dropdown when input is focused
        destinationInputMobile.addEventListener('focus', function () {
            destinationDropdownMobile.style.display = 'block';
        });

        // Show dropdown and filter items when typing
        destinationInputMobile.addEventListener('input', function () {
            const filter = this.value.toLowerCase();

            // Show dropdown when typing
            destinationDropdownMobile.style.display = 'block';

            // Filter dropdown items
            destinationDropdownMobile.querySelectorAll('.list-group-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(filter)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!destinationInputMobile.contains(e.target) && !destinationDropdownMobile.contains(e.target)) {
                destinationDropdownMobile.style.display = 'none';
            }
        });

        // Handle item selection
        destinationDropdownMobile.querySelectorAll('.list-group-item').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const location = this.querySelector('.fw-semibold').textContent;
                destinationInputMobile.value = location;
                destinationDropdownMobile.style.display = 'none';
            });
        });
    }

    // Mobile nationality dropdown handling
    const mobileNationalityInput = document.getElementById('mobileNationalityInput');
    const mobileNationalityDropdown = document.getElementById('mobileNationalityDropdown');
    const mobileFlagContainer = document.getElementById('mobileFlagContainer');

    if (mobileNationalityInput && mobileNationalityDropdown) {
        // Show dropdown when input is clicked
        mobileNationalityInput.addEventListener('click', function () {
            mobileNationalityDropdown.style.display = 'block';
        });

        // Handle item selection
        mobileNationalityDropdown.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function () {
                const value = this.getAttribute('data-value');
                const flag = this.getAttribute('data-flag');
                const countryName = this.querySelector('.country-name').textContent;

                mobileNationalityInput.value = countryName;
                mobileFlagContainer.innerHTML = `<span class="fi fi-${flag}"></span>`;
                mobileNationalityDropdown.style.display = 'none';
            });
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileNationalityInput.contains(e.target) && !mobileNationalityDropdown.contains(e.target)) {
                mobileNationalityDropdown.style.display = 'none';
            }
        });

        // Set default value (Pakistan)
        const mobileDefaultItem = mobileNationalityDropdown.querySelector('[data-value="PK"]');
        if (mobileDefaultItem) {
            const flag = mobileDefaultItem.getAttribute('data-flag');
            const countryName = mobileDefaultItem.querySelector('.country-name').textContent;
            mobileNationalityInput.value = countryName;
            mobileFlagContainer.innerHTML = `<span class="fi fi-${flag}"></span>`;
        }
    }


    // Mobile search functions
    window.openMobileSearch = function () {
        document.getElementById('mobileSearchButtons').style.display = 'none';
        document.getElementById('mobileSearchForm').style.display = 'block';
    }

    window.closeMobileSearch = function () {
        document.getElementById('mobileSearchForm').style.display = 'none';
        document.getElementById('mobileSearchButtons').style.display = 'flex';
    }

    window.performMobileSearch = function () {
        // Perform search logic here
        closeMobileSearch();
        // You can add actual search functionality here
        console.log('Performing mobile search...');
    }

    window.openMobileFilter = function () {
        const offcanvas = new bootstrap.Offcanvas(document.getElementById('mobileFilterSidebar'));
        offcanvas.show();
    }


});


    // Initialize date picker for check-in/check-out
document.addEventListener('DOMContentLoaded', function () {
    // Desktop date range picker
    flatpickr("#returnRangeModify", {
        mode: "range",
        dateFormat: "d M Y",
        minDate: "today"
    });

    // Mobile date range picker
    flatpickr("#mobileDateRange", {
        mode: "range",
        dateFormat: "d M Y",
        minDate: "today"
    });
});

