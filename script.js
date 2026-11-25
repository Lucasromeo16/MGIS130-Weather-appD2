const weatherDatabase = {
    "Rochester": {
        displayName: "Rochester, NY",
        theme: "rainy",
        temp: 52,
        feelsLike: 44,
        condition: "Cold & Rainy",
        windSpeed: 18,
        humidity: 82,
        uvIndex: 2,
        confidence: "Moderate",
        volatilityReason: "Moving frontal system coming across Lake Ontario",
        accuracyHistory: { avgError: "2.8°F", matchedRain: "91%" },
        hourly: [
            { hourNum: 9, time: "9:00 AM", temp: 48, rainProb: 75, wind: 16, cond: "Rain" },
            { hourNum: 11, time: "11:00 AM", temp: 50, rainProb: 60, wind: 18, cond: "Showers" },
            { hourNum: 13, time: "1:00 PM", temp: 52, rainProb: 35, wind: 17, cond: "Overcast" },
            { hourNum: 15, time: "3:00 PM", temp: 54, rainProb: 15, wind: 11, cond: "Cloudy" },
            { hourNum: 16, time: "4:00 PM", temp: 53, rainProb: 0, wind: 7, cond: "Clear Spells" },
            { hourNum: 17, time: "5:00 PM", temp: 51, rainProb: 0, wind: 6, cond: "Clear" }
        ],
        challenges: [
            "Get a 20-min run in at 4:00 PM before the evening chill sets in!",
            "Catch the sunset tonight around 5:15 PM during the dry break.",
            "Layer a wind-resistant shell over a breathable base for today's 18 mph gusts."
        ]
    },
    "Toronto": {
        displayName: "Toronto, ON",
        theme: "cloudy",
        temp: 56,
        feelsLike: 53,
        condition: "Calm & Partly Cloudy",
        windSpeed: 8,
        humidity: 60,
        uvIndex: 3,
        confidence: "High",
        volatilityReason: "Stable high-pressure ridge keeping rain away",
        accuracyHistory: { avgError: "1.9°F", matchedRain: "95%" },
        hourly: [
            { hourNum: 9, time: "9:00 AM", temp: 51, rainProb: 10, wind: 8, cond: "Cloudy" },
            { hourNum: 11, time: "11:00 AM", temp: 53, rainProb: 5, wind: 8, cond: "Partly Cloudy" },
            { hourNum: 13, time: "1:00 PM", temp: 56, rainProb: 5, wind: 9, cond: "Partly Cloudy" },
            { hourNum: 15, time: "3:00 PM", temp: 57, rainProb: 0, wind: 7, cond: "Clear" },
            { hourNum: 16, time: "4:00 PM", temp: 56, rainProb: 0, wind: 6, cond: "Clear" },
            { hourNum: 17, time: "5:00 PM", temp: 54, rainProb: 0, wind: 5, cond: "Clear" }
        ],
        challenges: [
            "Catch the sunset tonight along the waterfront while skies stay clear!",
            "Hit the outdoor pickleball courts at 3:00 PM—zero rain and light winds.",
            "Take a 30-minute brisk walk after class before dusk."
        ]
    },
    "Miami": {
        displayName: "Miami, FL",
        theme: "sunny",
        temp: 86,
        feelsLike: 93,
        condition: "Hot & Sunny",
        windSpeed: 8,
        humidity: 78,
        uvIndex: 9,
        confidence: "High",
        volatilityReason: "Typical tropical afternoon sea breeze",
        accuracyHistory: { avgError: "1.4°F", matchedRain: "88%" },
        hourly: [
            { hourNum: 9, time: "9:00 AM", temp: 81, rainProb: 10, wind: 6, cond: "Sunny" },
            { hourNum: 11, time: "11:00 AM", temp: 84, rainProb: 15, wind: 7, cond: "Sunny" },
            { hourNum: 13, time: "1:00 PM", temp: 87, rainProb: 20, wind: 8, cond: "Hot" },
            { hourNum: 15, time: "3:00 PM", temp: 88, rainProb: 35, wind: 9, cond: "Humid" },
            { hourNum: 16, time: "4:00 PM", temp: 85, rainProb: 10, wind: 7, cond: "Sunny" },
            { hourNum: 17, time: "5:00 PM", temp: 82, rainProb: 5, wind: 6, cond: "Golden Hour" }
        ],
        challenges: [
            "Catch the sunset tonight at 5:30 PM with golden skies!",
            "Get a 20-min run in at 9:00 AM before the midday UV index hits 9.",
            "Drink 3 full glasses of water before, during, and after any outdoor session."
        ]
    },
    "Seattle": {
        displayName: "Seattle, WA",
        theme: "snowy",
        temp: 31,
        feelsLike: 24,
        condition: "Snowing & Crisp",
        windSpeed: 12,
        humidity: 88,
        uvIndex: 1,
        confidence: "Very High",
        volatilityReason: "Cold Arctic air mass bringing steady light snow",
        accuracyHistory: { avgError: "1.2°F", matchedRain: "98%" },
        hourly: [
            { hourNum: 9, time: "9:00 AM", temp: 29, rainProb: 85, wind: 11, cond: "Snow" },
            { hourNum: 11, time: "11:00 AM", temp: 30, rainProb: 75, wind: 12, cond: "Snow" },
            { hourNum: 13, time: "1:00 PM", temp: 31, rainProb: 55, wind: 12, cond: "Flurries" },
            { hourNum: 15, time: "3:00 PM", temp: 33, rainProb: 25, wind: 9, cond: "Cold Mist" },
            { hourNum: 16, time: "4:00 PM", temp: 32, rainProb: 15, wind: 8, cond: "Overcast" },
            { hourNum: 17, time: "5:00 PM", temp: 29, rainProb: 50, wind: 10, cond: "Snow" }
        ],
        challenges: [
            "Step outside at 4:00 PM for a crisp 20-minute walk during the snow break!",
            "Wear waterproof boots, thermal socks, and insulated gloves today.",
            "Sip warm water or herbal tea after coming indoors from the cold."
        ]
    }
};

