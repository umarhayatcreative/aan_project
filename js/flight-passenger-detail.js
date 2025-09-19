datePicker

 flatpickr("#datePicker", {
            dateFormat: "d/m/Y",
            maxDate: "today",
            yearRange: [1920, new Date().getFullYear()],
            defaultDate: null,
            placeholder: "Date of Birth*"
        });
