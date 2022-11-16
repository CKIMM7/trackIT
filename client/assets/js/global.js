console.log('global')

async function getHabit(id) {
    try {

        data = {
            habit_id: id,
            token: document.cookie.match('(^|;)\\s*' + 'access_token' + '\\s*=\\s*([^;]+)')?.pop()
        }
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }
        
        const response = await fetch(`${url}/habits/${id}`, options);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getGlobal() {
    console.log('getGlobal')
    try {

        let token = document.cookie.match('(^|;)\\s*' + 'access_token' + '\\s*=\\s*([^;]+)')?.pop()
        console.log(JSON.stringify(token))

        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({token})
        }
        
        const response = await fetch(`http://localhost:3000/auth`, options);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.warn(err);
    }
}

getGlobal();
