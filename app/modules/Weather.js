class Weather {

  constructor(location) {
    this.location = location;
    this.getWeeklyData();
    this.getHourlyData();
  }

  getHourlyData() {
    const token = "85849687be057885aacb79986f359ec4";
    const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?";

    navigator.geolocation.watchPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      fetch(`${baseUrl}lat=${lat}&lon=${lon}&APPID=${token}&units=imperial`)
        .then((response) => {
          return response.json();
        }).then((response) => {

          //Today's weather info
          this.city = response.city.name;
          this.today = new Date(response.list[0].dt * 1000).toDateString().split(" ")[0];
          this.weather = response.list[0].weather[0].description;
          this.currentTemp = Math.round(response.list[0].temp);
          console.log(response);

          //Get 5 day forecast
          for(let i = 1; i <= 5; i++) {
            this[`day${i}`] = new Date(response.list[i].dt * 1000).toDateString().split(" ")[0];
            this[`day${i}Icon`] = response.list[i].weather[0].icon;
            this[`day${i}TempHigh`] = response.list[i].temp.max;
            this[`day${i}TempLow`] = response.list[i].temp.min;
          }

          this.renderWeekly();

      });

    });

  }

  renderWeekly() {
    //Putting today's information into the divs already made
    document.querySelector(".heading--city").innerHTML = this.city;
    document.querySelector(".heading--day").innerHTML = this.today;
    document.querySelector(".heading--weather").innerHTML = this.weather;
    document.querySelector(".heading--temp").innerHTML = `${this.currentTemp}&deg;`;

    //Preparing to loop over days to place on page
    let div;
    let span;
    let img;
    let day;

    //Looping through days to get onto page.
    for(let i = 1; i <= 5; i++) {
      div = document.createElement("div");
      div.classList.add("forecast--day");

      span = document.createElement("span");
      span.innerHTML = this[`day${i}`];
      div.appendChild(span);

      img = document.createElement("img");
      day = this[`day${i}Icon`];
      console.log(day);
      img.src = `http://openweathermap.org/img/w/${day}.png`;
      div.appendChild(img);

      span = document.createElement("span");
      span.innerHTML = Math.round(this[`day${i}TempHigh`]);
      div.appendChild(span);

      span = document.createElement("span");
      span.innerHTML = Math.round(this[`day${i}TempLow`]);
      div.appendChild(span);

      document.querySelector(".forecast").appendChild(div);
    }

  }

  getWeeklyData() {

    const token = "85849687be057885aacb79986f359ec4";
    const baseUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?";

    navigator.geolocation.watchPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      fetch(`${baseUrl}lat=${lat}&lon=${lon}&APPID=${token}&units=imperial`)
        .then((response) => {
          return response.json();
        }).then((response) => {

          //Today's weather info
          this.city = response.city.name;
          this.today = new Date(response.list[0].dt * 1000).toDateString().split(" ")[0];
          this.weather = response.list[0].weather[0].description;
          this.currentTemp = Math.round(response.list[0].temp.day);

          //Get 5 day forecast
          for(let i = 1; i <= 5; i++) {
            this[`day${i}`] = new Date(response.list[i].dt * 1000).toDateString().split(" ")[0];
            this[`day${i}Icon`] = response.list[i].weather[0].icon;
            this[`day${i}TempHigh`] = response.list[i].temp.max;
            this[`day${i}TempLow`] = response.list[i].temp.min;
          }

          this.renderWeekly();
        });

    })

  }

}

export default Weather;
