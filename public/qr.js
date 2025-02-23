document.addEventListener("DOMContentLoaded", function () {
    console.log("QR script is loaded!");

    const form = document.getElementById("qr-form");
    const input = document.getElementById("url-input");
    const qrContainer = document.getElementById("qr-container");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const url = input.value.trim();
        if (!url) {
            alert("Enter a valid URL!");
            return;
        }

        fetch("/qr/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        })
        .then(response => response.json())
        .then(data => {
            if (data.qrCode) {
                qrContainer.innerHTML = `<img src="${data.qrCode}" alt="QR Code">`;
            } else {
                alert("Error generating QR code");
            }
        })
        .catch(error => console.error("Fetch error:", error));
    });
});
