

// header fixed
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-scroll");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
// header fixed

// our review sec start
// Auto-play carousel with pause on hover
const carousel = document.querySelector('#reviewCarousel');
const carouselInstance = new bootstrap.Carousel(carousel, {
  interval: 5000,
  wrap: true,
});

// Pause on hover
carousel.addEventListener('mouseenter', () => {
  carouselInstance.pause();
});

carousel.addEventListener('mouseleave', () => {
  carouselInstance.cycle();
});

// Dynamic Carousel Indicators
document.addEventListener('DOMContentLoaded', function () {
  const reviewCards = document.querySelectorAll('.review-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 200);
      }
    });
  });

  reviewCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
});

// our review sec start



// log-in sign-in modal start

        function togglePassword() {
            const passwordInput = document.getElementById('passwordInput');
            const passwordToggleIcon = document.getElementById('passwordToggleIcon');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordToggleIcon.classList.remove('fa-eye');
                passwordToggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordToggleIcon.classList.remove('fa-eye-slash');
                passwordToggleIcon.classList.add('fa-eye');
            }
        }

        function toggleSignupPassword() {
            const passwordInput = document.getElementById('signupPasswordInput');
            const passwordToggleIcon = document.getElementById('signupPasswordToggleIcon');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordToggleIcon.classList.remove('fa-eye');
                passwordToggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordToggleIcon.classList.remove('fa-eye-slash');
                passwordToggleIcon.classList.add('fa-eye');
            }
        }

        function toggleNewPassword() {
            const passwordInput = document.getElementById('newPasswordInput');
            const passwordToggleIcon = document.getElementById('newPasswordToggleIcon');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordToggleIcon.classList.remove('fa-eye');
                passwordToggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordToggleIcon.classList.remove('fa-eye-slash');
                passwordToggleIcon.classList.add('fa-eye');
            }
        }

        function toggleConfirmPassword() {
            const passwordInput = document.getElementById('confirmPasswordInput');
            const passwordToggleIcon = document.getElementById('confirmPasswordToggleIcon');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                passwordToggleIcon.classList.remove('fa-eye');
                passwordToggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                passwordToggleIcon.classList.remove('fa-eye-slash');
                passwordToggleIcon.classList.add('fa-eye');
            }
        }

        // OTP input functionality
        function handleOtpInput() {
            const otpInputs = document.querySelectorAll('.otp-input');

            otpInputs.forEach((input, index) => {
                input.addEventListener('input', function () {
                    if (this.value.length === 1 && index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    }
                });

                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Backspace' && !this.value && index > 0) {
                        otpInputs[index - 1].focus();
                    }
                });

                // Only allow numeric input
                input.addEventListener('keypress', function (e) {
                    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(e.key)) {
                        e.preventDefault();
                    }
                });
            });
        }

        // Initialize OTP inputs when modal is shown
        document.getElementById('otpModal').addEventListener('shown.bs.modal', function () {
            handleOtpInput();
            document.querySelector('.otp-input').focus();
        });

        // Form submission handlers
        document.querySelector('#loginModal form').addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Login form submitted! (This is just a demo)');
        });

        document.querySelector('#signupForm').addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Sign up form submitted! (This is just a demo)');
        });

        document.querySelector('#forgotPasswordForm').addEventListener('submit', function (e) {
            e.preventDefault();

            // Get the email value to validate
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput.value) {
                alert('Please enter your email address.');
                return;
            }

            // Hide current modal and show OTP modal
            const forgotModal = document.getElementById('forgotPasswordModal');
            const otpModal = document.getElementById('otpModal');

            // Use Bootstrap modal methods correctly
            const bsForgotModal = bootstrap.Modal.getInstance(forgotModal) || new bootstrap.Modal(forgotModal);
            const bsOtpModal = bootstrap.Modal.getInstance(otpModal) || new bootstrap.Modal(otpModal);

            bsForgotModal.hide();

            // Wait for the modal to fully hide before showing the next one
            forgotModal.addEventListener('hidden.bs.modal', function () {
                bsOtpModal.show();
            }, { once: true });
        });

        document.querySelector('#otpForm').addEventListener('submit', function (e) {
            e.preventDefault();

            // Get OTP values
            const otpInputs = document.querySelectorAll('.otp-input');
            let otpValue = '';
            otpInputs.forEach(input => {
                otpValue += input.value;
            });

            if (otpValue.length === 6) {
                // Hide current modal and show new password modal
                const otpModal = document.getElementById('otpModal');
                const newPasswordModal = document.getElementById('newPasswordModal');

                const bsOtpModal = bootstrap.Modal.getInstance(otpModal) || new bootstrap.Modal(otpModal);
                const bsNewPasswordModal = bootstrap.Modal.getInstance(newPasswordModal) || new bootstrap.Modal(newPasswordModal);

                bsOtpModal.hide();

                // Wait for the modal to fully hide before showing the next one
                otpModal.addEventListener('hidden.bs.modal', function () {
                    bsNewPasswordModal.show();
                }, { once: true });
            } else {
                alert('Please enter all 6 digits of the OTP code.');
            }
        });

        document.querySelector('#newPasswordForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const newPassword = document.getElementById('newPasswordInput').value;
            const confirmPassword = document.getElementById('confirmPasswordInput').value;

            if (newPassword !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }

            if (newPassword.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            // Show success message
            alert('Password updated successfully! You can now login with your new password.');

            // Clear the form fields
            document.getElementById('newPasswordInput').value = '';
            document.getElementById('confirmPasswordInput').value = '';

            // Close current modal and open login modal
            const newPasswordModal = document.getElementById('newPasswordModal');
            const loginModal = document.getElementById('loginModal');

            // Use Bootstrap modal methods
            const bsNewPasswordModal = bootstrap.Modal.getInstance(newPasswordModal);
            const bsLoginModal = new bootstrap.Modal(loginModal);

            // Close current modal
            bsNewPasswordModal.hide();

            // Wait a bit then show login modal
            setTimeout(function () {
                bsLoginModal.show();
                // Clear any existing login form data
                const loginForm = document.querySelector('#loginModal form');
                if (loginForm) {
                    loginForm.reset();
                }
            }, 500);
        });

        // Resend OTP functionality
        document.getElementById('resendOtp').addEventListener('click', function (e) {
            e.preventDefault();
            alert('OTP has been resent to your email!');

            // Clear OTP inputs
            document.querySelectorAll('.otp-input').forEach(input => {
                input.value = '';
            });
            document.querySelector('.otp-input').focus();
        });


