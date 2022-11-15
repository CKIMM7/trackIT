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

async function postHabit(data){

    try {
        console.log(JSON.stringify(data))
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        
        const response = await fetch(`${url}/habits`, options);
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
        console.log(`Deleting ${id}`)
        const options = { method: 'DELETE' }
        await fetch(`${url}/habits/${id}`, options);
        // window.location.hash = `#books`
    } catch (err) {
        console.warn(err);
    }
}

async function update (category, data) {
    try {
        const options = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        
        const response = await fetch(`${url}/${category}/${data.id}`, options);
        console.log(response)
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

// async function updateData (data, category) {
//     // e.preventDefault();
//     try {
//         const options = {
//             method: 'PATCH',
//             headers: { "Content-Type": "application/json" },
//             body: data
//         }
        
//         const response = await fetch(`${url}/${category}/${id}`, options);
//         const { id, err } = await response.json();
//         if(err) { 
//             throw Error(err) 
//         } else {
//             // window.location.hash = `#books/${id}`
//         }
//     } catch (err) {
//         console.warn(err);
//     }
// }

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

// login();

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

    } catch (err) {
        console.warn(err);
    }
}

async function passwordCheck(id, oldPass, newPass){
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id, oldPass, newPass})
        }
        const response = await fetch(`${url}/users/passwordcheck`, options);
        await response.json()
        // console
    } catch(err){
        console.log(err)
        console.warn(err)
    }
}

//signup('newUser', `password`, `444@hotmail.com`)
