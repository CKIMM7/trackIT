const editBtn = document.querySelector('#edit-btn');
const settingsBtn = document.querySelector('#settings-btn');

const editProfSection = document.querySelector('#edit-profile');
const settingsSection = document.querySelector('#settings');

// edit profile & settings btns
const editSubmitBtn = document.querySelector('#edit-profile > #submit-name');
const saveBtn = document.querySelector('#settings > #save');

// edit profile & settings var
const nameInput = document.querySelector('#edit-name');
const emailInput = document.querySelector('#edit-email');
const oldPassInput = document.querySelector('#oldPass');
const newPassInput = document.querySelector('#newPass');
const samePassInput = document.querySelector('#samePass');

editBtn.addEventListener('click', showProfileForm);
settingsBtn.addEventListener('click', showSettings);

editSubmitBtn.addEventListener('submit', updateProfile);
saveBtn.addEventListener('click', addNewSettings);

const userId = 1;

function editProfile(e){
    e.preventDefault()
    editProfSection.style.display = 'block';
}

async function showProfileForm(e){
    const data = await getItem('users', userId)
    nameInput.value = data.name
    editProfile(e)
}
// when submit pressed update name
async function updateProfile (e) {
    e.preventDefault()
    // update('habits', data)
}

function settings(e){
    e.preventDefault()
    settingsSection.style.display = 'block';
}

async function showSettings(e){
    const data = await getItem('users', userId);
    emailInput.value = data.email;
    settings(e);
}

async function addNewSettings(e){
    e.preventDefault()
    console.log('click')

    const result = await passwordCheck(oldPassInput, samePassInput)
    console.log(result)
    
    // if(result) {

    // }
    // need check pass before pass below

    // data = {
    //     user_id: userId,
    //     email: emailInput.value,
    //     password: newPassInput.value
    // }

    // console.log('click')

    // update('users', data)
}

/* use passwordCheck from User class. if return true change pass
then use the update requests.js to update

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
