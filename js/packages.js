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



// price range slider  filter
        const minRange = document.getElementById('minRange');
        const maxRange = document.getElementById('maxRange');
        const rangeFill = document.getElementById('rangeFill');
        const minValue = document.getElementById('minValue');
        const maxValue = document.getElementById('maxValue');
        
        function updateSlider() {
            let minVal = parseInt(minRange.value);
            let maxVal = parseInt(maxRange.value);
            
            // Ensure min doesn't exceed max
            if (minVal >= maxVal) {
                minVal = maxVal - 1000;
                minRange.value = minVal;
            }
            
            // Ensure max doesn't go below min
            if (maxVal <= minVal) {
                maxVal = minVal + 1000;
                maxRange.value = maxVal;
            }
            
            const minPercent = (minVal / 50000) * 100;
            const maxPercent = (maxVal / 50000) * 100;
            
            rangeFill.style.left = minPercent + '%';
            rangeFill.style.width = (maxPercent - minPercent) + '%';
            
            // Update display values
            minValue.textContent = minVal;
            maxValue.textContent = maxVal;
        }
        
        // Handle z-index for better interaction
        minRange.addEventListener('mousedown', function() {
            this.style.zIndex = '4';
            maxRange.style.zIndex = '2';
        });
        
        maxRange.addEventListener('mousedown', function() {
            this.style.zIndex = '4';
            minRange.style.zIndex = '2';
        });
        
        minRange.addEventListener('input', updateSlider);
        maxRange.addEventListener('input', updateSlider);
        
        // Initialize the slider
        updateSlider();

// price range slider  filter