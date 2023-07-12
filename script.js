async function getData() {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=bb011c7deb6e441d8c1112041231107&q=Lalitpur",
  );
  weather = await response.json();
  console.log(weather);
  getCelcius(weather);
  getLocation(weather);
  getDateAndTime(weather);
  getIcon(weather);
}

function getCelcius(weather) {
  const temp_c = weather.current.temp_c;
  document.querySelector(".temptext").innerHTML = temp_c + "°";
}

function getLocation(weather) {
  const location = weather.location.name;
  const country = weather.location.country;

  document.querySelector(".place").innerHTML = location + ", " + country;
}

function getDateAndTime(weather) {
  let dummyDate = weather.location.localtime;

  let date = dummyDate.slice(0, 10);
  date = new Date(date).toDateString().split(" ");
  document.querySelector(
    ".date",
  ).innerHTML = `${date[0]}, ${date[1]} ${date[2]}`;

  const time = dummyDate.slice(10);
  document.querySelector(".hour").innerHTML = time;
}

function getIcon(weather) {
  let imgPath = weather.current.condition.icon;

  let iconDiv = document.querySelector(".icon-holder");
  imgPath = imgPath.slice(20);
  let icon = document.createElement("img");
  icon.src = "./" + imgPath;
  iconDiv.appendChild(icon);
}

getData();
