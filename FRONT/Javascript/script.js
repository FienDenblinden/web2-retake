"use strict";

// Making connection with my backend
async function getData() {
    let url = "https://web2-course-project-api-fien.herokuapp.com/api/userWeather";
    let resp = await fetch(url);
    return await resp.json();
}

let datesChart = [];
let maxTempChart = [];


// Getting my dates for my site with a for loop
for (let i = 0; i < 5; i++) {
    let currentDate = new Date();
    currentDate.setDate(new Date().getDate() + i);
    currentDate = currentDate.toString();
    currentDate = currentDate.substring(0, 15);

    datesChart.push(currentDate);
}

//  Setting Brussels as standard openings window
window.onload = () => {

    let dateString = '';
    for (let i = 0; i <= 4; i++) {
        let date = new Date();
        date.setDate(new Date().getDate() + i);
        date = date.toString();
        date = date.substring(0, 15);
        dateString += `<th>${date}</th>`;

    }

    document.getElementById("formLocation").addEventListener("submit", weatherToday);
    weatherOnload("Brussels");

    async function weatherOnload(htmlSearch) {
        let htmlToday = document.getElementById("weatherToday");
        let search = await currentWeatherSearch(htmlSearch);
        console.log(search);
        htmlToday.innerHTML = ` 
        <tr>
           <td><img src="IMG/weather icon .png" alt="icon-zwart"></td>
           <td>${search.main.temp}°C</td>
           <td  class="description" >${search.wind.deg}° <span class="descriptionText">This is the wind direction expressed in degrees. To clarify, 90° is East, 180° is South, 270° is West and 360° is North.</span></td>
        </tr>        
        <tr>
           <td>Humidity: ${search.main.humidity}%</td>
           <td></td>
           <td>Cloudiness: ${search.clouds.all}%</td>
           <td></td>
        </tr>
        <tr>
           <td>Windspeed: ${search.wind.speed} m/s</td>
           <td></td>
           <td>Air pressure: ${search.main.pressure} hPa</td>
           <td></td>
        </tr>`;

        city(htmlSearch);
    }


    // FETCH
    // fetch my api for the weather of today (current weather)
    async function currentWeatherSearch(search) {
        let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=486fee4ca655950aa2b4f3668350b8aa`).catch(err => {
            console.error(err);
        });
        const data = await resp.json();
        return await data;
    }

    async function weatherToday(event) {
        let htmlToday = document.getElementById("weatherToday");
        event.preventDefault();
        let htmlSearch = document.getElementById("location").value;
        let search = await currentWeatherSearch(htmlSearch);
        console.log(search);
        htmlToday.innerHTML = ` 
        <tr>
           <td><img src="IMG/weather icon .png" alt="icon-zwart"></td>
           <td>${search.main.temp}°C</td>
           <td  class="description" >${search.wind.deg}° <span class="descriptionText">This is the wind direction expressed in degrees. To clarify, 90° is East, 180° is South, 270° is West and 360° is North.</span></td>
        </tr>        
        <tr>
           <td>Humidity: ${search.main.humidity}%</td>
           <td></td>
           <td>Cloudiness: ${search.clouds.all}%</td>
           <td></td>
        </tr>
        <tr>
           <td>Windspeed: ${search.wind.speed} m/s</td>
           <td></td>
           <td>Air pressure: ${search.main.pressure} hPa</td>
           <td></td>
        </tr>`;

        city(htmlSearch);
    }

    // City name changes in title when someone search for a specific city
    async function citySearch(search) {
        let resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=486fee4ca655950aa2b4f3668350b8aa`).catch(err => {
            console.error(err);
        });
        const data = await resp.json();
        return await data;
    }
    async function city(htmlSearch) {
        let htmlToday = document.getElementById("city");
        let search = await citySearch(htmlSearch);
        htmlToday.innerHTML = `
        <h1>The weather forecast for ${search.name}</h1> 
            `;

        weatherTomorrow(htmlSearch);
    }


    // Fetch my api for the weather of tomorrow 
    async function tomorrowWeatherSearch(search) {
        let resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=36ae1438f7af1920c4e0c122c0e9ebbc`).catch(err => {
            console.error(err);
        });
        if (resp.status == 200) {
            return await resp.json();
        }
    }

    async function weatherTomorrow(htmlSearch) {
        let htmlToday = document.getElementById("weatherTomorrow");
        let search = await tomorrowWeatherSearch(htmlSearch);
        console.log(search.list[1]);
        htmlToday.innerHTML = ` 
            <tr>
                <td><img src="IMG/weather icon .png" alt="icon-zwart"></td>
                <td>${search.list[1].main.temp}°C </td>
                <td class="description" >${search.list[1].wind.deg}° <span class="descriptionText">This is the wind direction expressed in degrees. To clarify, 90° is East, 180° is South, 270° is West and 360° is North.</span></td>
            </tr>
            <tr>
                <td>Humidity: ${search.list[1].main.humidity}%</td>
                <td></td>
                <td>Cloudiness: ${search.list[1].clouds.all}%</td>
                <td></td>
            </tr>
            <tr>
                <td>Windspeed: ${search.list[1].wind.speed} m/s</td>
                <td></td>
                <td>Air pressure: ${search.list[1].main.pressure} hPa</td>
                <td></td>
            </tr> `;
        weatherFiveDays(htmlSearch);
    }


    // fetch my api for the weather of next 5 days
    async function fiveDaysSearch(search) {
        let resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=36ae1438f7af1920c4e0c122c0e9ebbc`).catch(err => {
            console.error(err);
        });
        if (resp.status == 200) {
            return await resp.json();
        }
    }

    async function weatherFiveDays(htmlSearch) {
        let htmlToday = document.getElementById("weatherFiveDays");
        let search = await fiveDaysSearch(htmlSearch);

        // For loop for the results from my api
        let tempString = "";
        let windString = "";
        for (let i = 0; i <= 4; i++) {
            tempString += `<td>${search.list[i].main.temp_min}°C / ${search.list[i].main.temp_max}°C</td>`;
            maxTempChart.push(Math.round(search.list[i].main.temp_max));
            windString += ` <td>${search.list[i].wind.speed} m/s</td>`
        }

        htmlToday.innerHTML = ` 
        <thead>
        <tr>
            ${dateString}
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><img src="IMG/weather icon .png" alt="icon-zwart"></td>
            <td><img src="IMG/weather icon white.png" alt="icon-wit"></td>
            <td><img src="IMG/weather icon white.png" alt="icon-wit"></td>
            <td><img src="IMG/weather icon white.png" alt="icon-wit"></td>
            <td><img src="IMG/weather icon white.png" alt="icon-wit"></td>
        </tr>
        <tr>
            ${tempString}
        </tr>
        <tr >
            ${windString}
        </tr>
    </tbody> `;
        weatherFiveDaysDetails(htmlSearch);
    }


    // Fetch my api for the next 5 days in detail 
    async function fiveDaysDetailSearch(search) {
        let resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=36ae1438f7af1920c4e0c122c0e9ebbc`).catch(err => {
            console.error(err);
        });
        if (resp.status == 200) {
            return await resp.json();
        }
    }

    async function weatherFiveDaysDetails(htmlSearch) {
        let htmlToday = document.getElementById("weatherFiveDaysDetail");
        let search = await fiveDaysDetailSearch(htmlSearch);


        // For loop for the results from my api
        let mainTempString = "";
        let cloudsString = "";
        let humidityString = "";
        let visabilityString = "";
        let airPressureString = "";
        for (let i = 0; i <= 4; i++) {
            mainTempString += `<td>${search.list[i].main.temp}°C</td>`;
            cloudsString += `<td>${search.list[i].clouds.all}%</td>`;
            humidityString += ` <td>${search.list[i].main.humidity}%</td>`;
            visabilityString += `<td>${search.list[i].visibility} m</td>`;
            airPressureString += `<td>${search.list[i].main.pressure} hPa </td>`;
        }

        htmlToday.innerHTML = ` 
    <thead>
    <tr>
        <th> </th>
        ${dateString}
    </tr>
</thead>
<tbody>

    <tr>
        <td>Average temperature</td>
        ${mainTempString}
    </tr>
    <tr>
    <td>Cloudiness</td>
        ${cloudsString}
    </tr>
    <tr>
        <td>Humidity</td>
        ${humidityString}
    </tr>
    <tr>
        <td>Visability</td>
        ${visabilityString}
    </tr>
    <tr>
        <td>Air pressure</td>
        ${airPressureString}
    </tr>
</tbody>`;

    }

    // CHART --> I used chart.js documetation as helping source
    // dates for into the chart
    let ctx = document.getElementById('myChart');
    let chart = new Chart(ctx, {



        // The chart data
        data: {

            labels: datesChart,
            datasets: [{
                label: 'Temperature in °C',

                borderColor: '#36A9E1',
                data: maxTempChart,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        type: 'line',
        options: {

            scales: {
                yAxes: [{
                    gridLines: {
                        display: false,
                        color: "#FFFFFF"
                    },
                    ticks: {
                        min: -10,
                        max: 40,
                        stepSize: 5,
                        fontColor: 'white'
                    },
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: "#FFFFFF"
                    },
                    ticks: {
                        fontColor: 'white'
                    },
                }]
            }
        }

    });
};