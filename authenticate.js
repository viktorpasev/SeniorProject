import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

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
const auth = getAuth();
const database = getDatabase(app);

const submit = document.getElementById('submit');

submit.addEventListener("click", function (event) {
    event.preventDefault();
    const confirmation = document.getElementById('confirm_password_field').value;
    const username = document.getElementById('username_field').value;
    const email = document.getElementById('email_field').value;
    const password = document.getElementById('password_field').value;
    console.log(password);

    if (username == "") {
        alert('Please enter a valid username.');
        return false
    }

    if (password < 6 || password == null) {
        alert('Please enter a valid password at least 6 characters in length.');
        return false
    }

    if (password !== confirmation) {
        alert('Password does not match!');
        return false
    }

    if (email == "") {
        alert('Please enter a valid email address.');
        return false
    }

    const dbRef = ref(database, 'users/' + username);
    const data = {
        email:email,
        password:password
    };
    set(dbRef, data)
        .then(() => {
            console.log('Data written successfully!');
        })
        .catch((error) => {
            console.error('Error writing data:', error);
        });


    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            user.addData;
            window.location.href = "main.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
})

const about = document.querySelector('.about');

about.addEventListener('click', () => {
    alert("Welcome to Earworm! \nEarworm allows you to convert a PDF file into an mp3 that you can listen to in 3 easy steps. \n 1) Upload a PDF file and convert it to a txt file. \n 2) Upload the converted txt file and convert it into an mp3. \n 3) Load the mp3 file into Earworm's custom audio player and enjoy!");
});