flatpickr("#expiryDate", {
    dateFormat: "m/y",
    minDate: "today",
    plugins: [new monthSelectPlugin({
        shorthand: true,
        dateFormat: "m/y",
        theme: "light"
    })]
});