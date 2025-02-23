document.getElementById("weatherForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`/weather?city=${city}`);
        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById("weather-result").innerHTML = "<p style='color:red;'>Error fetching data. Please try again.</p>";
    }
});

function displayWeather(data) {
    const { weather, airQuality, news } = data;

    document.getElementById("weather-result").innerHTML = `
        <h3>Weather Information</h3>
        <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="Weather Icon">
        <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
        <p><strong>Description:</strong> ${weather.description}</p>
        <p><strong>Feels Like:</strong> ${weather.feels_like}°C</p>
        <p><strong>Humidity:</strong> ${weather.humidity}%</p>
        <p><strong>Pressure:</strong> ${weather.pressure} hPa</p>
        <p><strong>Wind Speed:</strong> ${weather.wind_speed} m/s</p>
        <p><strong>Rain Volume (3h):</strong> ${weather.rain} mm</p>
        <p><strong>Country:</strong> ${weather.country}</p>
        <p><strong>Coordinates:</strong> Latitude ${weather.coordinates.lat}, Longitude ${weather.coordinates.lon}</p>
        
        <h3>Air Quality Information</h3>
        <p><strong>AQI:</strong> ${airQuality.aqi}</p>
        <p><strong>Main Pollutant:</strong> ${airQuality.mainPollutant}</p>
        <p><strong>Location:</strong> ${airQuality.location}</p>
        
        <h3>Related News</h3>
        ${news.length > 0 ? news.map(article => `<p><strong>${article.title}</strong></p><a href="${article.url}" target="_blank">Read more</a>`).join("<br>") : "<p>No news available.</p>"}
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weatherForm');
    const cityInput = document.getElementById('cityInput');
    const mapElement = document.getElementById('map');

    let map, marker;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (!city) return;
    
        try {
            const response = await fetch(`/weather?city=${city}`);
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            const data = await response.json();
    
            updateMap(data.weather.coordinates.lat, data.weather.coordinates.lon);
        } catch (error) {
            console.error(error.message);
        }
    });
    

    function updateMap(lat, lon) {
        const mapElement = document.getElementById("map");
        mapElement.classList.remove("hidden"); 
    
        if (!map) {
            map = L.map(mapElement).setView([lat, lon], 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Dariga',
            }).addTo(map);
            marker = L.marker([lat, lon]).addTo(map);
        } else {
            map.setView([lat, lon], 10);
            marker.setLatLng([lat, lon]);
        }
    }    
});
