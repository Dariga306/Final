const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");

router.post("/generate", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "No URL provided" });
        }

        const qrCode = await QRCode.toDataURL(url);
        res.json({ qrCode });
    } catch (error) {
        console.error("QR Code generation error:", error);
        res.status(500).json({ error: "Error generating QR code" });
    }
});

module.exports = router;
