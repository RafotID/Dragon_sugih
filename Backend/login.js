import { signInWithEmailAndPassword, auth } from "../game/src/fisebase"

// Login Logic

document.getElementById('submit-login').addEventListener('click', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, name, password)
    .then(() => {
        window.location.href = 'home.ejs';
    })
    .catch(error => {
        console.error('Login error : ',error);
        alert('Login failed : ', error.massage);
    })
})