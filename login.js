import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBnOmwxaAClkjr077_8SY4BbsWPYaidrOs",
    authDomain: "senior-project-60636.firebaseapp.com",
    databaseURL: "https://senior-project-60636-default-rtdb.firebaseio.com",
    projectId: "senior-project-60636",
    storageBucket: "senior-project-60636.appspot.com",
    messagingSenderId: "502634674948",
    appId: "1:502634674948:web:54181fc83489c13313ee51"
};

const app = initializeApp(firebaseConfig);

const login = document.getElementById('login');

const auth = getAuth();
login.addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById('email_field').value;
    const password = document.getElementById('password_field').value;
    console.log(password);

    if (email == "") {
        alert('Please enter a valid email address.');
        return false;
    }

    if (password < 6 || password == null) {
        alert('Please enter a valid password at least 6 characters in length.');
        return false;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            window.location.href = "main.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });

})