document.getElementById("email-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const to = document.getElementById("to").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!to || !subject || !message) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch("/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ to, subject, message }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Email sent successfully!");
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        alert("Failed to send email.");
    }
});
