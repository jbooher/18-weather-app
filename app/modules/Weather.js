class Weather {

  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
    this.getWeeklyData();
    this.getHourlyData();
  }

  renderHourly() {
    let div;
    let span;
    let img;
    let hour;

    //Looping through days to get onto page.
    for(let i = 1; i <= 5; i++) {
      div = document.createElement("div");
      div.classList.add("forecast--hour");

      span = document.createElement("span");
      span.innerHTML = this[`hour${i}`];
      div.appendChild(span);

      img = document.createElement("img");
      hour = this[`hour${i}Icon`];
      img.src = `http://openweathermap.org/img/w/${hour}.png`;
      div.appendChild(img);

      span = document.createElement("span");
      span.innerHTML = Math.round(this[`hour${i}TempHigh`]);
      div.appendChild(span);

      span = document.createElement("span");
      span.innerHTML = Math.round(this[`hour${i}TempLow`]);
      div.appendChild(span);

      document.querySelector(".forecast--hourly").appendChild(div);
    }
  }

  getHourlyData() {
    const token = "85849687be057885aacb79986f359ec4";
    const baseUrl = "http://api.openweathermap.org/data/2.5/forecast?";

    fetch(`${baseUrl}lat=${this.lat}&lon=${this.long}&APPID=${token}&units=imperial`)
      .then((response) => {
        return response.json();
      }).then((response) => {

        let time;
        //Get 5 hour forecast
        for(let i = 1; i <= 5; i++) {

          //Setting time to am/pm
          time = new Date(response.list[i].dt_txt).getHours();
          if(time > 12) {
            time = `${time - 12}pm`;
          }
          else if (time === 0) {
            time = `12am`;
          }
          else {
            time = `${time}am`;
          }
          this[`hour${i}`] = time;
          this[`hour${i}Icon`] = response.list[i].weather[0].icon;
          this[`hour${i}TempHigh`] = Math.round(response.list[i].main.temp_max);
          this[`hour${i}TempLow`] = Math.round(response.list[i].main.temp_min);
        }

        this.renderHourly();

    });

  }

  renderWeekly() {
    //Putting today's information into the divs already made
    document.querySelector(".forecast--city").innerHTML = this.city;
    document.querySelector(".forecast--today").innerHTML = this.today;
    document.querySelector(".forecast--weather").innerHTML = this.weather;
    document.querySelector(".forecast--temp").innerHTML = `${this.currentTemp}&deg;`;

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
      img.src = `http://openweathermap.org/img/w/${day}.png`;
      div.appendChild(img);

      span = document.createElement("span");
      span.innerHTML = Math.round(this[`day${i}TempHigh`]);
      div.appendChild(span);

      span = document.createElement("span");
      span.innerHTML = Math.round(this[`day${i}TempLow`]);
      div.appendChild(span);

      document.querySelector(".forecast--weekly").appendChild(div);
    }

  }

  getWeeklyData() {

    const token = "85849687be057885aacb79986f359ec4";
    const baseUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?";

    fetch(`${baseUrl}lat=${this.lat}&lon=${this.long}&APPID=${token}&units=imperial`)
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

  }

}

export default Weather;
