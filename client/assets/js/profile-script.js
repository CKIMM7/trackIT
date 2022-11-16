const editBtn = document.querySelector('#edit-btn');
const settingsBtn = document.querySelector('#settings-btn');

const editProfSection = document.querySelector('#edit-profile');
const settingsSection = document.querySelector('#settings');

// edit profile & settings btns
const editSubmitBtn = document.querySelector('#edit-profile > #submit-name');
const saveBtn = document.querySelector('#settings > #save');

// cancel buttons
const cancelEditBtn = document.querySelector('#edit-profile > #edit-cancel');
const cancelSettBtn = document.querySelector('#settings > #pass-cancel');

// edit profile & settings var
const nameInput = document.querySelector('#edit-name');
const emailInput = document.querySelector('#edit-email');
const oldPassInput = document.querySelector('#oldPass');
const newPassInput = document.querySelector('#newPass');
const samePassInput = document.querySelector('#samePass');

editBtn.addEventListener('click', showProfileForm);
settingsBtn.addEventListener('click', showSettings);

editSubmitBtn.addEventListener('click', updateProfile);
saveBtn.addEventListener('click', addNewSettings);

cancelEditBtn.addEventListener('click', (e) => editProfSection.style.display = 'none');
cancelSettBtn.addEventListener('click', (e) => settingsSection.style.display = 'none');

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

// when submit pressed update name only
async function updateProfile (e) {
    e.preventDefault()
    console.log('save click')
    const data = await getItem('users', userId);
    data.name = nameInput.value;
    // data.password = emailInput.value;
    // need to input pass as well cuz update expects pass?
    console.log(`dt: ${data.name}, ${data.email}, ${data.password}`);
    update('users', data); //<<< err
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
    
    // add email button...

    // or instead use event listner on input, if still empty highligh in red
    if(oldPassInput.value === null) {
        console.log('old pass empty');
        const markup = `<p>Fill in old password</p>`;
        oldPassInput.insertAdjacentElement('afterend', markup);
    }
    else if(newPassInput.value !== samePassInput.value) {
        console.log('not the same');
        const markup = `<p>Passwords do not match</p>`;
        samePassInput.insertAdjacentElement('afterbegin', markup);
    } else {
        const result = await passwordCheck(5, oldPassInput.value, newPassInput.value)
        console.log(result)
        
        // if return false display an error
        if(!result) {
            const markup = `<p>Old password does not match</p>`;
            //settingsSection.insertAdjacentElement('afterbegin', markup);
        }
        // need check pass before pass below

        // data = {
        //     user_id: userId,
        //     email: emailInput.value,
        //     password: newPassInput.value
        // }

        // console.log('click')

        // update('users', data)
    }
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
