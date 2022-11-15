const main = document.querySelector('main')
const editBtn = document.querySelector('#edit-btn');
const passBtn = document.querySelector('#pass-btn');

const editProfSection = document.querySelector('#edit-profile');
const changePassSection = document.querySelector('#change-pass');

editBtn.addEventListener('click', editProfile);
passBtn.addEventListener('click', changePass);

const userId = 1;

function editProfile(e){
    e.preventDefault()
    editProfSection.style.display = 'block';
}

function changePass(e){
    e.preventDefault()
    changePassSection.style.display = 'block';
}

async function display(){
    const name = document.querySelector('#profile-name');
    const email = document.querySelector('#email');
    const habits = document.querySelector('#habits');

    // gets user name, email and pass
    const userData = await getItem('users', userId);
    name.textContent = userData.name;
    email.textContent = userData.email;

    console.log(userData.name)

    // const userHabits = await getUserHabits('users', userId);
    // habits.textContent = userHabits.habits.length //<<<< check this

}

display();
