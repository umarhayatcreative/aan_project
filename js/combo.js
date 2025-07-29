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