let currentCityKey = "Rochester";
let manualTheme = "auto";
let challengeIdx = 0;
let completedCount = 0;

document.addEventListener("DOMContentLoaded", function () {
    updateClock();
    setInterval(updateClock, 1000);
    renderDashboard();
});

function switchTab(tabId, clickedBtn) {
    document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    const target = document.getElementById(`tab-${tabId}`);
    if (target) target.classList.add('active');
    if (clickedBtn) clickedBtn.classList.add('active');
}

function updateClock() {
    const now = new Date();
    const options = {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const dtElement = document.getElementById('current-datetime');
    if (dtElement) {
        dtElement.innerText = now.toLocaleDateString('en-US', options);
    }
}

function changeCity(cityName) {
    currentCityKey = cityName;
    const data = weatherDatabase[currentCityKey];
    document.getElementById('current-city-name').innerText = data.displayName;

    // Sync Showdown City 1
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    if (city1Select) city1Select.value = cityName;
    if (city2Select && city2Select.value === cityName) {
        city2Select.value = cityName === "Toronto" ? "Rochester" : "Toronto";
    }

    challengeIdx = 0;
    renderDashboard();
}

function manualThemeChange(selectedTheme) {
    manualTheme = selectedTheme;
    applyActiveTheme();
}

function applyActiveTheme() {
    const data = weatherDatabase[currentCityKey];
    const themeToApply = manualTheme === "auto" ? data.theme : manualTheme;
    document.body.className = `theme-${themeToApply}`;
    renderWeatherEffects(themeToApply);
}

function renderWeatherEffects(theme) {
    const container = document.getElementById('weather-effects');
    if (!container) return;
    container.innerHTML = "";

    if (theme === "rainy") {
        for (let i = 0; i < 65; i++) {
            const drop = document.createElement('div');
            drop.className = 'raindrop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDuration = `${0.55 + Math.random() * 0.45}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            drop.style.opacity = `${0.35 + Math.random() * 0.5}`;
            container.appendChild(drop);
        }
    } else if (theme === "snowy") {
        for (let i = 0; i < 55; i++) {
            const flake = document.createElement('div');
            flake.className = 'snowflake';
            const size = 4 + Math.random() * 6;
            flake.style.width = `${size}px`;
            flake.style.height = `${size}px`;
            flake.style.left = `${Math.random() * 100}%`;
            flake.style.animationDuration = `${3.5 + Math.random() * 4.5}s`;
            flake.style.animationDelay = `${Math.random() * 3}s`;
            container.appendChild(flake);
        }
    } else if (theme === "sunny") {
        const sun = document.createElement('div');
        sun.className = 'sun-glow';
        container.appendChild(sun);
    } else if (theme === "cloudy") {
        for (let i = 0; i < 5; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud-puff';
            cloud.style.top = `${8 + i * 16}%`;
            cloud.style.width = `${220 + Math.random() * 160}px`;
            cloud.style.height = `${70 + Math.random() * 40}px`;
            cloud.style.animationDuration = `${26 + i * 7}s`;
            cloud.style.animationDelay = `-${i * 5}s`;
            container.appendChild(cloud);
        }
    }
}

function renderDashboard() {
    const data = weatherDatabase[currentCityKey];
    applyActiveTheme();

    // 1. Weather Reality Check
    const realityContainer = document.getElementById('reality-check-content');
    let explanation = "";
    if (data.temp <= 34) {
        explanation = `“It’s <strong>${data.temp}°F</strong> with snow and a ${data.windSpeed} mph breeze making it feel like <strong>${data.feelsLike}°F</strong> — bundle up in insulated layers.”`;
    } else if (data.temp - data.feelsLike >= 5) {
        explanation = `“It’s <strong>${data.temp}°F</strong>, but the ${data.windSpeed} mph wind may make it feel much cooler (around <strong>${data.feelsLike}°F</strong>) — bring an extra layer.”`;
    } else if (data.humidity > 75 && data.temp > 75) {
        explanation = `“It’s <strong>${data.temp}°F</strong>, and high humidity (${data.humidity}%) makes it feel like <strong>${data.feelsLike}°F</strong> — wear breathable gear and hydrate heavily.”`;
    } else {
        explanation = `“It’s <strong>${data.temp}°F</strong> with ${data.condition.toLowerCase()} — conditions feel comfortable and true to the thermometer.”`;
    }

    const precipIcon = data.theme === "snowy" ? "❄️" : "🌧️";
    realityContainer.innerHTML = `
        <div style="font-size: 2.2rem; font-weight: bold; margin-bottom: 6px;">
            ${data.temp}°F <span style="font-size: 1rem; opacity: 0.8; font-weight: normal;">(Feels like ${data.feelsLike}°F)</span>
        </div>
        <p style="margin-bottom: 14px; font-size: 0.96rem; line-height: 1.5;">${explanation}</p>
    `;

    const hourlyContainer = document.getElementById('hourly-forecast-container');
    hourlyContainer.innerHTML = data.hourly.map(h => `
        <div class="hourly-item">
            <div class="time">${h.time}</div>
            <div class="temp">${h.temp}°</div>
            <div class="condition">${h.rainProb}% ${precipIcon}</div>
        </div>
    `).join('');

    // 2. Daily Weather Challenge
    const challengeList = data.challenges;
    document.getElementById('challenge-text').innerText = `“${challengeList[challengeIdx % challengeList.length]}”`;

    // 3. Forecast Confidence & Honesty
    const confidenceContainer = document.getElementById('confidence-content');
    let barWidth = data.confidence === "Moderate" ? "62%" : data.confidence === "Very High" ? "96%" : "85%";

    confidenceContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: bold;">${data.confidence} Confidence</span>
            <span class="status-pill">${data.condition}</span>
        </div>
        <div class="confidence-bar-bg">
            <div class="confidence-bar-fill" style="width: ${barWidth};"></div>
        </div>
        <p style="font-size: 0.88rem; margin-top: 8px; color: var(--text-muted); line-height: 1.4;">
            <strong>Factor:</strong> ${data.volatilityReason}.
        </p>
    `;

    const honestyContainer = document.getElementById('honesty-content');
    honestyContainer.innerHTML = `
        <p style="font-size: 0.9rem; line-height: 1.45;">
            🛡️ <strong>Honesty Tracker:</strong> ${data.accuracyHistory.matchedRain} precipitation accuracy over the past 7 days (avg temp variance: <strong>${data.accuracyHistory.avgError}</strong>).
        </p>
    `;

    // 4. UV & Hydration Summary
    const uvContainer = document.getElementById('uv-hydration-content');
    let uvLabel = data.uvIndex >= 8 ? "Very High" : data.uvIndex >= 5 ? "Moderate" : "Low";
    let waterGoal = data.temp >= 80 ? "3 glasses before, during & after workouts (96 oz total)" : data.temp >= 55 ? "2 glasses before & after activity (72 oz total)" : "1–2 glasses before & after activity (64 oz total)";
    let uvTip = data.uvIndex >= 6
        ? "Apply SPF 30+ sunscreen and wear UV sunglasses before heading outside."
        : "Low UV levels today; focus on steady hydration and appropriate layering.";

    uvContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 8px;">
            <span><strong>UV Index:</strong> ${data.uvIndex} (${uvLabel})</span>
            <span class="status-pill">💧 ${waterGoal}</span>
        </div>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.45;">${uvTip}</p>
    `;

    // Refresh all interactive tabs
    calculatePerfectWindow();
    predictRegret();
    runShowdown();
    calculateLeaveBy();
}

function generateNewChallenge() {
    challengeIdx++;
    const data = weatherDatabase[currentCityKey];
    document.getElementById('challenge-text').innerText = `“${data.challenges[challengeIdx % data.challenges.length]}”`;
}

function completeChallenge() {
    completedCount++;
    document.getElementById('challenge-streak').innerText = `Completed today: ${completedCount} 🎉`;
    generateNewChallenge();
}

function calculatePerfectWindow() {
    const data = weatherDatabase[currentCityKey];
    const activity = document.getElementById('window-activity').value;
    const duration = parseInt(document.getElementById('window-duration').value, 10);
    const resultBox = document.getElementById('perfect-window-result');

    let bestIndex = 0;
    let lowestScore = 999;

    data.hourly.forEach((slot, idx) => {
        // Penalize rain/snow, high wind, and peak midday heat (>84F)
        const heatPenalty = slot.temp > 84 ? (slot.temp - 84) * 3 : 0;
        const score = slot.rainProb * 2 + slot.wind + heatPenalty;
        if (score < lowestScore) {
            lowestScore = score;
            bestIndex = idx;
        }
    });

    const bestSlot = data.hourly[bestIndex];
    const startHour = bestSlot.hourNum;
    const formatHour = (h) => h > 12 ? `${h - 12}:00 PM` : h === 12 ? "12:00 PM" : `${h}:00 AM`;

    let endText = "";
    if (duration === 20) {
        endText = `${formatHour(startHour)} – ${startHour > 12 ? startHour - 12 : startHour}:20 ${startHour >= 12 ? "PM" : "AM"}`;
    } else if (duration === 30) {
        endText = `${formatHour(startHour)} – ${startHour > 12 ? startHour - 12 : startHour}:30 ${startHour >= 12 ? "PM" : "AM"}`;
    } else if (duration === 60) {
        endText = `${formatHour(startHour)} – ${formatHour(startHour + 1)}`;
    } else {
        const nextHour = startHour + 1;
        endText = `${formatHour(startHour)} – ${nextHour > 12 ? nextHour - 12 : nextHour}:30 ${nextHour >= 12 ? "PM" : "AM"}`;
    }

    const windDesc = bestSlot.wind <= 10 ? "Lower wind" : `manageable ${bestSlot.wind} mph wind`;
    const precipWord = data.theme === "snowy" ? "snow" : "rain";
    const rainDesc = bestSlot.rainProb === 0 ? `no ${precipWord} expected` : `only ${bestSlot.rainProb}% chance of ${precipWord}`;

    // Outfit recommendations tailored to temperature + activity
    let outfitAdvice = "";
    if (bestSlot.temp <= 36) {
        outfitAdvice = `Thermal compression base layer, fleece mid-layer, windproof jacket, beanie, and grip gloves (high-traction sneakers for cold ground).`;
    } else if (bestSlot.temp <= 58) {
        outfitAdvice = `Moisture-wicking long-sleeve shirt, lightweight quarter-zip or hoodie, athletic joggers/shorts, and court/training shoes.`;
    } else if (bestSlot.temp <= 76) {
        outfitAdvice = `Breathable athletic t-shirt, lightweight shorts, crew socks, and supportive court/running shoes.`;
    } else {
        outfitAdvice = `Ultra-lightweight sweat-wicking tank or tee, breathable mesh shorts, UV sunglasses, cap, and sunscreen.`;
    }

    // Hydration plan tailored to heat + duration
    let hydrationAdvice = "";
    if (bestSlot.temp >= 80) {
        const glasses = duration >= 60 ? "3–4 glasses (24–32 oz)" : "3 glasses (24 oz)";
        hydrationAdvice = `<strong>Hot Weather Protocol:</strong> Drink <strong>${glasses}</strong> of water <strong>before</strong>, sip every 10–15 mins <strong>during</strong>, and drink <strong>3 glasses</strong> + electrolytes <strong>after</strong> your ${duration}-min ${activity}.`;
    } else if (bestSlot.temp >= 55) {
        const glasses = duration >= 60 ? "2–3 glasses (16–24 oz)" : "2 glasses (16 oz)";
        hydrationAdvice = `<strong>Moderate Weather Protocol:</strong> Drink <strong>${glasses}</strong> of water <strong>before</strong>, keep a bottle handy <strong>during</strong>, and drink <strong>2 glasses</strong> <strong>after</strong> your ${duration}-min ${activity}.`;
    } else {
        hydrationAdvice = `<strong>Cool/Cold Weather Protocol:</strong> Cold air masks thirst—drink <strong>1–2 glasses (12–16 oz)</strong> of water <strong>before</strong>, take small sips <strong>during</strong>, and drink <strong>2 glasses</strong> <strong>after</strong> your ${duration}-min ${activity}.`;
    }

    resultBox.innerHTML = `
        <div>
            <strong>“Best time for a ${duration}-min ${activity}: ${endText}. ${windDesc} (${bestSlot.wind} mph) and ${rainDesc} at ${bestSlot.temp}°F.”</strong>
        </div>
        <div class="detail-pill-row">
            <div class="detail-card">
                👕 <strong>What to Wear:</strong><br/>${outfitAdvice}
            </div>
            <div class="detail-card">
                💧 <strong>Hydration Plan:</strong><br/>${hydrationAdvice}
            </div>
        </div>
    `;
}

function predictRegret() {
    const data = weatherDatabase[currentCityKey];
    const activity = document.getElementById('regret-activity').value;
    const context = document.getElementById('regret-context').value;
    const resultBox = document.getElementById('regret-result');

    const activityLabels = {
        picnic: "picnic",
        pickleball: "pickleball match",
        basketball: "outdoor basketball session",
        lacrosse: "lacrosse practice",
        running: "long run",
        carwash: "car wash"
    };
    const label = activityLabels[activity] || "outdoor plans";

    let riskHeadline = `Outdoor plans risk: Low ✅`;
    let explanation = `Comfortable conditions (${data.temp}°F, ${data.windSpeed} mph wind) won't disrupt your ${label}.`;

    if (data.windSpeed >= 15 && (activity === "picnic" || activity === "pickleball" || activity === "lacrosse")) {
        riskHeadline = `“Outdoor plans risk: High. Wind gusts (${data.windSpeed} mph) may make your ${label} uncomfortable.”`;
        explanation = `Strong gusts will blow lightweight items around or affect ball flight, while ${data.humidity}% humidity adds a chill.`;
    } else if (data.theme === "snowy" && activity !== "running") {
        riskHeadline = `“Outdoor plans risk: High. Active snowfall and ${data.feelsLike}°F wind chill will disrupt your ${label}.”`;
        explanation = `Slick ground surfaces and freezing temperatures make outdoor court or picnic setups impractical.`;
    } else if (data.humidity >= 80 && (activity === "carwash" || activity === "pickleball" || activity === "basketball")) {
        riskHeadline = `“Outdoor plans risk: High. High rain chance and damp surfaces may disrupt your ${label}.”`;
        explanation = `High moisture (${data.humidity}%) creates slick courts or passing showers later today.`;
    } else if (data.temp >= 84 && (activity === "running" || activity === "lacrosse" || activity === "basketball")) {
        riskHeadline = `“Outdoor plans risk: Moderate. High heat index (${data.feelsLike}°F) may make your ${label} uncomfortable.”`;
        explanation = `High heat and UV (${data.uvIndex}) raise fatigue faster—schedule early or late and triple your water intake.`;
    }

    let destinationOutfit = "";
    if (context === "rink") {
        destinationOutfit = "🧥 <strong>Ice Rink Outfit:</strong> Insulated jacket or heavy fleece, jeans or sweatpants, and warm socks (rinks stay ~45°F inside).";
    } else if (context === "class") {
        destinationOutfit = "🎒 <strong>Class Outfit:</strong> Hoodie or zip-up over a breathable tee so you stay warm walking outside and comfortable in classrooms.";
    } else if (context === "outdoorsport") {
        destinationOutfit = `⚡ <strong>Park / Court Outfit:</strong> ${data.temp < 55 ? "Layered athletic top + windbreaker and high-grip sneakers." : "Moisture-wicking tee, athletic shorts, and court shoes."}`;
    } else {
        destinationOutfit = `👕 <strong>Everyday Outfit:</strong> Casual layers calibrated to the ${data.feelsLike}°F feels-like temperature.`;
    }

    resultBox.innerHTML = `
        <strong>${riskHeadline}</strong>
        <p style="font-size: 0.92rem; opacity: 0.94;">${explanation}</p>
        <div class="detail-card">${destinationOutfit}</div>
    `;
}

function runShowdown() {
    const city1Key = document.getElementById('city1').value;
    const city2Key = document.getElementById('city2').value;
    const city1Data = weatherDatabase[city1Key];
    const city2Data = weatherDatabase[city2Key];
    const activity = document.getElementById('showdown-activity').value;
    const resultBox = document.getElementById('showdown-result');

    if (city1Key === city2Key) {
        resultBox.innerHTML = `Pick two different cities above to compare their conditions!`;
        return;
    }

    const avgRain1 = city1Data.hourly.reduce((sum, h) => sum + h.rainProb, 0) / city1Data.hourly.length;
    const avgRain2 = city2Data.hourly.reduce((sum, h) => sum + h.rainProb, 0) / city2Data.hourly.length;

    const score1 = 100 - Math.abs(70 - city1Data.temp) - city1Data.windSpeed - avgRain1 * 0.5;
    const score2 = 100 - Math.abs(70 - city2Data.temp) - city2Data.windSpeed - avgRain2 * 0.5;

    const winner = score1 >= score2 ? city1Key : city2Key;
    const winnerData = score1 >= score2 ? city1Data : city2Data;
    const loserData = score1 >= score2 ? city2Data : city1Data;

    let reasons = [];
    if (winnerData.windSpeed < loserData.windSpeed) reasons.push("lower wind");
    if ((score1 >= score2 ? avgRain1 : avgRain2) < (score1 >= score2 ? avgRain2 : avgRain1)) reasons.push("less rain");
    if (Math.abs(70 - winnerData.temp) < Math.abs(70 - loserData.temp)) reasons.push("more comfortable temperatures");
    const reasonText = reasons.length > 0 ? reasons.join(" and ") : "better overall conditions";

    resultBox.innerHTML = `
        <strong>“${city1Key} vs ${city2Key}: ${winner} wins for ${activity} today because of ${reasonText}.”</strong>
        <div class="detail-pill-row">
            <div class="detail-card">
                📍 <strong>${city1Key}:</strong> ${city1Data.temp}°F (Feels ${city1Data.feelsLike}°F)<br/>
                💨 Wind: ${city1Data.windSpeed} mph • ${city1Data.condition}
            </div>
            <div class="detail-card">
                📍 <strong>${city2Key}:</strong> ${city2Data.temp}°F (Feels ${city2Data.feelsLike}°F)<br/>
                💨 Wind: ${city2Data.windSpeed} mph • ${city2Data.condition}
            </div>
        </div>
    `;
}

function calculateLeaveBy() {
    const data = weatherDatabase[currentCityKey];
    const selectedHour = parseInt(document.getElementById('leave-time').value, 10);
    const dest = document.getElementById('leave-dest').value.trim() || "your destination";
    const resultBox = document.getElementById('leave-result');

    const slotIndex = data.hourly.findIndex(h => h.hourNum === selectedHour);
    const currentSlot = slotIndex !== -1 ? data.hourly[slotIndex] : data.hourly[0];
    const earlierSlot = slotIndex > 0 ? data.hourly[slotIndex - 1] : null;
    const laterSlot = slotIndex < data.hourly.length - 1 ? data.hourly[slotIndex + 1] : null;
    const precipWord = data.theme === "snowy" ? "snow" : "rain";

    let advice = "";
    if (earlierSlot && currentSlot.rainProb - earlierSlot.rainProb >= 15) {
        advice = `“Leaving 20 minutes earlier for <strong>${dest}</strong> may help you avoid the forecast ${precipWord} (${currentSlot.rainProb}% chance at ${currentSlot.time} vs ${earlierSlot.rainProb}% earlier).”`;
    } else if (laterSlot && currentSlot.rainProb - laterSlot.rainProb >= 20) {
        advice = `“Waiting 20–30 minutes before leaving for <strong>${dest}</strong> lets the ${precipWord} chance drop from ${currentSlot.rainProb}% down to ${laterSlot.rainProb}%.”`;
    } else if (currentSlot.rainProb >= 50) {
        advice = `“Leaving 20 minutes earlier for <strong>${dest}</strong> is recommended — expect ${currentSlot.cond.toLowerCase()} (${currentSlot.rainProb}% chance) around ${currentSlot.time}.”`;
    } else {
        advice = `“Clear window to head to <strong>${dest}</strong> at ${currentSlot.time}! Only ${currentSlot.rainProb}% ${precipWord} chance and ${currentSlot.wind} mph wind.”`;
    }

    resultBox.innerHTML = `
        <strong>${advice}</strong>
        <div class="detail-card">
            🕒 <strong>Forecast around ${currentSlot.time}:</strong> ${currentSlot.temp}°F • ${currentSlot.cond} • Wind ${currentSlot.wind} mph
        </div>
    `;
}
