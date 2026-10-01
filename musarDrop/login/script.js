const usernameElement = document.getElementById("username");
const passwordElement = document.getElementById("password");
const submit = document.getElementById("submit");
submit.onclick = login;

async function login(){
    const user = {
        name: usernameElement.value,
        pass: passwordElement.value
    };
    const response = await fetch("http://localhost:3000/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    console.log(data.userId);

    sessionStorage.setItem("userId", data.userId);
    window.location.href="/.."
};