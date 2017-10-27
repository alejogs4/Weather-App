const currentPosition = () => {
  if (!navigator.geolocation) {
    console.log("The geolocation is not supported in this browser");
  }
  let position = navigator.geolocation.getCurrentPosition(
    positionData => {
      let apiKey = "1ebd32963d194fcd9bb9af04df7591b5";
      getcurrentWeather(
        positionData.coords.latitude,
        positionData.coords.longitude,
        apiKey
      );
    },
    err => {
      console.log("The users don't let us to use the geolocation");
    }
  );
};
const getcurrentWeather = (latitude, longitude, key) => {
  let xr = new XMLHttpRequest();
  xr.open(
    "GET",
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${key}&units=metric`
  );
  xr.onload = () => {
    let weatherData = JSON.parse(xr.responseText);
    console.log(weatherData);
    let currentWeather = weatherData.main;
    let weatherLocale = weatherData.weather;
    displayWeatherData(
      currentWeather.temp,
      currentWeather.temp_max,
      currentWeather.temp_min,
      currentWeather.humidity,
      weatherLocale
    );
  };
  xr.send();
};
const displayWeatherData = (
  temp,
  maxTemp,
  minTemp,
  humidityTemp,
  localeWeather
) => {
  console.log(temp, maxTemp, minTemp, humidityTemp);
  let weatherContainer = document.createElement("div");

  let img = {
    source:
      temp <= 18
        ? "./assets/img/nubes.png"
        : temp >= 20 ? "./assets/img/sol.png" : "",
    alt: "clima"
  };
  weatherContainer.innerHTML = `
    <div class="weather_data_container">
      <img src="${img.source}" alt="${img.alt}">
      <p>${temp}</p>
    </div>
  `;

  document.body.appendChild(weatherContainer);
};

window.onload = currentPosition();
