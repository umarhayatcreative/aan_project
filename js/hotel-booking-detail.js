
        
    
                   function scrollToRooms() {
      const roomsSection = document.getElementById('rooms');
      const navHeight = document.querySelector('.nav-tabs').offsetHeight;
      const headerOffset = 70;
      const elementPosition = roomsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      document.querySelector('.nav-link[href="#rooms"]').classList.add('active');
      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') !== '#rooms') {
          link.classList.remove('active');
        }
      });
    }

    function openMapModal() {
      const mapModal = new bootstrap.Modal(document.getElementById('mapModal'));
      mapModal.show();
    }

    function openInGoogleMaps() {
      window.open('https://www.google.com/maps?q=Dubai+Marina', '_blank');
    }

    function getDirections() {
      window.open('https://www.google.com/maps/dir/?api=1&destination=Dubai+Marina', '_blank');
    }

    function openGalleryModal() {
      const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
      galleryModal.show();
    }

    function goToSlide(index) {
      const carousel = bootstrap.Carousel.getInstance(document.getElementById('galleryModalCarousel'));
      carousel.to(index);

      const thumbnails = document.querySelectorAll('.thumbnail-strip img');
      thumbnails.forEach((thumb, i) => {
        if (i === index) {
          thumb.classList.add('active');
        } else {
          thumb.classList.remove('active');
        }
      });
    }

    document.getElementById('galleryModalCarousel').addEventListener('slide.bs.carousel', function (event) {
      const thumbnails = document.querySelectorAll('.thumbnail-strip img');
      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === event.to);
      });
    });

    // Tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ✅ Carousel with NORMAL SPEED
    var carouselList = [].slice.call(document.querySelectorAll('.carousel'));
    carouselList.map(function (carousel) {
      return new bootstrap.Carousel(carousel, {
        interval: 5000, // ✅ 5 seconds delay
        ride: 'carousel'
      });
    });
        

    
        
        document.addEventListener('DOMContentLoaded', function () {
            const navLinks = document.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    const offset = 80;
                    const targetPosition = targetSection.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                });
            });
        });



        /////////////////// 
        