$(document).ready(function() {
    $('#search-button').click(function() {
        const cityInput = $('#city-input').val().trim();
        const unit = $('#unit-select').val();
        if (cityInput) {
            getWeather(cityInput, unit);
        }
    });

    function getWeather(city, unit) {
        const apiKey = '73bed296685ec16257c4f6902d8ff580'; // Move to a secure location

        // Format city for the API request
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${unit}`;

        $.get(url, function(data) {
            displayWeather(data, unit);
        }).fail(function() {
            $('#weather-info').html('<p class="text-danger">City not found. Please try again.</p>');
        });
    }

    function displayWeather(data, unit) {
        const tempUnit = unit === 'metric' ? '°C' : '°F';
        const windUnit = unit === 'metric' ? 'm/s' : 'mph';
        const windSpeed = unit === 'imperial' ? (data.list[0].wind.speed * 2.237).toFixed(2) : data.list[0].wind.speed;
        const dailyData = getDailyHighLow(data.list);
        const locationInfo = getLocationInfo(data.city);
        const weatherInfo = `
            <div class="card mt-3 animate__fadeIn">
                <div class="card-body">
                    <h2 class="card-title">${data.city.name}, ${locationInfo}</h2>
                    <p><i class="fas fa-temperature-high"></i> Daily High: ${dailyData.high}${tempUnit}</p>
                    <p><i class="fas fa-temperature-low"></i> Daily Low: ${dailyData.low}${tempUnit}</p>
                    <p><i class="fas fa-cloud"></i> Weather: ${data.list[0].weather[0].description}</p>
                    <p><i class="fas fa-tint"></i> Humidity: ${data.list[0].main.humidity}%</p>
                    <p><i class="fas fa-wind"></i> Wind Speed: ${windSpeed} ${windUnit}</p>
                    <p>${getClothingRecommendation(dailyData.high, dailyData.low, unit, data.list[0].weather[0].description)}</p>
                </div>
            </div>
        `;
        $('#weather-info').html(weatherInfo).addClass('animate__fadeIn');
    }

    function getDailyHighLow(list) {
        let high = -Infinity;
        let low = Infinity;

        list.forEach(entry => {
            if (entry.main.temp_max > high) {
                high = entry.main.temp_max;
            }
            if (entry.main.temp_min < low) {
                low = entry.main.temp_min;
            }
        });

        return { high, low };
    }

    function getLocationInfo(city) {
        // Assuming the data includes state for US cities and country for others
        if (city.country === 'US' && city.state) {
            return `${city.state}`;
        } else {
            return city.country;
        }
    }

    function getClothingRecommendation(tempMax, tempMin, unit, description) {
        let tempMaxCelsius = tempMax;
        let tempMinCelsius = tempMin;
        if (unit === 'imperial') {
            tempMaxCelsius = (tempMax - 32) * 5/9;
            tempMinCelsius = (tempMin - 32) * 5/9;
        }

        let recommendation = '';
        if (unit === 'imperial') {
            if (tempMax < 20) {
                recommendation = '<i class="fas fa-snowflake"></i> Extremely cold! Wear a heavy coat, thermal underwear, gloves, scarf, and a hat.';
            } else if (tempMax < 40) {
                recommendation = '<i class="fas fa-"></i> Very cold. Wear a warm coat, long pants, gloves, and a hat.';
            } else if (tempMax < 60) {
                recommendation = '<i class="fas fa-cloud"></i> Chilly weather. Wear a jacket, sweater, and jeans.';
            } else if (tempMax < 80) {
                recommendation = '<i class="fas fa-sun"></i> Mild weather. Wear light clothing like a t-shirt and jeans. Consider a light jacket in the morning or evening.';
            } else if (tempMax < 100) {
                recommendation = '<i class="fas fa-fire"></i> Warm. Wear shorts, a tank top or t-shirt, and sandals. Don\'t forget sunscreen.';
            } else {
                recommendation = '<i class="fas fa-temperature-high"></i> Extremely hot. Stay hydrated, wear a hat, sunglasses, and light, breathable fabrics.';
            }
        } else {
            if (tempMaxCelsius < -7) {
                recommendation = '<i class="fas fa-snowflake"></i> Extremely cold! Wear a heavy coat, thermal underwear, gloves, scarf, and a hat.';
            } else if (tempMaxCelsius < 4) {
                recommendation = '<i class="fas fa-snowflake"></i> Very cold. Wear a warm coat, long pants, gloves, and a scarf.';
            } else if (tempMaxCelsius < 15) {
                recommendation = '<i class="fas fa-cloud"></i> Chilly weather. Wear a jacket, sweater, and jeans.';
            } else if (tempMaxCelsius < 27) {
                recommendation = '<i class="fas fa-sun"></i> Mild weather. Wear light clothing like a t-shirt and jeans. Consider a light jacket in the morning or evening.';
            } else if (tempMaxCelsius < 38) {
                recommendation = '<i class="fas fa-fire"></i> Warm. Wear shorts, a tank top or t-shirt, and sandals. Don\'t forget sunscreen.';
            } else {
                recommendation = '<i class="fas fa-temperature-high"></i> Extremely hot. Stay hydrated, wear a hat, sunglasses, and light, breathable fabrics.';
            }
        }

        if (description.includes('rain')) {
            recommendation += ' <i class="fas fa-umbrella"></i> Rain is expected. Carry an umbrella or wear a waterproof jacket.';
        } else if (description.includes('snow')) {
            recommendation += `
                <div>
                    <i class="fas fa-snowman" style="display: block; font-size: 2em;"></i>
                    Snow is expected. Wear waterproof attire to stay warm.
                </div>`;
        }

        if (description.includes('wind')) {
            recommendation += ' <i class="fas fa-wind"></i> It\'s windy. Wear a windbreaker or a heavier jacket to protect yourself from the wind gusts.';
        }  

        return recommendation;
    }
});
