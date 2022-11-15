async function getAll(category){
    try {
        const response = await fetch(`https://trackit-sillicon-alley.herokuapp.com/${category}`);
        const data = await response.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getItem(category, id) {
    try {
        const response = await fetch(`https://trackit-sillicon-alley.herokuapp.com/${category}/${id}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getUserHabits (id) {
    try {
        const response = await fetch(`https://trackit-sillicon-alley.herokuapp.com/users/${id}/habits`);
        const data = await response.json();
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
        
        const response = await fetch('https://trackit-sillicon-alley.herokuapp.com/habits', options);
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
        await fetch(`https://trackit-sillicon-alley.herokuapp.com/habits/${id}`, options);
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
        
        const response = await fetch(`https://trackit-sillicon-alley.herokuapp.com/${category}/${id}`, options);
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
        
        const response = await fetch(`http://localhost:3000/users/login`, options);
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

login();

async function signup (name, password, email) {
    //e.preventDefault();

    const signUpData = { name, password, email}
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signUpData)
        }
        
        const response = await fetch(`http://localhost:3000/users/signup`, options);
        const user = await response.json();
        console.log(user)

    } catch (err) {
        console.warn(err);
    }
}

//signup('newUser', `password`, `444@hotmail.com`)
