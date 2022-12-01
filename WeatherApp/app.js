window.addEventListener('load', () => {
    let lat;
    let lon;
    let part;
    let apiKey;
    const temperatureDescription = document.querySelector(".temperature-description");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const locationTimezone = document.querySelector(".location-timezone");
    const locationIcon = document.querySelector(".image");
    const temperatureSection = document.querySelector(".temperature-section")
    const temperatureSpan = document.querySelector(".temperature-section span")
    const humidityValue = document.querySelector(".humidity-value");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            units = "metric";
            part = "current";
            apiKey = "a7d78ddebfbdd6f39f1825ec53dbd1ae";
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&exclude=${part}&appid=${apiKey}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { name } = data;
                    const { temp, humidity } = data.main;
                    const { country } = data.sys;
                    const { description, icon } = data.weather[0];
                    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

                    // temperature
                    let celsius = Math.floor(temp);
                    let fahrenheit = Math.floor((temp * 1.8) + 32);

                    locationTimezone.textContent = name + ", " + country;
                    temperatureDegree.textContent = celsius;
                    temperatureDescription.textContent = description;
                    humidityValue.textContent = humidity;
                    locationIcon.src = iconUrl;

                    // Change temperature to Celsius / Fahrenheit
                    temperatureSection.addEventListener(`click`, () => {
                        if (temperatureSpan.textContent === "˚C") {
                            temperatureSpan.textContent = "˚F";
                            temperatureDegree.textContent = fahrenheit;
                        } else {
                            temperatureSpan.textContent = "˚C";
                            temperatureDegree.textContent = celsius;
                        }
                    })
                })
        })
    } else {
        h1.textContent = "Sorry, Receiving Geolocation is failed."
    }
})