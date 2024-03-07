// const config = require('../config')

const loginFunction = () => {

    const username = document.querySelector('#input-user-name').value
    const password = document.querySelector('#input-password').value
    console.log(username);
    if(username && password)
    {
        if(username === "admin" && password === "1")
        {
            localStorage.setItem('token', true)
            window.location.href="http://127.0.0.1:3001/test";
        }
        else{
            window.alert("error")
        }
    }
    else{
        window.alert("error")
    }
}

const signIn = document.querySelector('#sign-in-button')

signIn.addEventListener('onclick', loginFunction)