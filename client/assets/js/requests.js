// const url = 'https://trackit-sillicon-alley.herokuapp.com'
const url = 'http://localhost:3000'

async function getAll(category){
    try {
        const response = await fetch(`${url}/${category}`);
        const data = await response.json()
        console.log(data)
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getItem(category, id) {
    try {
        const response = await fetch(`${url}/${category}/${id}`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getUserHabits (id) {
    try {
        const response = await fetch(`${url}/users/${id}/habits`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log(err)
        console.warn(err);
    }
}

async function postHabit(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        
        const response = await fetch('${url}/${url}/habits', options);
        const { id, err } = await response.json();
        if(err) { 
            throw Error(err) 
        } else {
            // window.location.hash = `#books/${id}`
        }
    } catch (err) {
        console.warn(err);
    }
}

async function deleteHabit(id){
    try {
        const options = { method: 'DELETE' }
        await fetch(`${url}/${url}habits/${id}`, options);
        // window.location.hash = `#books`
    } catch (err) {
        console.warn(err);
    }
}

async function update (e, category) {
    e.preventDefault();
    try {
        const options = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        
        const response = await fetch(`${url}/${category}/${id}`, options);
        const { id, err } = await response.json();
        if(err) { 
            throw Error(err) 
        } else {
            // window.location.hash = `#books/${id}`
        }
    } catch (err) {
        console.warn(err);
    }
}

async function updateData (data, category) {
    // e.preventDefault();
    try {
        const options = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: data
        }
        
        const response = await fetch(`${url}/${category}/${id}`, options);
        const { id, err } = await response.json();
        if(err) { 
            throw Error(err) 
        } else {
            // window.location.hash = `#books/${id}`
        }
    } catch (err) {
        console.warn(err);
    }
}

async function login () {

    let input = { email: 'test@gmail.com',
    password: 'test'
  }

    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input)
        }
        

        const response = await fetch(`${url}/users/login`, options);

        const token = await response.json();
        console.log(token)

        if(token === 'error') {
            console.log('redirect the user to the homepage')
        } else {
            console.log('logged in')
            localStorage.setItem('userToken', token)
            // window.location.href = 'https://trackit-sillicon-alley.herokuapp.com/';
        }
    } catch (err) {
        console.log(err);
    }
}

//login();

async function signup (name, password, email) {
    //e.preventDefault();

    const signUpData = { name, password, email}
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signUpData)
        }
        

        const response = await fetch(`${url}/users/signup`, options);

        const user = await response.json();
        console.log(user)

        if(user.err) { 
            console.log('you need to sign up again && do someting');
            console.log(user);
            //windows.location.href = localhost:3000/
        } else {
            console.log('you are signed in')
        } 
    } catch (err) {
        console.warn(err);
    }
}

signup('newUser', `password`, `aaa@hotmail.com`)
