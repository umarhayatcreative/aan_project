  
        function nextTab(tabId) {
            const tabElement = document.getElementById(tabId);
            const tab = new bootstrap.Tab(tabElement);
            tab.show();
            updateStepIndicator(tabId);
        }
        
        function prevTab(tabId) {
            const tabElement = document.getElementById(tabId);
            const tab = new bootstrap.Tab(tabElement);
            tab.show();
            updateStepIndicator(tabId);
        }
        
        function updateStepIndicator(tabId) {
            const badges = document.querySelectorAll('.badge');
            badges.forEach(badge => {
                badge.classList.remove('bg-primary', 'bg-success');
                badge.classList.add('bg-secondary');
            });
            
            if (tabId === 'personal-tab') {
                badges[0].classList.remove('bg-secondary');
                badges[0].classList.add('bg-primary');
            } else if (tabId === 'flight-tab') {
                badges[0].classList.remove('bg-secondary');
                badges[0].classList.add('bg-success');
                badges[1].classList.remove('bg-secondary');
                badges[1].classList.add('bg-primary');
            } else if (tabId === 'hotel-tab') {
                badges[0].classList.remove('bg-secondary');
                badges[0].classList.add('bg-success');
                badges[1].classList.remove('bg-secondary');
                badges[1].classList.add('bg-success');
                badges[2].classList.remove('bg-secondary');
                badges[2].classList.add('bg-primary');
            } else if (tabId === 'transfers-tab') {
                badges[0].classList.remove('bg-secondary');
                badges[0].classList.add('bg-success');
                badges[1].classList.remove('bg-secondary');
                badges[1].classList.add('bg-success');
                badges[2].classList.remove('bg-secondary');
                badges[2].classList.add('bg-success');
                badges[3].classList.remove('bg-secondary');
                badges[3].classList.add('bg-primary');
            }
        }
        
        function selectFlightType(type) {
            const groupBtn = document.getElementById('groupFlightBtn');
            const onlineBtn = document.getElementById('onlineFlightBtn');
            if (type === 'group') {
                groupBtn.classList.add('selected');
                onlineBtn.classList.remove('selected');
            } else {
                groupBtn.classList.remove('selected');
                onlineBtn.classList.add('selected');
            }
        }
        
        function selectTransferType(type) {
            const sharedBtn = document.getElementById('sharedTransferBtn');
            const privateBtn = document.getElementById('privateTransferBtn');
            if (type === 'shared') {
                
                sharedBtn.classList.add('selected');
                privateBtn.classList.remove('selected');
            } else {
                sharedBtn.classList.remove('selected');
                privateBtn.classList.add('selected');
            }
        }
        function selectRouteType(type) {
            const jeddahBtn = document.getElementById('jeddahMakkahBtn');
            const ziaratBtn = document.getElementById('ziaratBtn');
            if (type === 'jeddahMakkah') {
                jeddahBtn.classList.add('selected');
                ziaratBtn.classList.remove('selected');
            } else {
                jeddahBtn.classList.remove('selected');
                ziaratBtn.classList.add('selected');
            }
        }
        
        function submitBooking() {
            // Collect all form data
            const formData = {
                personal: {
                    name: document.getElementById('firstName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    makkahDays: document.getElementById('makkahDays').value,
                    madinahDays: document.getElementById('madinahDays').value,
                    returnDays: document.getElementById('returnDays').value
                },
                flight: {
                    departure: document.getElementById('departure').value,
                    arrival: document.getElementById('arrival').value,
                    departureDate: document.getElementById('departureDate').value,
                    returnDate: document.getElementById('returnDate').value,
                    passengers: document.getElementById('passengers').value,
                    flightClass: document.getElementById('flightClass').value
                },
                hotel: {
                    makkahHotel: document.getElementById('makkahHotel').value,
                    madinahHotel: document.getElementById('madinahHotel').value,
                    roomType: document.getElementById('roomType').value,
                    rooms: document.getElementById('rooms').value,
                    specialRequests: document.getElementById('specialRequests').value
                },
                transfers: {
                    // The new Transfers tab does not have a form, so this object will be empty or contain placeholders
                    // For now, we'll just show a success message.
                    // If a form were present, you would collect its data here.
                }
            };
            
            // Show success message
            alert('Booking submitted successfully! We will contact you shortly.');
            console.log('Booking Data:', formData);
        }
        
        // Set minimum date to today for date inputs
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize Flatpickr for date range selection
            function customFlatpickrFormat(selectedDates, dateStr, instance) {
                if (!selectedDates || selectedDates.length === 0) return '';
                const optsLong = { month: 'long', day: 'numeric' };
                const optsShort = { month: 'short', day: 'numeric' };
                if (selectedDates.length === 1) {
                    return selectedDates[0].toLocaleDateString('en-US', optsLong) + ', ' + selectedDates[0].getFullYear();
                }
                // If months are the same, use short month for second date
                const sameMonth = selectedDates[0].getMonth() === selectedDates[1].getMonth();
                return `${selectedDates[0].toLocaleDateString('en-US', optsLong)} - ${selectedDates[1].toLocaleDateString('en-US', optsShort)}, ${selectedDates[1].getFullYear()}`;
            }
            ["makkahRange", "madinahRange", "returnRange"].forEach(function(id) {
                flatpickr(document.getElementById(id), {
                    mode: "range",
                    dateFormat: "m/d/Y", // internal, not shown
                    allowInput: false,
                    closeOnSelect: true,
                    altInput: false,
                    clickOpens: true,
                    onChange: function(selectedDates, dateStr, instance) {
                        instance.input.value = customFlatpickrFormat(selectedDates, dateStr, instance);
                    },
                    onReady: function(selectedDates, dateStr, instance) {
                        instance.input.value = customFlatpickrFormat(selectedDates, dateStr, instance);
                    }
                });
            });
        });
  