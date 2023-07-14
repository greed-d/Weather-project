//get current.json using fetch API
async function getData(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=bb011c7deb6e441d8c1112041231107&q=${location}`,
  );
  weather = await response.json();
  setCelcius(weather);
  setLocation(weather);
  setDateAndTime(weather);
  setIcon(weather);
}

function setCelcius(weather) {
  let temp_c = weather.current.temp_c;
  document.querySelector(".temptext").innerHTML = temp_c + "°";
}

function setLocation(weather) {
  let location = weather.location.name;
  let country = weather.location.country;

  document.querySelector(".place").innerHTML = location + ", " + country;
}

function setDateAndTime(weather) {
  let dummyDate = weather.location.localtime;

  let date = dummyDate.slice(0, 10);
  date = new Date(date).toDateString().split(" ");
  document.querySelector(
    ".date",
  ).innerHTML = `${date[0]}, ${date[1]} ${date[2]}`;

  const time = dummyDate.slice(10);
  document.querySelector(".hour").innerHTML = time;
}

function setIcon(weather) {
  let imgPath = weather.current.condition.icon;
  weatherIcon = document.querySelector(".weather-icon");
  if (weatherIcon !== null) {
    weatherIcon.remove();
  }

  let iconDiv = document.querySelector(".icon-holder");
  imgPath = imgPath.slice(20);
  let icon = document.createElement("img");
  icon.classList.add("weather-icon");

  icon.style.width = "96px";
  icon.style.height = "96px";
  icon.src = "./" + imgPath;
  iconDiv.appendChild(icon);
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Use a reverse geocoding service to convert latitude and longitude into a human-readable address
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiZ3JlZWlkIiwiYSI6ImNsazEwdmRicDAyZ3kzbXJ5aGVrY2p4YjMifQ.F4NIvg_TVG9hQNmp5-pI5Q`,
  )
    .then((response) => response.json())
    .then((data) => {
      let locationGeo = data.features[0].place_name;
      // Use the location data as needed
      console.log(locationGeo);
      locationGeo = locationGeo.split(",");

      getData(locationGeo[1]);
      getForecast(locationGeo[1]);
    })
    .catch((error) => {
      console.log("Error retrieving location:", error);
    });
}

function errorCallback(error) {
  console.log("Error retrieving current location:", error.message);
}

function getForecast(location) {
  console.log(location);
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=bb011c7deb6e441d8c1112041231107&q=${location}`,
  )
    .then((response) => response.json())
    .then((forecast) => {
      console.log(forecast);
      setFeelsLike(forecast);
      setSunset(forecast);
    });
  // console.log(response);
}

function setFeelsLike(forecast) {
  let humidTemp = forecast.current.feelslike_c;
  console.log(humidTemp);
  document.querySelector(".feelslike").innerHTML = "Feels like " + humidTemp;
}

function setSunset(forecast) {
  let sunSettingTime = forecast.forecast.forecastday[0].astro.sunset;
  document.querySelector(".settingtime").innerHTML =
    "Sunset at " + sunSettingTime;
}

getCurrentLocation();

let locationA = document.querySelector(".location-a");
locationA.addEventListener("click", () => getData("Kathmandu"));

let locationB = document.querySelector(".location-b");
locationB.addEventListener("click", () => getData("Berlin"));

let locationC = document.querySelector(".location-c");
locationC.addEventListener("click", () => getData("Sydney"));
