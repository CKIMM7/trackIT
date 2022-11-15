const main = document.querySelector('main')
const editBtn = document.querySelector('#edit-btn');
const passBtn = document.querySelector('#pass-btn');

const editProfSection = document.querySelector('#edit-profile');
const changePassSection = document.querySelector('#change-pass');

editBtn.addEventListener('click', editProfile);
passBtn.addEventListener('click', changePass)

async function displayName(){
    const name = document.querySelector('#profile-name');

}

async function displayEmail(){

}

function editProfile(e){
    e.preventDefault()
    editProfSection.style.display = 'block';
}

function changePass(e){
    e.preventDefault()
    changePassSection.style.display = 'block';
}

async function displayHabits(){

}