//  header fixed
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar-scroll");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

//  header fixed


// filter javascript
// Add some interactivity
        document.addEventListener('DOMContentLoaded', function () {
            // Mobile filter functionality
            const mobileFilterBtn = document.getElementById('mobileFilterBtn');
            const filterOverlay = document.getElementById('filterOverlay');
            const filterSidebar = document.getElementById('filterSidebar');
            const filterClose = document.getElementById('filterClose');
            const applyFilters = document.getElementById('applyFilters');

            // Open mobile filter
            if (mobileFilterBtn) {
                mobileFilterBtn.addEventListener('click', function () {
                    filterOverlay.classList.add('show');
                    filterSidebar.classList.add('show');
                    document.body.style.overflow = 'hidden';
                });
            }

            // Close mobile filter
            function closeMobileFilter() {
                filterOverlay.classList.remove('show');
                filterSidebar.classList.remove('show');
                document.body.style.overflow = '';
            }

            if (filterClose) {
                filterClose.addEventListener('click', closeMobileFilter);
            }

            if (filterOverlay) {
                filterOverlay.addEventListener('click', closeMobileFilter);
            }

            if (applyFilters) {
                applyFilters.addEventListener('click', function () {
                    // Apply filters and close sidebar
                    console.log('Filters applied');
                    closeMobileFilter();
                });
            }

            // Filter functionality
            const checkboxes = document.querySelectorAll('.form-check-input');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    // Here you would typically filter the results
                    console.log('Filter changed:', this.id, this.checked);
                });
            });

            // Sort functionality
            const sortDropdown = document.querySelector('.dropdown-menu');
            if (sortDropdown) {
                sortDropdown.addEventListener('click', function (e) {
                    if (e.target.classList.contains('dropdown-item')) {
                        e.preventDefault();
                        console.log('Sort by:', e.target.textContent);
                        // Update button text
                        document.querySelector('.dropdown-toggle').textContent = e.target.textContent;
                    }
                });
            }

            // Card hover effects are handled by CSS
            const tourCards = document.querySelectorAll('.tour-card, .activities-tour-card');
            tourCards.forEach(card => {
                card.addEventListener('click', function () {
                    const cardTitle = this.querySelector('.card-title');
                    if (cardTitle) {
                        console.log('Tour selected:', cardTitle.textContent);
                    }
                });
            });
        });
// filter javascript


   // Function to create slider functionality for each filter
        function createSlider(sliderId, minRange, maxRange, rangeFill, minValue, maxValue, maxVal, step = 1000) {
            function updateSlider() {
                let minVal = parseInt(minRange.value);
                let maxVal_current = parseInt(maxRange.value);
                
                // Ensure min doesn't exceed max
                if (minVal >= maxVal_current) {
                    minVal = maxVal_current - step;
                    minRange.value = minVal;
                }
                
                // Ensure max doesn't go below min
                if (maxVal_current <= minVal) {
                    maxVal_current = minVal + step;
                    maxRange.value = maxVal_current;
                }
                
                const minPercent = (minVal / maxVal) * 100;
                const maxPercent = (maxVal_current / maxVal) * 100;
                
                rangeFill.style.left = minPercent + '%';
                rangeFill.style.width = (maxPercent - minPercent) + '%';
                
                // Update display values
                minValue.textContent = minVal;
                maxValue.textContent = maxVal_current;
            }

            // Handle z-index for better interaction
            minRange.addEventListener('mousedown', function () {
                this.style.zIndex = '4';
                maxRange.style.zIndex = '2';
            });

            maxRange.addEventListener('mousedown', function () {
                this.style.zIndex = '4';
                minRange.style.zIndex = '2';
            });

            minRange.addEventListener('input', updateSlider);
            maxRange.addEventListener('input', updateSlider);

            // Initialize the slider
            updateSlider();
        }

        // Initialize all sliders
        document.addEventListener('DOMContentLoaded', function() {
            // Price Per Traveler
            createSlider(1, 
                document.getElementById('minRange1'),
                document.getElementById('maxRange1'),
                document.getElementById('rangeFill1'),
                document.getElementById('minValue1'),
                document.getElementById('maxValue1'),
                50000, 1000
            );

            // Child Age
            createSlider(2,
                document.getElementById('minRange2'),
                document.getElementById('maxRange2'),
                document.getElementById('rangeFill2'),
                document.getElementById('minValue2'),
                document.getElementById('maxValue2'),
                18, 1
            );

            // Infant Age
            createSlider(3,
                document.getElementById('minRange3'),
                document.getElementById('maxRange3'),
                document.getElementById('rangeFill3'),
                document.getElementById('minValue3'),
                document.getElementById('maxValue3'),
                2, 1
            );

            // Number of Nights
            createSlider(4,
                document.getElementById('minRange4'),
                document.getElementById('maxRange4'),
                document.getElementById('rangeFill4'),
                document.getElementById('minValue4'),
                document.getElementById('maxValue4'),
                30, 1
            );

            // Number of Days
            createSlider(5,
                document.getElementById('minRange5'),
                document.getElementById('maxRange5'),
                document.getElementById('rangeFill5'),
                document.getElementById('minValue5'),
                document.getElementById('maxValue5'),
                31, 1
            );
        });