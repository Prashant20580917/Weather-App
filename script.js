let weather = {
  apiKey: "fd680a4b1b783e9f27e4177aeb18d1fa",
  imageMapping: {
    // Gedling: "https://images.pexels.com/photos/1257860/pexels-photo-1257860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    // // Add more city-image mappings here
  },
  fetchWeather: function (city) {
    // Fetch current weather data from API
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        this.displayWeather(data);
        
          this.fetch7DayForecast(city); // Fetch 7-day forecast data for Gedling
        }
      );

    // Fetch forecast data from your PHP script
    this.fetchForecastDataFromDB(city);
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");

    // Update the forecast title based on the city name
    document.querySelector(".forecast-title").innerText =
      "Weather Update  of " + name;

    // const backgroundImageUrl = this.imageMapping[name];
    // if (backgroundImageUrl) {
    //   document.body.style.backgroundImage = "url('" + backgroundImageUrl + "')";
    // } else {
    //   document.body.style.backgroundImage =
    //     "url('https://source.unsplash.com/1600x900/?" + name + "')";
    // }
  },
  fetch7DayForecast: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          // alert("No forecast data found.");
          // throw new Error("No forecast data found.");
        }
        return response.json();
      })
      .then((data) => this.display7DayForecast(data.list)); // Display 7-day forecast data
  },
  fetchForecastDataFromDB: function (city) {
    // Fetch forecast data from database using your PHP script
    fetch("http://localhost/WeatherApp/fetch_forecast.php")
      .then((response) => response.json())
      .then((data) => this.display7DayForecast(data))
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  },
  display7DayForecast: function (forecastData) {
    const forecastContainer = document.querySelector(".forecast-days");
    forecastContainer.innerHTML = ""; // Clear existing content

    const daysMap = new Map();

    // Loop through the forecast data and organize by days
    forecastData.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });

      if (!daysMap.has(day)) {
        daysMap.set(day, forecast);
      }
    });

    // Create forecast cards for each day
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    daysOfWeek.forEach((dayOfWeek) => {
      const forecast = daysMap.get(dayOfWeek);
      if (forecast) {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = forecast.main.temp;
        const icon = forecast.weather[0].icon;

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");
        forecastCard.innerHTML = `
          <div>${day}</div>
          <img src="https://openweathermap.org/img/wn/${icon}.png" alt="" />
          <div>${temp}°C</div>
        `;

        forecastContainer.appendChild(forecastCard);
      }
    });
  },
  search: function () {
    const cityName = document.querySelector(".search-bar").value;
    this.fetchWeather(cityName);
  },
};

// Event listener for search button click
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// Event listener for Enter key press in search bar
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

// Reset the search input value when the page loads
window.onload = function () {
  document.querySelector(".search-bar").value = "";
  updateForecastData("Gedling"); 
};

// Fetch weather for the default city (Gedling) and its 7-day forecast
weather.fetchWeather("Gedling");
weather.fetch7DayForecast();

// Add function 
function updateForecastData() {
  fetch("http://localhost/WeatherApp/update_forecast.php") // URL to match the actual path to PHP script
      .then(() => {
          console.log("Forecast data updated.");
      })
      .catch((error) => {
          console.error("Error updating forecast data:", error);
      });
}

// Update forecast data when the webpage loads
updateForecastData();


//********UPDATE DATABASE ********//
//**************LOCAL STORAGE 1********* */
// Function to fetch and store weather data in local storage
function fetchAndStoreWeatherData(city) {
  const apiKey = "fd680a4b1b783e9f27e4177aeb18d1fa";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => {
      // Send the weather data to the PHP script for insertion
      sendWeatherDataToServer(data);
      displayWeather(data);

      // Store weather data in local storage
      const lowercaseCity = city.toLowerCase();
      localStorage.setItem(lowercaseCity, JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to send weather data to the server (PHP script)
function sendWeatherDataToServer(data) {
  fetch("store_weather.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.error("Error sending weather data to server:", error);
    });
}

// ...


//**************LOCAL STORAGE 2.0********* */
// Function to display weather data
function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  // Update the HTML elements with the weather data
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = temp + "°C";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";

  
  document.querySelector(".weather").classList.remove("loading");

  
  // const backgroundImageUrl = weather.imageMapping[name];
  // if (backgroundImageUrl) {
  //   document.body.style.backgroundImage = "url('" + backgroundImageUrl + "')";
  // } else {
  //   document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
  // }
}

// Function to load weather data from local storage and display it
function loadWeatherDataFromLocalStorage(city) {
  const lowercaseCity = city.toLowerCase();
  const storedWeatherData = localStorage.getItem(lowercaseCity);
  if (storedWeatherData) {
    const weatherData = JSON.parse(storedWeatherData);
    displayWeather(weatherData);
 
  }
}

// Add event listener for search button click
document.querySelector(".search button").addEventListener("click", function () {
  const searchedCity = document.querySelector(".search-bar").value;
  
  // Check if there is no double entry for the same date
  const lowercaseCity = searchedCity.toLowerCase();
  const storedWeatherData = localStorage.getItem(lowercaseCity);
  if (!storedWeatherData) {
    fetchAndStoreWeatherData(searchedCity);
  }
  
  loadWeatherDataFromLocalStorage(searchedCity);
});

// Add event listener for Enter key press in search bar
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const searchedCity = document.querySelector(".search-bar").value;

    // Check if there is no double entry for the same date
    const lowercaseCity = searchedCity.toLowerCase();
    const storedWeatherData = localStorage.getItem(lowercaseCity);
    if (!storedWeatherData) {
      fetchAndStoreWeatherData(searchedCity);
    }
    
    loadWeatherDataFromLocalStorage(searchedCity);
  }
});

// Check if there is weather data in local storage for the default city
const defaultCity = "Gedling";
loadWeatherDataFromLocalStorage(defaultCity);

// Add an event listener for the page load event to handle refreshing
window.addEventListener("load", function () {
  // Fetch and store data for the default city when the page is refreshed
  fetchAndStoreWeatherData(defaultCity);
});






