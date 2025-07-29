
 
 function toggleDetails(event) {
            event.preventDefault();
            
            const detailsContent = document.getElementById('detailsContent');
            const chevron = document.querySelector('.details-chevron');
            
            if (detailsContent.classList.contains('show')) {
                detailsContent.classList.remove('show');
                chevron.classList.remove('rotated');
            } else {
                detailsContent.classList.add('show');
                chevron.classList.add('rotated');
            }
        }




          // Baggage selection functionality
        let baggageData = {
            departure: { option: 1, description: '1 x bag (10kg)', price: null },
            return: { option: 0, description: 'Do not add baggage', price: null }
        };

        function updateBaggageSelection(flight, optionValue) {
            const option = parseInt(optionValue);
            baggageData[flight].option = option;
            
            // Update description based on selection
            const selector = document.getElementById(`${flight}-selector`);
            const selectedOption = selector.options[selector.selectedIndex];
            baggageData[flight].description = selectedOption.text;
            
            // Extract price if available
            const priceMatch = selectedOption.text.match(/€\s*([\d.]+)/);
            baggageData[flight].price = priceMatch ? parseFloat(priceMatch[1]) : null;
            
            console.log(`${flight} baggage updated:`, baggageData[flight]);
        }

        function saveBaggage() {
            // Here you would typically send the baggage data to your backend
            console.log('Saving baggage data:', baggageData);
            
            let message = 'Baggage saved successfully!\n\n';
            message += `Departure: ${baggageData.departure.description}\n`;
            message += `Return: ${baggageData.return.description}`;
            
            if (baggageData.return.price) {
                message += `\nTotal additional cost: € ${baggageData.return.price}`;
            }
            
            alert(message);
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('checkInBagsModal'));
            modal.hide();
        }

        // Initialize baggage functionality
        function initializeBaggageSelection() {
            const checkInBagsModal = document.getElementById('checkInBagsModal');
            if (checkInBagsModal) {
                // Initialize selections on modal show
                checkInBagsModal.addEventListener('show.bs.modal', function() {
                    const departureSelector = document.getElementById('departure-selector');
                    const returnSelector = document.getElementById('return-selector');
                    
                    if (departureSelector) {
                        departureSelector.value = '1';
                        updateBaggageSelection('departure', '1');
                    }
                    
                    if (returnSelector) {
                        returnSelector.value = '0';
                        updateBaggageSelection('return', '0');
                    }
                });

                // Reset data when modal is hidden
                checkInBagsModal.addEventListener('hidden.bs.modal', function() {
                    baggageData = {
                        departure: { option: 1, description: '1 x bag (10kg)', price: null },
                        return: { option: 0, description: 'Do not add baggage', price: null }
                    };
                });
            }
        }




         // Seat configuration for each flight segment
        const seatConfigs = {
            'lhr-dxb': {
                1: ['available', 'available', 'available', 'available', 'available', 'available'],
                2: ['available', 'available', 'available', 'available', 'available', 'available'],
                3: ['available', 'not-available', 'available', 'not-available', 'available', 'available'],
                4: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                5: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                6: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                7: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                8: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                9: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                10: ['available', 'available', 'available', 'available', 'available', 'available'],
                11: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                12: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                13: ['available', 'available', 'available', 'available', 'available', 'available'],
                14: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                15: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                16: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                17: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                18: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                19: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                20: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                21: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                22: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                23: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                24: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                25: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                26: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                27: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                28: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                29: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved']
            },
            'dxb-khi': {
                1: ['available', 'available', 'available', 'available', 'available', 'available'],
                2: ['available', 'available', 'available', 'available', 'available', 'available'],
                3: ['available', 'not-available', 'available', 'not-available', 'available', 'available'],
                4: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                5: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                6: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                7: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                8: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                9: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                10: ['available', 'available', 'available', 'available', 'available', 'available'],
                11: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                12: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                13: ['available', 'available', 'available', 'available', 'available', 'available'],
                14: ['available', 'available', 'available', 'available', 'available', 'available'],
                15: ['available', 'available', 'available', 'available', 'available', 'available'],
                16: ['available', 'available', 'available', 'available', 'available', 'available'],
                17: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                18: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                19: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                20: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                21: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                22: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                23: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                24: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                25: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                26: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                27: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                28: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                29: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved']
            },
            'khi-lhr': {
                1: ['available', 'available', 'available', 'available', 'available', 'available'],
                2: ['available', 'available', 'available', 'available', 'available', 'available'],
                3: ['available', 'not-available', 'available', 'not-available', 'available', 'available'],
                4: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                5: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                6: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                7: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                8: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                9: ['available', 'not-available', 'available', 'available', 'available', 'available'],
                10: ['available', 'available', 'available', 'available', 'available', 'available'],
                11: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                12: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                13: ['available', 'available', 'available', 'available', 'available', 'available'],
                14: ['available', 'available', 'available', 'available', 'available', 'available'],
                15: ['available', 'available', 'available', 'available', 'available', 'available'],
                16: ['available', 'available', 'available', 'available', 'available', 'available'],
                17: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                18: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                19: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                20: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                21: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                22: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                23: ['not-available', 'not-available', 'not-available', 'not-available', 'not-available', 'not-available'],
                24: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                25: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                26: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                27: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                28: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved'],
                29: ['reserved', 'reserved', 'reserved', 'reserved', 'reserved', 'reserved']
            }
        };

        let selectedPassenger = 1;
        let selectedSeats = {
            'lhr-dxb': { 1: '16A', 2: null },
            'dxb-khi': { 1: null, 2: null },
            'khi-lhr': { 1: null, 2: null }
        };
        let currentSegment = 'lhr-dxb';

        function generateSeatMap(segment) {
            const seatMap = document.getElementById(`seatMap-${segment}`);
            if (!seatMap) return;

            seatMap.innerHTML = ''; // Clear previous seats
            const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

            for (let row = 1; row <= 29; row++) {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'seat-row';

                // Row number
                const rowNumber = document.createElement('div');
                rowNumber.className = 'row-number';
                rowNumber.textContent = row;
                rowDiv.appendChild(rowNumber);

                // Seats A, B, C
                for (let i = 0; i < 3; i++) {
                    const seat = createSeat(segment, row, letters[i], seatConfigs[segment][row][i]);
                    rowDiv.appendChild(seat);
                }

                // Aisle gap
                const aisleGap = document.createElement('div');
                aisleGap.className = 'aisle-gap';
                rowDiv.appendChild(aisleGap);

                // Seats D, E, F
                for (let i = 3; i < 6; i++) {
                    const seat = createSeat(segment, row, letters[i], seatConfigs[segment][row][i]);
                    rowDiv.appendChild(seat);
                }

                seatMap.appendChild(rowDiv);
            }
        }

        function createSeat(segment, row, letter, type) {
            const seat = document.createElement('div');
            seat.className = `seat ${type}`;
            seat.dataset.seat = `${row}${letter}`;
            seat.dataset.segment = segment;

            // Check if this seat is already selected for the current segment
            if (selectedSeats[segment][selectedPassenger] === `${row}${letter}`) {
                seat.classList.add('selected');
            }

            seat.addEventListener('click', () => selectSeat(seat, segment, `${row}${letter}`));

            return seat;
        }

        function selectSeat(seatElement, segment, seatId) {
            if (seatElement.classList.contains('reserved') ||
                seatElement.classList.contains('not-available')) {
                return;
            }

            // Remove previous selection for this passenger in this segment
            if (selectedSeats[segment][selectedPassenger]) {
                const prevSeat = document.querySelector(`[data-seat="${selectedSeats[segment][selectedPassenger]}"][data-segment="${segment}"]`);
                if (prevSeat) {
                    prevSeat.classList.remove('selected');
                }
            }

            // Add new selection
            selectedSeats[segment][selectedPassenger] = seatId;
            seatElement.classList.add('selected');

            // Update passenger display
            updatePassengerSeat(segment, selectedPassenger, seatId);
        }

        function updatePassengerSeat(segment, passengerNum, seatId) {
            const segmentElement = document.getElementById(segment);
            const passengerItem = segmentElement.querySelector(`[data-passenger="${passengerNum}"]`);
            if (passengerItem) {
                const seatDisplay = passengerItem.querySelector('.small');
                seatDisplay.textContent = seatId;
            }
        }

        function initializePassengerEvents() {
            document.querySelectorAll('.passenger-item').forEach(item => {
                item.addEventListener('click', () => {
                    // Remove selected class from all passengers in current segment
                    const currentSegmentElement = document.querySelector('.flight-segment.active');
                    currentSegmentElement.querySelectorAll('.passenger-item').forEach(p => p.classList.remove('selected'));

                    // Add selected class to clicked passenger
                    item.classList.add('selected');
                    selectedPassenger = parseInt(item.dataset.passenger);

                    // Update passenger number colors in current segment
                    currentSegmentElement.querySelectorAll('.passenger-number').forEach(num => {
                        num.style.backgroundColor = '#d3d3d3ff';
                    });
                    item.querySelector('.passenger-number').style.backgroundColor = '#fb5b32';
                });
            });
        }

        // Initialize seat selection functionality
        function initializeSeatSelection() {
            // Tab selection
            document.querySelectorAll('.flight-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    // Update active tab
                    document.querySelectorAll('.flight-tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    // Update active segment
                    const segment = tab.dataset.segment;
                    document.querySelectorAll('.flight-segment').forEach(s => s.classList.remove('active'));
                    document.getElementById(segment).classList.add('active');

                    currentSegment = segment;

                    // Reset passenger selection to first passenger
                    selectedPassenger = 1;

                    // Update passenger selection UI for new segment
                    const newSegmentElement = document.getElementById(segment);
                    newSegmentElement.querySelectorAll('.passenger-item').forEach(p => p.classList.remove('selected'));
                    const firstPassenger = newSegmentElement.querySelector('[data-passenger="1"]');
                    if (firstPassenger) {
                        firstPassenger.classList.add('selected');
                    }

                    newSegmentElement.querySelectorAll('.passenger-number').forEach(num => {
                        num.style.backgroundColor = '#d3d3d3ff';
                    });
                    const firstPassengerNumber = newSegmentElement.querySelector('[data-passenger="1"] .passenger-number');
                    if (firstPassengerNumber) {
                        firstPassengerNumber.style.backgroundColor = '#fb5b32';
                    }
                });
            });

            // Confirm selection button
            const confirmBtn = document.querySelector('.btn-confirm');
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    // Close modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('seatSelectionModal'));
                    if (modal) {
                        modal.hide();
                    }

                    // Show confirmation (you can customize this)
                    alert('Seat selection confirmed!');
                });
            }

            // Initialize when modal is shown
            const seatModal = document.getElementById('seatSelectionModal');
            if (seatModal) {
                seatModal.addEventListener('shown.bs.modal', function () {
                    // Generate all seat maps
                    generateSeatMap('lhr-dxb');
                    generateSeatMap('dxb-khi');
                    generateSeatMap('khi-lhr');

                    // Initialize passenger event listeners
                    initializePassengerEvents();
                });
            }
        }

        // Initialize everything when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            initializeSeatSelection();
            initializeBaggageSelection();
        });

        // Also initialize if DOM is already loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initializeSeatSelection();
                initializeBaggageSelection();
            });
        } else {
            initializeSeatSelection();
            initializeBaggageSelection();
        }
