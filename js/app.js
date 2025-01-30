$(document).ready(function () {
    const apiKey = '73bed296685ec16257c4f6902d8ff580'; // Keep this secure
    let selectedCity = '';

    // City autocomplete event listener
    $('#city-input').on('input', function () {
        const query = $(this).val().trim();
        if (query.length > 2) {
            getCitySuggestions(query);
        } else {
            $('#suggestions').empty().hide();
        }
    });

    // Fetch city suggestions from OpenWeather's Geo API
    function getCitySuggestions(query) {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;

        $.get(geoUrl, function (data) {
            let suggestionsHtml = '';
            if (data.length > 0) {
                data.forEach(city => {
                    const cityDisplay = `${city.name}, ${city.state || ''}, ${city.country}`.replace(/, ,/g, ',').trim();
                    suggestionsHtml += `<li class="suggestion-item" data-city="${city.name}" data-country="${city.country}" data-state="${city.state || ''}">${cityDisplay}</li>`;
                });
                $('#suggestions').html(suggestionsHtml).show();
            } else {
                $('#suggestions').hide();
            }
        }).fail(function () {
            $('#suggestions').hide();
        });
    }

    // Select city from autocomplete
    $(document).on('click', '.suggestion-item', function () {
        selectedCity = $(this).data('city');
        const state = $(this).data('state');
        const country = $(this).data('country');
        $('#city-input').val(`${selectedCity}, ${state ? state + ', ' : ''}${country}`);
        $('#suggestions').empty().hide();
    });

    // Fetch weather when search is clicked
    $('#search-button').click(function () {
        const cityInput = $('#city-input').val().trim();
        const unit = $('#unit-select').val();
        if (cityInput) {
            getWeather(cityInput, unit);
        }
    });

    function getWeather(city, unit) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${unit}`;

        $.get(url, function (data) {
            displayWeather(data, unit);
        }).fail(function () {
            $('#weather-info').html('<p class="text-danger">City not found. Please try again.</p>');
        });
    }

    function displayWeather(data, unit) {
        const tempUnit = unit === 'metric' ? '°C' : '°F';
        const windUnit = unit === 'metric' ? 'm/s' : 'mph';
        const windSpeed = unit === 'imperial' ? (data.list[0].wind.speed * 2.237).toFixed(2) : data.list[0].wind.speed;
        const dailyData = getDailyHighLow(data.list);
        const locationInfo = `${data.city.name}, ${data.city.state || data.city.country}`;
        const description = data.list[0].weather[0].description;

        const recommendation = getClothingRecommendation(dailyData.high, dailyData.low, unit, description);
        const contrastMessage = checkDayNightContrast(dailyData.high, dailyData.low, unit);

        updateBackground(description); // Dynamic background based on weather

        const weatherInfo = `
            <div class="card mt-3 animate__fadeIn">
                <div class="card-body">
                    <h2 class="card-title">${locationInfo}</h2>
                    <p><i class="fas fa-temperature-high"></i> Daily High: ${dailyData.high}${tempUnit}</p>
                    <p><i class="fas fa-temperature-low"></i> Daily Low: ${dailyData.low}${tempUnit}</p>
                    <p><i class="fas fa-cloud"></i> Weather: ${description}</p>
                    <p><i class="fas fa-tint"></i> Humidity: ${data.list[0].main.humidity}%</p>
                    <p><i class="fas fa-wind"></i> Wind Speed: ${windSpeed} ${windUnit}</p>
                    <p>${contrastMessage}</p>
                    <p>${recommendation}</p>
                </div>
            </div>
        `;

        $('#weather-info').html(weatherInfo).addClass('animate__fadeIn');
    }

    function getDailyHighLow(list) {
        let high = -Infinity, low = Infinity;
        list.forEach(entry => {
            high = Math.max(high, entry.main.temp_max);
            low = Math.min(low, entry.main.temp_min);
        });
        return { high, low };
    }

    function checkDayNightContrast(high, low, unit) {
        let tempHighC = unit === 'imperial' ? (high - 32) * 5 / 9 : high;
        let tempLowC = unit === 'imperial' ? (low - 32) * 5 / 9 : low;
        let difference = tempHighC - tempLowC;

        if (difference >= 15) {
            return '<i class="fas fa-exclamation-triangle"></i> **Warning:** The temperature drops significantly at night! Consider bringing layers.';
        }
        return '';
    }

    function getClothingRecommendation(tempMax, tempMin, unit, description) {
        let tempMaxCelsius = unit === 'imperial' ? (tempMax - 32) * 5 / 9 : tempMax;
        let recommendation = '';

        if (tempMaxCelsius < -7) {
            recommendation = '<i class="fas fa-snowflake"></i> **Extremely cold!** Heavy coat, gloves, scarf, and hat required.';
        } else if (tempMaxCelsius < 4) {
            recommendation = '<i class="fas fa-snowflake"></i> **Very cold.** Wear a warm coat, pants, gloves, and a scarf.';
        } else if (tempMaxCelsius < 15) {
            recommendation = '<i class="fas fa-cloud"></i> **Chilly.** Jacket, sweater, and jeans recommended.';
        } else if (tempMaxCelsius < 27) {
            recommendation = '<i class="fas fa-sun"></i> **Mild weather.** Light clothing like a t-shirt and jeans is fine.';
        } else if (tempMaxCelsius < 38) {
            recommendation = '<i class="fas fa-fire"></i> **Warm.** Wear shorts, a tank top, and stay hydrated.';
        } else {
            recommendation = '<i class="fas fa-temperature-high"></i> **Extremely hot!** Stay hydrated, wear breathable clothing.';
        }

        if (description.includes('rain')) {
            recommendation += ' <i class="fas fa-umbrella"></i> **Rain expected.** Bring an umbrella or wear waterproof clothing.';
        }
        if (description.includes('snow')) {
            recommendation += ' <i class="fas fa-snowman"></i> **Snow expected.** Wear waterproof boots and a heavy coat.';
        }
        if (description.includes('wind')) {
            recommendation += ' <i class="fas fa-wind"></i> **Windy.** Wear a windbreaker.';
        }
        if (description.includes('storm')) {
            recommendation += ' <i class="fas fa-bolt"></i> **Storm warning!** Stay indoors if possible.';
        }

        return recommendation;
    }

    function updateBackground(description) {
        let body = document.body;
        body.className = "";

        if (description.includes("clear")) body.classList.add("sunny-bg");
        else if (description.includes("cloud")) body.classList.add("cloudy-bg");
        else if (description.includes("rain")) body.classList.add("rainy-bg");
        else if (description.includes("snow")) body.classList.add("snowy-bg");
        else body.classList.add("night-bg");
    }
});
