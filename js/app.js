let preload=document.getElementById('preload')
preload.innerHTML='<i class="fa  fa-refresh  fa-spin  fa-5x"></i>'

const currentPosition = () => {
  if (!navigator.geolocation) {
    console.log("The geolocation is not supported in this browser");
  }
  let position = navigator.geolocation.getCurrentPosition(
    positionData => {
      let apiKey = "1ebd32963d194fcd9bb9af04df7591b5";
      getcurrentWeather(positionData.coords.latitude,positionData.coords.longitude,apiKey);
    },
    err => {
      console.log("The users don't let us to use the geolocation");
    }
  );
};

const getcurrentWeather = (latitude, longitude, key) => {
  const apiMapsKey='AIzaSyCZ6vNHaC5-XHVOmBuEvmOVLPhRSUgbXco'
  let xr = new XMLHttpRequest();
  
  function weatherInfo(){
    if(xr.readyState===4 && xr.status===200){
      preload.innerHTML=''
      let weatherData = JSON.parse(xr.responseText);
      console.log(weatherData);
      let currentWeather = weatherData.main;
      let weatherLocale = weatherData.weather;
      let image=`https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${latitude},${longitude}&heading=151.78&pitch=-0.76&key=${apiMapsKey}`
      displayWeatherData(currentWeather.temp,currentWeather.temp_max,
        currentWeather.temp_min,currentWeather.humidity,weatherData,image);
    }
  }

  xr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${key}&units=metric`);

    xr.addEventListener('readystatechange',weatherInfo)

  xr.send();
};

const displayWeatherData = (temp,maxTemp,minTemp,humidityTemp,localeWeather,img) => {
  console.log(temp, maxTemp, minTemp, humidityTemp,localeWeather);

  let date=new Date()
  let hours=date.getHours()
  let minutes=date.getMinutes()
  
  let weatherContainer = document.createElement("div");
  weatherContainer.innerHTML = `
    <div class="weather_data_container">
      <img src="${img}" class="city">
      <p>La temperatura en ${localeWeather.name} a las ${hours}:${minutes} es</p>
      <h2>${temp} grados centigrados</h2>
    </div>
  `;

  document.body.appendChild(weatherContainer);
};

window.onload = currentPosition();
