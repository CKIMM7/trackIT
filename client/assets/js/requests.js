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
            method: 'PUT',
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
            method: 'PUT',
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

async function login (e, input) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input)
        }
        
        const response = await fetch(`${url}/users/login`, options);
        const token = await response.json();


        if(token) {
            console.log('redirect the user to the homepage')
            //windows.location.href = localhost:3000/
            localStorage.setItem('userToken', token)
        } else {
            throw Error(err) 
        }
    } catch (err) {
        console.warn(err);
    }
}

async function signup (password, email) {
    e.preventDefault();

    const signUpData = { password, email}
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signUpData)
        }
        
        const response = await fetch(`${url}/users/singup`, options);
        const user = await response.json();

        if(user) { 
            console.log('redirect the user to the homepage')
            //windows.location.href = localhost:3000/
        } else {
            return;
        } 
    } catch (err) {
        console.warn(err);
    }
}

getItem('users',2)
