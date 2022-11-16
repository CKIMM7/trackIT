
const main = document.querySelector('main')
const toDoSection = document.querySelector('#todo-section')
const completedSection = document.querySelector('#completed-section')
const longestStreakSection = document.querySelector('#longest-streak')
const deadlinesSection = document.querySelector('#deadlines')
const addHabitForm = document.querySelector('#add-habit-form')
const addHabitBtn = document.querySelector('#add-habit')
const titleInput = document.querySelector('#title')
const descInput = document.querySelector('#desc')
const freqInput = document.querySelector('#freq')
const deleteHabitBtn = document.querySelector('#delete-btn')


const user_id = 2
const habit_id = 2

addHabitForm.addEventListener('submit', addHabit)
addHabitBtn.addEventListener('click', showForm)


function showForm (e) {
    e.preventDefault()
    editHabitForm.style.display = 'block';
}

async function showHabitForm (e) {
    e.preventDefault()
    const data = await getItem('habits',habit_id)
    titleInput.value = data.name
    descInput.value = data.desc
    freqInput.value = data.freq
    showForm(e)

}

async function addHabit (e) {
    e.preventDefault()
    data = {
        user_id: user_id,
        name: titleInput.value,
        desc: descInput.value,
        freq: freqInput.value,
        start_date: new Date()
    }
    console.log(data)
    postHabit(data)
}

async function updateHabit (e) {
    e.preventDefault()
    const data = await getItem('habits', habit_id)
    data.name = titleInput.value
    data.desc = descInput.value
    data.freq = freqInput.value
    update('habits', data)
}

async function display () {
    const habits = await getUserHabits(user_id)
    console.log("Client")
    console.log(await getItem('users',1))
    await checkList(habits)
    await longestStreak(habits)
    // await deadlines()
    
}

// async function streakCheck () {
//     if(new Date () < (lastcompleted + freq)) {}
//     else streak = 0
// }

// async function pseudo () {
//     const lastcompleted;
//     if (habit.last_completed) lastcompleted = habit.last_completed
//     else lastcompleted = start_date
//     if(new Date () < (lastcompleted + freq)) {
//         streak + 1
//         completed = !completed
//         lastcompleted = today
//     }
// }

// async function changeColumn (habit_id) {
//     const data = await getItem('habits', habit_id)

//     if (data.completed === false) data.last_completed = new Date()   
//     data.completed = !data.completed

//     await update('habits', data)
//     location.reload()
// }

async function checkList (data) {
    for(let i = 0; i < data.length; i++){
        const div = document.createElement('div')
        div.className = 'habit'
        div.id = data[i].id
        const name = document.createElement('p')
        name.textContent = data[i].name
        const fire_icon = document.createElement('i')
        fire_icon.className = 'fa-solid fa-fire'
        const streak = document.createElement('p')
        streak.textContent = data[i].streak
        div.append(name)
        div.append(fire_icon)
        div.append(streak)
        data[i].completed === true ? completedSection.append(div) : toDoSection.append(div)

        div.addEventListener('click', () => {goToHabit(div.id)})
    }
}

// async function goToHabit (id) {
//     if ()
// }

async function longestStreak (data) {

    const longest = data.sort((a, b) => (a.streak < b.streak) ? 1 : -1)[0]
    console.log(longest)
    const div = document.createElement('div')
    div.className = 'habit'
    const name = document.createElement('p')
    name.textContent = longest.name
    const fire_icon = document.createElement('i')
    fire_icon.className = 'fa-solid fa-fire'
    const streak = document.createElement('p')
    streak.textContent = longest.streak
    div.append(name)
    div.append(fire_icon)
    div.append(streak)
    longestStreakSection.append(div)
}

async function deadlines () {}

display()
