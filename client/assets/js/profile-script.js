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
    data.email = eEmailInput.value;
    console.log(`n: ${data.name}, e: ${data.email}, p: ${data.password}`);
    await update('users', data)
}

//to test original pass is sam / a
async function addNewSettings(e){
    e.preventDefault()
    console.log('click')
    // required or instead use event listner on input, if still empty highligh in red

    const result = await passwordCheck(userId, oldPassInput.value, newPassInput.value)
    console.log('p.result: '+result)
    
    // if return false display an error
    // if(!result) {
    //     const markup = `<p>Old password does not match</p>`;
    //     //settingsSection.insertAdjacentElement('afterbegin', markup);
    // }
    // need check pass before pass below

    // data = {
    //     user_id: userId,
    //     email: eEmailInput.value,
    //     password: newPassInput.value
    // }

    // console.log('click')

    // update('users', data)

}

/* use passwordCheck from User class. if return true change pass
then use the update requests.js to update

for checkpass, send new and old pass to api side, get it to compare inputed old pass with users pass
if true update else error msg
*/

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
