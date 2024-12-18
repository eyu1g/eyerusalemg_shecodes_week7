function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let cityElement = document.querySelector("#current-city");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let weatherDescriptionElement = document.querySelector("#weather-description");
    let weatherIconElement = document.querySelector("#weather-icon-image");

    let temperature = Math.round(response.data.temperature.current);
    let city = response.data.city;
    let humidity = response.data.temperature.humidity;
    let windSpeed = Math.round(response.data.wind.speed) + " km/h"; // Ensure the API response unit
    let weatherDescription = response.data.condition.description;

    // Correctly referencing the icon URL
    let weatherIconUrl = response.data.condition.icon; // Make sure this is a valid image URL

    cityElement.innerHTML = city;
    temperatureElement.innerHTML = temperature;
    humidityElement.innerHTML = humidity + "%";
    windSpeedElement.innerHTML = windSpeed;
    weatherDescriptionElement.innerHTML = weatherDescription;

    // Set the weather icon
    weatherIconElement.src = weatherIconUrl; // Set the icon URL
    weatherIconElement.alt = weatherDescription; // Set the alt text
    weatherIconElement.style.display = "block"; // Ensure the image is displayed
}

function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;

    let apiKey = "b2a5adcct04b33178913oc335f405433"; // Replace with your own API key
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl)
        .then(displayTemperature)
        .catch(error => {
            alert("City not found. Please try again.");
            console.error("Error fetching data:", error);
        });
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);