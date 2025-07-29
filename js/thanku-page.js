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

// inovice download button start
document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.querySelector('.download-btn');

    downloadBtn.addEventListener('click', function () {
        // Show loading state
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generating...';
        this.disabled = true;

        // Simulate download process
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check me-2"></i>Downloaded!';
            this.classList.remove('download-btn');
            this.classList.add('btn-success');
        

            // Reset after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('btn-success');
                this.classList.add('download-btn');
                this.disabled = false;
            }, 2000);
        }, 1500);

        // In a real application, you would trigger the actual download here
        // window.print(); // For printing
        // or generate and download PDF
    });
});

// inovice download button end