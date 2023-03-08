const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const cityRef = document.getElementById("city");

// Function to fetch weather details from api and display them
const getWeather = () => {
  const cityValue = cityRef.value;

  // If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  }
  // If input field is not empty
  else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    // Clear the city input
    cityRef.value = "";

    fetch(url)
      .then((resp) => resp.json())
      //If city name is valid
      .then((data) => {
        console.log(data);

        const offset = data.timezone / 60 / 60; // Convert seconds to hours
        const d = new Date();
        const utc = d.getTime() + d.getTimezoneOffset() * 60000; // Convert to UTC time
        const localTime = new Date(utc + 3600000 * offset); // Convert to local time
        const timeString = localTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          seconds: false,
        });
        const today = new Date();
        const currentDate = today.getDate();
        const currentYear = today.getFullYear();
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const dateTimeString = localTime.toLocaleDateString("en-US", options);

        result.innerHTML = `
        <div>
            <h2>${data.name}</h2>
            <h4 class="date">${dateTimeString}</h4>
            <h1>${timeString}</h1>
            <h4 class="humidity">Humidity: ${data.main.humidity}&#37;</h4>
            <h4 class="pressure">Pressure: ${data.main.pressure} hPa</h4>
            <h4 class="wind">Wind: ${data.wind.speed} km/h ${
          data.wind.deg
        }&#176;</h4>
          </div>
          <div>
            <img src="https://openweathermap.org/img/w/${
              data.weather[0].icon
            }.png">
            <h1>${Math.round(data.main.temp)} &#176; C</h1>
            <h4 class="feelings">Feels like: ${Math.round(
              data.main.feels_like
            )} &#176; C</h4>
            <h4 class="desc">${data.weather[0].description}</h4>
            <div class="temp-container">
              <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${Math.round(data.main.temp_min)} &#176; C</h4>
              </div>
              <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${Math.round(data.main.temp_max)} &#176; C</h4>
              </div>
            </div>
          </div>
        `;
      })
      // If name is not valid
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
