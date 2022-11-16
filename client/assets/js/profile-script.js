const editBtn = document.querySelector('#edit-btn');
const settingsBtn = document.querySelector('#settings-btn');

const editProfSection = document.querySelector('#edit-profile');
const settingsSection = document.querySelector('#settings');

// edit profile & settings btns
const editSubmitBtn = document.querySelector('#edit-profile > #submit-name');
const saveEmailBtn = document.querySelector('#settings > #save-email'); 
const savePassBtn = document.querySelector('#settings > #save');

// cancel buttons
const cancelEditBtn = document.querySelector('#edit-profile > #edit-cancel');
const cancelSettBtn = document.querySelector('#settings > #pass-cancel');

// edit profile & settings var
const nameInput = document.querySelector('#edit-name');
const eEmailInput = document.querySelector('#edit-email');
const oldPassInput = document.querySelector('#oldPass');
const newPassInput = document.querySelector('#newPass');
const samePassInput = document.querySelector('#samePass');

editBtn.addEventListener('click', showProfileForm);
settingsBtn.addEventListener('click', showSettings);

editSubmitBtn.addEventListener('click', updateProfile);
saveEmailBtn.addEventListener('click', updateEmail);
savePassBtn.addEventListener('click', addNewSettings);

cancelEditBtn.addEventListener('click', (e) => editProfSection.style.display = 'none');
cancelSettBtn.addEventListener('click', (e) => settingsSection.style.display = 'none');

const userId = 6;

function editProfile(e){
    e.preventDefault()
    editProfSection.style.display = 'block';
}

async function showProfileForm(e){
    const data = await getItem('users', userId)
    nameInput.value = data.name
    editProfile(e)
}

// when submit pressed update name only
async function updateProfile (e) {
    e.preventDefault()
    console.log('save click')
    const data = await getItem('users', userId);
    data.name = nameInput.value;
    // need to input pass as well cuz update expects pass? n
    console.log(`id: ${data.id} n: ${data.name}, e: ${data.email}, p: ${data.password}`);
    update('users', data); 
}

function settings(e){
    e.preventDefault()
    settingsSection.style.display = 'block';
}

async function showSettings(e){
    const data = await getItem('users', userId);
    eEmailInput.value = data.email;
    settings(e);
}

// need to add compare email not same as someone elses
async function updateEmail(e){
    e.preventDefault()
    console.log('save email')
    const data = await getItem('users', userId);

    // compare email to all users
    const allUsers = await getAll('users');
    let sameEmail = false
    sameEmail = allUsers.map(d => {
        if(eEmailInput.value === d.email) return sameEmail = true;
    })

    if(!sameEmail) {
        console.log('not the same email')
        errMsg(1, sameEmail)  // display err msg if true

        data.email = eEmailInput.value;
        console.log(`n: ${data.name}, e: ${data.email}, p: ${data.password}`);
        await update('users', data)
    } else {
        console.log('same email')
        errMsg(1, sameEmail)
    }
}

//to test original pass is sam / a
//email sam3@gmail.com
async function addNewSettings(e){
    e.preventDefault()
    console.log('click')
    let stop = false

    // repeat passes not same then...
    if(samePassInput.value !== newPassInput.value) stop = errMsg(3, true)
    else stop = errMsg(3, false)
    
    if(!stop){
        const result = await passwordCheck(userId, oldPassInput.value, newPassInput.value)
        console.log(result) // returns undefined
        
        // if return false display an error <<<< still need to fix
        if(!result) {
            console.log('old pass not matched')
            errMsg(2, false)
        }
        else {
            console.log('matched')
            errMsg(2, true)
        }
    }
}

function errMsg(id, bool){
    const htmlTag = document.getElementById(id);
    if(bool) htmlTag.style.display = 'block';
    else htmlTag.style.display = 'none';
    return bool;
}

async function display(){
    const name = document.querySelector('#profile-name');
    const email = document.querySelector('#email');
    const habits = document.querySelector('#habits');

    // gets user name, email and pass
    const userData = await getItem('users', userId);

    name.textContent = userData.name;
    email.textContent = userData.email;

    const userHabits = await getUserHabits(userId);
    habits.textContent = "Habits: " + userHabits.length;
}

display();
