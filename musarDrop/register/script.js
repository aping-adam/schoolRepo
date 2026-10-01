async function createUser() {
    const response = await fetch("http://localhost:3000/api/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    
    const data = await response.json();
    console.log("server response: ", data);
}