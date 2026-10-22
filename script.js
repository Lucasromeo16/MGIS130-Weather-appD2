const weatherDatabase = {
    "Rochester": {
        theme: "rainy",
        temp: 52,
        feelsLike: 44,
        condition: "Light Rain & Wind",
        windSpeed: 18,
        humidity: 82,
        uvIndex: 2,
        confidence: "Moderate",
        volatilityReason: "Moving frontal system coming across Lake Ontario",
        accuracyHistory: { avgError: "2.8°F", matchedRain: "91%" },
        hourly: [
            { time: "9 AM", temp: 48, rainProb: 70, wind: 15, cond: "Rain" },
            { time: "11 AM", temp: 50, rainProb: 60, wind: 16, cond: "Showers" },
            { time: "1 PM", temp: 52, rainProb: 40, wind: 18, cond: "Overcast" },
            { time: "3 PM", temp: 54, rainProb: 10, wind: 12, cond: "Cloudy" },
            { time: "5 PM", temp: 53, rainProb: 0, wind: 8, cond: "Clear Spells" },
            { time: "7 PM", temp: 49, rainProb: 0, wind: 6, cond: "Clear" }
        ]},
    "Toronto": {
        theme: "cloudy",
        temp: 55,
        feelsLike: 52,
        condition: "Mostly Cloudy",
        windSpeed: 10,
        humidity: 65,
        uvIndex: 3,
        confidence: "High",
        volatilityReason: "Stable high-pressure ridge forming",
        accuracyHistory: { avgError: "1.9°F", matchedRain: "95%" },
        hourly: [
            { time: "9 AM", temp: 50, rainProb: 10, wind: 8, cond: "Cloudy" },
            { time: "11 AM", temp: 52, rainProb: 10, wind: 9, cond: "Cloudy" },
            { time: "1 PM", temp: 55, rainProb: 5, wind: 10, cond: "Partly Cloudy" },
            { time: "3 PM", temp: 56, rainProb: 5, wind: 10, cond: "Partly Cloudy" },
            { time: "5 PM", temp: 54, rainProb: 0, wind: 7, cond: "Clear" },
            { time: "7 PM", temp: 51, rainProb: 0, wind: 5, cond: "Clear" }
        ]
    },
    "Miami": {
        theme: "sunny",
        temp: 84,
        feelsLike: 91,condition: "Sunny & Humid",
        windSpeed: 8,
        humidity: 78,
        uvIndex: 9,
        confidence: "High",
        volatilityReason: "Typical tropical daytime heating patterns",
        accuracyHistory: { avgError: "1.4°F", matchedRain: "88%" },
        hourly: [
            { time: "9 AM", temp: 80, rainProb: 10, wind: 6, cond: "Sunny" },
            { time: "11 AM", temp: 83, rainProb: 15, wind: 7, cond: "Sunny" },
            { time: "1 PM", temp: 85, rainProb: 20, wind: 8, cond: "Hot" },
            { time: "3 PM", temp: 86, rainProb: 30, wind: 9, cond: "Humid" },
            { time: "5 PM", temp: 83, rainProb: 10, wind: 8, cond: "Sunny" },{ time: "7 PM", temp: 80, rainProb: 5, wind: 6, cond: "Warm Night" }
        ]
    },
    "Seattle": {
        theme: "rainy",
        temp: 49,
        feelsLike: 45,
        condition: "Persistent Drizzle",
        windSpeed: 12,
        humidity: 88,
        uvIndex: 1,
        confidence: "Very High",volatilityReason: "Consistent onshore marine flow",
        accuracyHistory: { avgError: "1.2°F", matchedRain: "98%" },
        hourly: [
            { time: "9 AM", temp: 46, rainProb: 80, wind: 10, cond: "Drizzle" },
            { time: "11 AM", temp: 48, rainProb: 75, wind: 11, cond: "Light Rain" },
            { time: "1 PM", temp: 49, rainProb: 60, wind: 12, cond: "Drizzle" },
            { time: "3 PM", temp: 50, rainProb: 50, wind: 10, cond: "Misty" },
            { time: "5 PM", temp: 48, rainProb: 40, wind: 8, cond: "Cloudy" },
            { time: "7 PM", temp: 46, rainProb: 30, wind: 7, cond: "Overcast" }
        ]
    }
};

let currentCityKey = "Rochester";

window.onload = function() {updateClock();
    setInterval(updateClock, 1000);
    renderDashboard();
};

function updateClock() {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('current-datetime').innerText = now.toLocaleDateString('en-US', options);
}

function changeCity(cityName) {
    currentCityKey = cityName;
    document.getElementById('current-city-name').innerText = `${cityName}`;
    document.getElementById('city1').value = cityName;
    renderDashboard();
}

