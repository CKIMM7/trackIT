
const main = document.querySelector('main')
const toDoSection = document.querySelector('#todo-section')
const completedSection = document.querySelector('#completed-section')
const longestStreakSection = document.querySelector('#longest-streak')
const deadlinesSection = document.querySelector('#deadlines')
const habitForm = document.querySelector('#habit-form')
const addHabitBtn = document.querySelector('#add-habit')
const titleInput = document.querySelector('#title')
const descInput = document.querySelector('#desc')
const freqInput = document.querySelector('#freq')
const deleteHabitBtn = document.querySelector('#delete-btn')

const user_id = 2
const habit_id = 7

// habitForm.addEventListener('submit', addHabit)
// addHabitBtn.addEventListener('click', showForm)
deleteHabitBtn.addEventListener('click', () => {deleteHabit(habit_id); console.log('clicked')})

function showForm (e) {
    e.preventDefault()
    habitForm.style.display = 'block';
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

async function display () {
    const habits = await getUserHabits(user_id)
    console.log("Client")
    console.log(habits)
    await checkList(habits)
    await longestStreak(habits)
    // await deadlines()
    
}

async function changeColumn (habit_id) {
    const data = getUser(user_id)
    data.completed = !data.completed
    updateData('users', data)
}

async function checkList (data) {
    for(let i = 0; i < data.length; i++){
        const div = document.createElement('div')
        div.className = 'habit'
        div.id = i
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
    }
}

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

// display()
