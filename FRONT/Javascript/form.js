// THIS CODE DOESN'T WORK
// window.onload = () => {

//         let inputUser = document.getElementById("user").value;
//         let inputAge = document.getElementById("age").value;
//         let inputMessage = document.getElementById("message").value;

//         document.getElementById("submitForm").addEventListener("click", async (event) => {
//                 event.preventDefault();
//                 const insertData = {
//                     name: inputUser,
//                     age: inputAge,
//                     message: inputMessage,
//                 }

//                 const response = await fetch("http://localhost:3000/api/userMessage", {
//                     body: JSON.stringify(insertData),
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },

//                 });
//                 const json = await response.json();
//                 console.log(json);
//             }
//         }