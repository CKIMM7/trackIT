const main = document.querySelector('main')
const editBtn = document.querySelector('#edit-btn');
const settingsBtn = document.querySelector('#settings-btn');

const editProfSection = document.querySelector('#edit-profile');
const settingsSection = document.querySelector('#settings');

const submitBtn = document.querySelector('#edit-profile > submit');

editBtn.addEventListener('click', showProfileForm);
settingsBtn.addEventListener('click', settings);
// submitBtn.addEventListener('submit', updateProfile);

const userId = 1;

function editProfile(e){
    e.preventDefault()
    editProfSection.style.display = 'block';
}

async function showProfileForm(e){
    const nameInput = document.querySelector('#edit-name');
    // const emailInput = document.querySelector('#edit-email');

    const data = await getItem('users', userId)
    console.log(data)
    console.log('asdasd')
    nameInput.value = data.name
    editProfile(e)
}

async function updateProfile (e) {
    // when submit pressed update name
    
}

function settings(e){
    e.preventDefault()
    settingsSection.style.display = 'block';
}

async function checkPass(){
    
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