// log-in sign-in modal end




// Cart Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartToggleBtn = document.querySelector('.cart-toggle-btn');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const closeBtn = document.querySelector('.dropdown-close-btn');

    // Debug logging
    console.log('Cart elements:', {
        cartToggleBtn: cartToggleBtn,
        cartDropdown: cartDropdown,
        closeBtn: closeBtn
    });

    if (!cartToggleBtn || !cartDropdown || !closeBtn) {
        console.error('Some cart elements are missing');
        return;
    }

    let isCartOpen = false;

    // Toggle cart dropdown on cart icon click
    cartToggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        isCartOpen = !isCartOpen;
        
        if (isCartOpen) {
            cartDropdown.classList.remove('d-none');
            console.log('Cart opened');
        } else {
            cartDropdown.classList.add('d-none');
            console.log('Cart closed');
        }
    });

    // Close dropdown when close button is clicked
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        cartDropdown.classList.add('d-none');
        isCartOpen = false;
        console.log('Cart closed via close button');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!cartDropdown.contains(e.target) && !cartToggleBtn.contains(e.target)) {
            cartDropdown.classList.add('d-none');
            isCartOpen = false;
            console.log('Cart closed via outside click');
        }
    });
});








 $(document).ready(function(){
    $('.card-slider').owlCarousel({
      loop: true,
      margin: 15,
      nav: true,
      autoplay: true,
      autoplayTimeout: 3000,
      smartSpeed: 800,
      navText: ['<span class="prev">‹</span>', '<span class="next">›</span>'],
      responsive:{
        0:{ items:1 },
        576:{ items:2 },
        768:{ items:2 },
        992:{ items:3 },
     1200:{ items:4 }
      },
      slideBy: 1
    });
  });
