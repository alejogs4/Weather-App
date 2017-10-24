const currentPosition = () => {
  if (!navigator.geolocation) {
    console.log("The geolocation is not supported in this browser");
  }
  let position = navigator.geolocation.getCurrentPosition(
    positionData => {
      getcurrentWeather(
        positionData.coords.latitude,
        positionData.coords.longitude
      );
    },
    err => {
      console.log("The users don't let us to use the geolocation");
    }
  );
};
const getcurrentWeather = (latitude, longitude) => {
  let xr = new XMLHttpRequest();
  xr.open(
    "GET",
    `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`
  );
  xr.onload = () => {
    let weatherData = JSON.parse(xr.responseText);
    console.log(weatherData);
    let currentWeather = weatherData.main;
    displayWeatherData(
      currentWeather.temp,
      currentWeather.temp_max,
      currentWeather.temp_min,
      currentWeather.humidity
    );
  };
  xr.send();
};
const displayWeatherData = (temp, maxTemp, minTemp, humidityTemp) => {
  console.log(temp, maxTemp, minTemp, humidityTemp);
  let weatherContainer = document.createElement("div");

  weatherContainer.innerHTML = `
    <div>
      <p>${temp}</p>
    </div>
  `;

  document.body.appendChild(weatherContainer);
};

window.onload = currentPosition();
