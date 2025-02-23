require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const weatherRoutes = require("./routes/weather");
const emailRoutes = require("./routes/email");
const qrRoutes = require("./routes/qr");
const bmiRoutes = require("./routes/bmi");

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);
app.use("/weather", weatherRoutes);
app.use("/email", emailRoutes);
app.use("/qr", qrRoutes);
app.use("/bmi", bmiRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
