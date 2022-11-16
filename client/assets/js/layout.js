console.log('layout.js');
const loginBtn = document.querySelector('#loginButton');
const signUpBtn = document.querySelector('#signUpButton')

loginBtn.addEventListener('click', () => {
    window.location.href = `${window.location.href}login` 
})

signUpBtn.addEventListener('click', () => {
    window.location.href = `${window.location.href}signup` 
})

const connectToBackendTest = async () => {
    let url = 'https://trackit-sillicon-alley.herokuapp.com/';
    const testRoot = await fetch(url);
    const data = await testRoot.text();
    console.log(data);
    return data;
}

connectToBackendTest();
