import 'es6-promise';
import 'whatwg-fetch';

import Weather from "./modules/Weather";

const weather = new Weather();

let weekly = document.querySelector("#weekly");
let hourly = document.querySelector("#hourly");
let weeks = document.querySelector("#weeks");
let hours = document.querySelector("#hours");

const token = "AIzaSyDhPMYM-vtRFAW1_VOCCqbIkexdK4P3Tm0";

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
