const express = require("express");
const router = express.Router();

router.post("/calculate", (req, res) => {
    let { weight, height } = req.body;

    weight = parseFloat(weight);
    height = parseFloat(height);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    res.json({ bmi, category });
});

module.exports = router;
