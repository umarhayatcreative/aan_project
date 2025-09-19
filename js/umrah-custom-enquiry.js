   function selectOption(element, category, value) {
            // Remove selected class from all cards in the same category
            const categoryCards = element.parentElement.querySelectorAll('.option-card-custom');
            categoryCards.forEach(card => card.classList.remove('selected'));

            // Add selected class to clicked card
            element.classList.add('selected');

            // Store selection (you can use this data when submitting)
            element.setAttribute('data-selected', value);
        }

        // Form submission handler
        document.getElementById('bookingForm').addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(this);
            const selectedOptions = {};

            // Collect selected options
            document.querySelectorAll('.option-card-custom.selected').forEach(card => {
                // Find the closest section header to determine the category
                let categoryElement = card.closest('.row').previousElementSibling;
                let categoryText = '';
                if (categoryElement && categoryElement.querySelector('h3')) {
                    categoryText = categoryElement.querySelector('h3').textContent.toLowerCase().replace(' details', '').trim();
                } else {
                    // Fallback for sections without a direct previous section-header-custom
                    if (card.closest('.row').previousElementSibling && card.closest('.row').previousElementSibling.querySelector('h6')) {
                        categoryText = card.closest('.row').previousElementSibling.querySelector('h6').textContent.toLowerCase().replace(' accommodation', '').trim();
                    }
                }
                
                selectedOptions[categoryText] = card.getAttribute('data-selected');
            });

            // Log form data and selected options
            console.log('Form Data:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            console.log('Selected Options:', selectedOptions);

            // Show success message (you can replace this with actual form submission)
            alert('Booking request submitted successfully! We will contact you soon.');
        });

        // Add floating label animation
        document.querySelectorAll('.floating-label-custom input').forEach(input => {
            input.addEventListener('blur', function () {
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
            // Trigger blur on load if input already has a value (e.g., autofill)
            if (input.value) {
                input.classList.add('has-value');
            }
        });