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

    // Mobile Filter Toggle
        document.getElementById('mobileFilterBtn').addEventListener('click', function () {
            document.getElementById('filterSidebar').classList.add('show');
            document.getElementById('filterOverlay').classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        document.getElementById('filterClose').addEventListener('click', closeFilter);
        document.getElementById('filterOverlay').addEventListener('click', closeFilter);
        document.getElementById('applyFilters').addEventListener('click', closeFilter);

        function closeFilter() {
            document.getElementById('filterSidebar').classList.remove('show');
            document.getElementById('filterOverlay').classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        // Range Slider Functionality
        function initRangeSlider(minId, maxId, fillId, minValueId, maxValueId) {
            const minRange = document.getElementById(minId);
            const maxRange = document.getElementById(maxId);
            const rangeFill = document.getElementById(fillId);
            const minValue = document.getElementById(minValueId);
            const maxValue = document.getElementById(maxValueId);

            if (!minRange || !maxRange || !rangeFill || !minValue || !maxValue) return;

            function updateSlider() {
                const minVal = parseInt(minRange.value);
                const maxVal = parseInt(maxRange.value);
                const minPercent = ((minVal - minRange.min) / (minRange.max - minRange.min)) * 100;
                const maxPercent = ((maxVal - minRange.min) / (minRange.max - minRange.min)) * 100;

                rangeFill.style.left = minPercent + '%';
                rangeFill.style.width = (maxPercent - minPercent) + '%';

                minValue.textContent = minVal;
                maxValue.textContent = maxVal;
            }

            minRange.addEventListener('input', updateSlider);
            maxRange.addEventListener('input', updateSlider);
            updateSlider();
        }

        // Initialize all range sliders
        initRangeSlider('minRange1', 'maxRange1', 'rangeFill1', 'minValue1', 'maxValue1');
        initRangeSlider('minRange2', 'maxRange2', 'rangeFill2', 'minValue2', 'maxValue2');
        initRangeSlider('minRange3', 'maxRange3', 'rangeFill3', 'minValue3', 'maxValue3');
        initRangeSlider('minRange4', 'maxRange4', 'rangeFill4', 'minValue4', 'maxValue4');
        initRangeSlider('minRange5', 'maxRange5', 'rangeFill5', 'minValue5', 'maxValue5');

        // Initialize mobile range sliders
        initRangeSlider('minRangeMobile1', 'maxRangeMobile1', 'rangeFillMobile1', 'minValueMobile1', 'maxValueMobile1');

        // Close filter on escape key
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeFilter();
            }
        });

        // Pagination functionality
        document.querySelectorAll('.travel-packages-section .pagination .page-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                if (!this.parentElement.classList.contains('disabled')) {
                    document.querySelector('.travel-packages-section .pagination .page-item.active')?.classList.remove('active');
                    this.parentElement.classList.add('active');
                }
            });
        });

        // Card hover effects
        document.querySelectorAll('.travel-packages-section .unique-package-card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.zIndex = '10';
            });

            card.addEventListener('mouseleave', function () {
                this.style.zIndex = '1';
            });
        });