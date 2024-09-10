// import { createUserWithEmailAndPassword, auth } from "firebase/auth";

// // signup logic
// document.getElementById('submit-signup').addEventListener('click', function(event) {
//     event.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     createUserWithEmailAndPassword(auth, email, password)
//     .then(() => {
//         window.location.href = 'login.ejs';
//     })
//     .catch(error => {
//         console.error('Registrasi gagal : ',error);
//         alert('Registrasi bermasalah : '+ error.massage);
//     })
// })