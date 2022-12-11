window.addEventListener('load', () => {
    const temperatureHourly = document.querySelector("#temperature-hourly");
    const temperatureDaily = document.querySelector("#temperature-daily");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
            const today = new Date();

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { time, temperature_2m, weathercode } = data.hourly;
                    const { sunrise, sunset, temperature_2m_max, temperature_2m_min } = data.daily;
                    const timeDaily = data.daily.time;
                    const weatherCodeDaily = data.daily.weathercode;

                    // variables for comparing dates
                    const sunriseToday = Date.parse(sunrise[0]);
                    const sunsetToday = Date.parse(sunset[0]);
                    const sunriseTomorrow = Date.parse(sunrise[1]);
                    const sunsetTomorrow = Date.parse(sunset[1]);

                    const table = document.createElement("table");
                    table.className = "table text-center";
                    const trTime = document.createElement("tr");
                    const trTemp = document.createElement("tr");
                    const trCode = document.createElement("tr");
                    for (let i = 0; i < 24; i++) {
                        let index = i + today.getHours();
                        const tdTime = document.createElement("td");
                        const tdTemp = document.createElement("td");
                        const tdCode = document.createElement("td");
                        // check the date;
                        const image = changeToImage(Date.parse(time[index]), sunriseToday, sunsetToday, sunriseTomorrow, sunsetTomorrow, weathercode[index]);
                        // 2022-12-08T00:00
                        tdTime.textContent = Number(time[index].slice(-5, -3));
                        tdCode.innerHTML =  `<img src=${image}>`;
                        tdTemp.textContent = Math.round(temperature_2m[index]);
                        trTime.appendChild(tdTime);
                        trCode.appendChild(tdCode);
                        trTemp.appendChild(tdTemp);
                    }

                    table.appendChild(trTime);
                    table.appendChild(trCode);
                    table.appendChild(trTemp);

                    temperatureHourly.appendChild(table);
                })
        })
    }
})

function changeToImage(time, sunriseToday, sunsetToday, sunriseTomorrow, sunsetTomorrow, weathercode) {

    if (sunriseToday <= time && time <= sunsetToday || sunriseTomorrow <= time &&time <= sunsetTomorrow) {
        return mapDay.get(weathercode);
    } else {
        return mapNight.get(weathercode);
    }
}

// icons for day
const mapDay = new Map([
    [0, ".vscode/css/image/clear-day.svg"],
    [1, ".vscode/css/image/cloudy-1-day.svg"],
    [2, ".vscode/css/image/cloudy-2-day.svg"],
    [3, ".vscode/css/image/cloudy-3-day.svg"],
    [45, ".vscode/css/image/cloudy.svg"],
    [48, ".vscode/css/image/fog-day.svg"],
    [51, ".vscode/css/image/rainy-1-day.svg"],
    [53, ".vscode/css/image/rainy-2-day.svg"],
    [55, ".vscode/css/image/rainy-3-day.svg"],
    [56, ".vscode/css/image/rain-and-sleet-mix.svg"], //Freezing Drizzle
    [57, ".vscode/css/image/rain-and-snow-mix.svg"], //Freezing Drizzle
    [61, ".vscode/css/image/rainy-1.svg"],
    [63, ".vscode/css/image/rainy-2.svg"],
    [65, ".vscode/css/image/rainy-3.svg"],
    [66, ".vscode/css/image/rain-and-sleet-mix.svg"], //Freezing Rain
    [67, ".vscode/css/image/rain-and-snow-mix.svg"], //Freezing Rain
    [71, ".vscode/css/image/snowy-1.svg"],
    [73, ".vscode/css/image/snowy-2.svg"],
    [75, ".vscode/css/image/snowy-3.svg"],
    [77, ".vscode/css/image/frost.svg"], //Snow grains
    [80, ".vscode/css/image/rainy-1-day.svg"],
    [81, ".vscode/css/image/rainy-2-day.svg"],
    [82, ".vscode/css/image/rainy-3-day.svg"],
    [85, ".vscode/css/image/snowy-1-day.svg"],
    [86, ".vscode/css/image/snowy-3-day.svg"],
    [95, ".vscode/css/image/thunderstorms.svg"],
    [96, ".vscode/css/image/scattered-thunderstorms-day.svg"],
    [99, ".vscode/css/image/severe-thunderstorm.svg"]
  ]);

  // icons for night
const mapNight = new Map([
    [0, ".vscode/css/image/clear-night.svg"],
    [1, ".vscode/css/image/cloudy-1-night.svg"],
    [2, ".vscode/css/image/cloudy-2-night.svg"],
    [3, ".vscode/css/image/cloudy-3-night.svg"],
    [45, ".vscode/css/image/cloudy.svg"],
    [48, ".vscode/css/image/fog-night.svg"],
    [51, ".vscode/css/image/rainy-1-night.svg"],
    [53, ".vscode/css/image/rainy-2-night.svg"],
    [55, ".vscode/css/image/rainy-3-night.svg"],
    [56, ".vscode/css/image/rain-and-sleet-mix.svg"], //Freezing Drizzle
    [57, ".vscode/css/image/rain-and-snow-mix.svg"], //Freezing Drizzle
    [61, ".vscode/css/image/rainy-1.svg"],
    [63, ".vscode/css/image/rainy-2.svg"],
    [65, ".vscode/css/image/rainy-3.svg"],
    [66, ".vscode/css/image/rain-and-sleet-mix.svg"], //Freezing Rain
    [67, ".vscode/css/image/rain-and-snow-mix.svg"], //Freezing Rain
    [71, ".vscode/css/image/snowy-1.svg"],
    [73, ".vscode/css/image/snowy-2.svg"],
    [75, ".vscode/css/image/snowy-3.svg"],
    [77, ".vscode/css/image/frost.svg"], //Snow grains
    [80, ".vscode/css/image/rainy-1-night.svg"],
    [81, ".vscode/css/image/rainy-2-night.svg"],
    [82, ".vscode/css/image/rainy-3-night.svg"],
    [85, ".vscode/css/image/snowy-1-night.svg"],
    [86, ".vscode/css/image/snowy-3-night.svg"],
    [95, ".vscode/css/image/thunderstorms.svg"],
    [96, ".vscode/css/image/scattered-thunderstorms-night.svg"],
    [99, ".vscode/css/image/severe-thunderstorm.svg"]
  ]);
