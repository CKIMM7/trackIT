const main = document.querySelector('main')
const toDoSection = document.querySelector('#todo-section')
const completedSection = document.querySelector('#completed-section')
const longestStreakSection = document.querySelector('#longest-streak')
const deadlinesSection = document.querySelector('#deadlines')

async function display () {
    const habits = await getUserHabits(1)
    console.log("Client")
    console.log(habits)
    await checkList(habits)
    await longestStreak(habits)
    
}

async function changeColumn (habit_id) {
    const data = getUser(2)
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

display()
