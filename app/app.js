import 'es6-promise';
import 'whatwg-fetch';

import Weather from "./modules/Weather";


let input = document.querySelector("#input");
let submit = document.querySelector("#submit");
let weekly = document.querySelector("#weekly");
let hourly = document.querySelector("#hourly");
let weeks = document.querySelector("#weeks");
let hours = document.querySelector("#hours");

let search = "Little+Rock,+AR";
const token = "AIzaSyDhPMYM-vtRFAW1_VOCCqbIkexdK4P3Tm0";
let baseUrl;
let lat;
let long;

navigator.geolocation.watchPosition((position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  const weather = new Weather(lat, lon);
});

submit.addEventListener("click", (e) => {
  search = input.value;
  baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${token}`;

  fetch(baseUrl)
    .then((response) => {
      return response.json();
    }).then((response) => {
      lat = response.results[0].geometry.location.lat;
      long = response.results[0].geometry.location.lng;
      const weather2 = new Weather(lat,long);
    });
})

hourly.addEventListener("click", (e) => {
  weekly.classList.remove("selected");
  hourly.classList.add("selected");
  hours.classList.remove("hidden");
  weeks.classList.add("hidden");
});

weekly.addEventListener("click", (e) => {
  hourly.classList.remove("selected");
  weekly.classList.add("selected");
  weeks.classList.remove("hidden");
  hours.classList.add("hidden");
});
