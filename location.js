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
  console.log(latitude,longitude);

  // Use a reverse geocoding service to convert latitude and longitude into a human-readable address
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiZ3JlZWlkIiwiYSI6ImNsazEwdmRicDAyZ3kzbXJ5aGVrY2p4YjMifQ.F4NIvg_TVG9hQNmp5-pI5Q`
  )
    .then((response) => response.json())
    .then((data) => {
      let location = data.features[0].place_name;
      console.log(data);
      // Use the location data as needed
      location = location.split(",");
      console.log(location[1]);

      // getData(location);
    })
    .catch((error) => {
      console.log("Error retrieving location:", error);
    });
}

function errorCallback(error) {
  console.log("Error retrieving current location:", error.message);
}

getCurrentLocation();