function renderDashboard() {
    const data = weatherDatabase[currentCityKey];

    // Theme switching based on weather condition
    document.body.className = `theme-${data.theme}`;

    // Weather Reality Check section
    const realityContainer = document.getElementById('reality-check-content');let explanation = "";
    if (data.temp - data.feelsLike >= 5) {
        explanation = `It's currently <strong>${data.temp}°F</strong>, but the wind (${data.windSpeed} mph) will make it feel closer to <strong>${data.feelsLike}°F</strong>. Bring an extra layer!`;
    } else if (data.humidity > 75 && data.temp > 75) {
        explanation = `It's <strong>${data.temp}°F</strong>, but high humidity makes it feel like <strong>${data.feelsLike}°F</strong>. Stay hydrated!`;
    } else {
        explanation = `It's <strong>${data.temp}°F</strong> with ${data.condition.toLowerCase()}. The air feels comfortable and aligned with the actual temperature.`;
    }

    realityContainer.innerHTML = `
        <div style="font-size: 2rem; font-weight: bold; margin-bottom: 4px;">${data.temp}°F <span style="font-size: 1rem; opacity: 0.7; font-weight: normal;">(Feels like ${data.feelsLike}°F)</span></div>
        <p style="margin-bottom: 12px; font-size: 0.95rem;">${explanation}</p>
    `;

    // Hourly Forecast row
    const hourlyContainer = document.getElementById('hourly-forecast-container');
    hourlyContainer.innerHTML = data.hourly.map(h => `
        <div class="hourly-item">
            <div class="time">${h.time}</div>
            <div class="temp">${h.temp}°</div>
            <div class="condition">${h.rainProb}% 🌧️</div>
        </div>`).join('');

    // Forecast Confidence Meter
    const confidenceContainer = document.getElementById('confidence-content');
    let barWidth = "85%";
    if(data.confidence === "Moderate") barWidth = "60%";
    if(data.confidence === "Low") barWidth = "35%";

    confidenceContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: bold;">${data.confidence} Confidence</span>
            <span class="status-pill">${data.condition}</span>
        </div>
        <div class="confidence-bar-bg">
            <div class="confidence-bar-fill" style="width: ${barWidth};"></div>
        </div>
        <p style="font-size: 0.85rem; margin-top: 10px; color: var(--text-muted);">
            <strong>Why it could change:</strong> ${data.volatilityReason}.
        </p>
    `;// Weather App Honesty Score
    const honestyContainer = document.getElementById('honesty-content');
    honestyContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 8px;">
            <span style="font-size: 2rem; font-weight: bold; color: var(--accent);">${data.accuracyHistory.matchedRain}</span>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Rain Accuracy Rate</div>
        </div>
        <p style="font-size: 0.85rem; text-align: center;">
            Over the last 7 days, recorded forecasts in ${currentCityKey} averaged <strong>${data.accuracyHistory.avgError}</strong> away from actual observed temperatures.
        </p>
    `;

    // Refresh interactive card features
    calculatePerfectWindow();
    predictRegret();
    generateNewChallenge();
    calculateLeaveBy();
    runShowdown();
}

function calculatePerfectWindow() {const data = weatherDatabase[currentCityKey];
    const activity = document.getElementById('window-activity').value;
    const duration = document.getElementById('window-duration').value;
    const resultBox = document.getElementById('perfect-window-result');

    let bestSlot = data.hourly[0];
    let lowestScore = 999;

    data.hourly.forEach(slot => {
        let score = slot.rainProb * 2 + slot.wind;
        if(score < lowestScore) {
            lowestScore = score;
            bestSlot = slot;
        }
    });

    // Workout Outfit generator based on temperature and rain
    let workoutOutfit = "";
    if (bestSlot.temp < 45) {
        workoutOutfit = "👟 <strong>Outfit:</strong> Thermal compression base layer, windbreaker, leggings/track pants & lightweight gloves.";
    } else if (bestSlot.temp < 60) {
        workoutOutfit = "👟 <strong>Outfit:</strong> Long-sleeve performance tee, light hoodie or tech jacket, shorts/leggings.";
    } else if (bestSlot.temp < 75) {
        workoutOutfit = "👟 <strong>Outfit:</strong> Moisture-wicking short-sleeve shirt, shorts, and breathable socks.";
    } else {
        workoutOutfit = "👟 <strong>Outfit:</strong> Lightweight tank top, moisture-wicking shorts, cap/visor & sunscreen.";
    }

    if (bestSlot.rainProb > 30) {
        workoutOutfit += " 🌧️ <em>Water-resistant shell recommended!</em>";
    }

    resultBox.innerHTML = `
        <strong>Best time for a ${duration}-min ${activity}:</strong> around <strong>${bestSlot.time}</strong>.<br/>
