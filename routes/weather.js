const express = require("express");
const axios = require("axios");
const router = express.Router();

require("dotenv").config();
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const AIR_QUALITY_API_KEY = process.env.AIR_QUALITY_API_KEY;

router.get("/", async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    try {

        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        const weatherData = weatherResponse.data;

        const airQualityResponse = await axios.get(
            `https://api.airvisual.com/v2/nearest_city?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&key=${AIR_QUALITY_API_KEY}`
        );
        const airQualityData = airQualityResponse.data.data;

        const newsResponse = await axios.get(
            `https://newsapi.org/v2/everything?q=${city}&apiKey=${NEWS_API_KEY}`
        );
        const newsData = newsResponse.data.articles || [];

        res.json({
            weather: {
                temperature: weatherData.main.temp,
                description: weatherData.weather[0].description,
                icon: weatherData.weather[0].icon,
                feels_like: weatherData.main.feels_like,
                humidity: weatherData.main.humidity,
                pressure: weatherData.main.pressure,
                wind_speed: weatherData.wind.speed,
                rain: weatherData.rain ? weatherData.rain["3h"] : 0,
                country: weatherData.sys.country || "Unknown",
                coordinates: {
                    lat: weatherData.coord.lat,
                    lon: weatherData.coord.lon,
                },
            },
            airQuality: {
                aqi: airQualityData.current.pollution.aqius,
                mainPollutant: airQualityData.current.pollution.mainus,
                location: `${airQualityData.city}, ${airQualityData.state}, ${airQualityData.country}`,
            },
            news: newsData.slice(0, 3).map((article) => ({
                title: article.title,
                url: article.url,
            })),
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Error retrieving weather data" });
    }
});

module.exports = router;
