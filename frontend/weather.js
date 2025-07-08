// Fetch the weather API key from server
async function getWeatherApiKey() {
  const response = await fetch('/weatherkey');
  const data = await response.json();
  return data.key;
}

// Function to save weather data to localStorage
function saveWeatherData(data) {
  const weatherData = {
    city: data.name,
    temp: data.main.temp,
  };

  // Save to localStorage
  localStorage.setItem("lastWeather", JSON.stringify(weatherData));
}

// Function to display weather data on the home page (index.html)
function displayWeatherOnHomePage() {
  const weatherData = JSON.parse(localStorage.getItem("lastWeather"));

  if (weatherData) {
    const liveWeatherDisplay = document.getElementById("liveWeatherDisplay");
    if (liveWeatherDisplay) {
      liveWeatherDisplay.innerHTML = `
        <p>🌤️ ${weatherData.city}, ${weatherData.temp}°C</p>
      `;
    }
  }
}

// Function to handle weather search on weather.html
async function getWeather() {
  const cityInput = document.getElementById("city");
  const weatherInfo = document.getElementById("weatherInfo");
  const loadingText = document.getElementById("loadingText");

  const city = cityInput.value.trim();
  const WEATHER_API_KEY = await getWeatherApiKey(); // 👈 fetch key dynamically

  if (!city) {
    weatherInfo.innerHTML = '<p style="color:red">Please enter a city name!</p>';
    weatherInfo.style.display = 'block';
    return;
  }

  loadingText.style.display = 'block';
  weatherInfo.style.display = 'none';

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('City not found!');
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    saveWeatherData(currentData); // Save data to localStorage

    loadingText.style.display = 'none';

    const { temp, humidity } = currentData.main;
    const { description } = currentData.weather[0];
    const windSpeed = currentData.wind.speed;

    let forecastHTML = "<h3>📅 3-Day Forecast</h3><ul>";

    for (let i = 0; i < forecastData.list.length; i += 8) {
      const forecast = forecastData.list[i];
      const date = new Date(forecast.dt * 1000).toDateString();
      forecastHTML += `
        <li>
          <strong>${date}</strong> - 🌡 ${forecast.main.temp}°C, 
          🌤 ${forecast.weather[0].description}
        </li>
      `;
    }
    forecastHTML += "</ul>";

    weatherInfo.innerHTML = `
      <h2>Weather in ${city}</h2>
      <p><strong>🌡 Temperature:</strong> ${temp}°C</p>
      <p><strong>🌤 Description:</strong> ${description}</p>
      <p><strong>💧 Humidity:</strong> ${humidity}%</p>
      <p><strong>🌬 Wind Speed:</strong> ${windSpeed} m/s</p>
      ${forecastHTML}
    `;
    weatherInfo.style.display = 'block';

  } catch (error) {
    loadingText.style.display = 'none';
    weatherInfo.innerHTML = `<p style="color:red">${error.message}</p>`;
    weatherInfo.style.display = 'block';
  }
}

// Event listeners depending on the page
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('index.html')) {
    displayWeatherOnHomePage();
  }

  if (window.location.pathname.endsWith('weather.html')) {
    const searchButton = document.getElementById('searchWeatherBtn');
    if (searchButton) {
      searchButton.addEventListener('click', getWeather);
    }
  }
});
