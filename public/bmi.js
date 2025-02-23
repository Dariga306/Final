document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("bmi-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const weight = document.getElementById("weight").value.trim();
        const height = document.getElementById("height").value.trim();

        if (!weight || !height || isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert("Please enter valid weight and height.");
            return;
        }

        try {
            const response = await fetch("/bmi/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ weight, height })
            });

            const data = await response.json();
            if (data.error) {
                alert("Error: " + data.error);
                return;
            }

            document.getElementById("bmi-result").innerText = `Your BMI is: ${data.bmi} (${data.category})`;
        } catch (error) {
            alert("Error calculating BMI. Please try again.");
        }
    });
});
