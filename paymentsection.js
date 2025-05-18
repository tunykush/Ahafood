// Format card number
document.getElementById("card-number").addEventListener("input", function () {
    let number = this.value.replace(/\D/g, "").slice(0, 16);  // Chỉ cho phép số
    let formattedNumber = number.replace(/(\d{4})(?=\d)/g, "$1 ");
    document.getElementById("card-number-display").textContent = formattedNumber.padEnd(19, "•");
    this.value = formattedNumber;
});

// Update card holder name (Chỉ cho phép chữ cái và khoảng trắng)
document.getElementById("name").addEventListener("input", function () {
    let name = this.value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
    document.getElementById("card-holder-display").textContent = name || "FULL NAME";
    this.value = name;
});

// Update expiry date (Chỉ cho phép số và /)
document.getElementById("expiry").addEventListener("input", function () {
    let expiry = this.value.replace(/\D/g, "").slice(0, 4);
    if (expiry.length >= 2) {
        expiry = expiry.slice(0, 2) + "/" + expiry.slice(2);
    }
    document.getElementById("expiry-display").textContent = expiry.padEnd(5, "•");
    this.value = expiry;
});

// Update CVC (Chỉ cho phép số)
document.getElementById("cvc").addEventListener("input", function () {
    let cvc = this.value.replace(/\D/g, "").slice(0, 3);
    document.getElementById("cvc-display").textContent = cvc.padEnd(3, "•");
    this.value = cvc;
});
