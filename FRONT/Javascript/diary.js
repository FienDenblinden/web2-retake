// THIS CODE DOESN'T WORK
// window.onload = () => {

//     let inputUser = document.getElementById("user").value;
//     let inputdate = document.getElementById("date").value;
//     let inputTime = document.getElementById("time").value;
//     let inputTemp = document.getElementById("temperature").value;
//     let inputRain = document.getElementById("rain").value;
//     let inputHumidity = document.getElementById("humidity").value;
//     let inputWind = document.getElementById("wind").value;


//     document.getElementById("submitDiary").addEventListener("click", async (event) => {
//         event.preventDefault();
//         const insertData = {
//             name: inputUser,
//             date: inputdate,
//             time: inputTime,
//             temperature: inputTemp,
//             rain: inputRain,
//             humidity: inputHumidity,
//             wind: inputWind
//         }

//         const response = await fetch("http://localhost:3000/api/userWeather", {
//             body: JSON.stringify(insertData),
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },

//         });
//         const json = await response.json();
//         console.log(json);

//     });
// }