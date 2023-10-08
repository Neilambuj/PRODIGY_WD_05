const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const weatherInfo = document.querySelector(".weather-info");

searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    getWeatherData(location);
});

async function getWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY`);
        const data = await response.json();

        // Extract relevant weather information from the data
        const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
        const weatherDescription = data.weather[0].description;
        
        // Display the weather information on the page
        weatherInfo.innerHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Conditions: ${weatherDescription}</p>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherInfo.innerHTML = "<p>Unable to fetch weather data. Please try again later.</p>";
    }
}
