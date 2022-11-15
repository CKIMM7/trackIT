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
    // const User = require('../../../api/models/User');

    // gets user name, email and pass
    const userData = await getUser(userId);
    name.textContent = userData.name;
    email.textContent = userData.email;

    const userHabits = await getHabits(userId);
    habits.textContent = userHabits.habits.length //<<<<

    console.log(userHabits);

    /* cant use user getHabits cuz it gets only 1 habit
    same for habit findHabit
    you can use User getHabits -> grabs all
    */
}

display();
