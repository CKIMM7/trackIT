const main = document.querySelector('main')
const toDoSection = document.querySelector('#todo-section')
const completedSection = document.querySelector('#completed-section')
const longestStreakSection = document.querySelector('#longest-streak')
const timeLeftSection = document.querySelector('#time-section')
const addHabitForm = document.querySelector('#add-habit-form')
const addHabitBtn = document.querySelector('#add-habit')
const titleInput = document.querySelector('#title')
const descInput = document.querySelector('#desc')
const freqInput = document.querySelector('#freq')


addHabitForm.addEventListener('submit', addHabit)
addHabitBtn.addEventListener('click', showForm)


function showForm (e) {
    e.preventDefault()
    addHabitForm.style.display = 'block';
}


async function addHabit (e) {
    e.preventDefault()

    const globalUser = await getGlobal()
    console.log(globalUser.id)
    data = {
        user_id: globalUser.id,
        name: titleInput.value,
        desc: descInput.value,
        freq: freqInput.value,
        start_date: new Date()
    }
    console.log(data)
    postHabit(data)
}


async function display () {
    const userData = await getGlobal()
    const habits = await getUserHabits(userData.id)
    console.log(habits)
    await checkList(habits)
    await longestStreak(habits)
    await timeBeforeMidnight()

}

// function timeBeforeMidnight() {
//     const midnight = new Date();
//     midnight.setHours(24,0,0,0);
//     const now = new Date()
//     const ran = new Date("2016-07-25T00:00:00Z")
//     const mnafter = ran.setHours(24,0,0,0);
//     const diffInHrs = Math.round((midnight - now) / 36e5 * 10) / 10;
//     const p = document.createElement('p')
//     p.textContent = `${diffInHrs} hours`
//     timeLeftSection.append(p)
//     console.log(diffInHrs)

//     return diffInHrs
// }

async function streakCheck (habits) {
    for(let i = 0; i < habits.length; i++){
        const last_date = new Date(habits[i].last_completed)
        const midnight = last_date.setHours(24,0,0,0);
        const now = new Date()
        let timeToMidnight = Math.round((midnight - now) / 36e5 * 10) / 10;
        
        if (timeToMidnight < 0) habits[i].completed = false

        if(current_count == freq && timeToMidnight > 0 && last_date.getDate() != now.getDate()) {
            habits[i].streak ++
            habits[i].lastcompleted = today
        }
        else if (current_count < freq && timeToMidnight < 0) {
            habits[i].streak = 0
        }
    }

}


async function checkList (data) {
    for(let i = 0; i < data.length; i++){
        const div = document.createElement('div')
        div.className = 'habit'
        div.id = data[i].id
        const name = document.createElement('p')
        name.textContent = data[i].name
        div.append(name)
        if(parseInt(data[i].streak > 1)) {
            const fire_icon = document.createElement('i')
            fire_icon.className = 'fa-solid fa-fire'
            const streak = document.createElement('p')
            streak.textContent = data[i].streak
            div.append(fire_icon)
            div.append(streak)
        }

        data[i].completed === true ? completedSection.append(div) : toDoSection.append(div)

        div.addEventListener('click', () => {goToHabit(div.id)})
    }
}

async function goToHabit (id) {
    console.log(id)
    window.location.href = `/habit/${id}`
}

async function longestStreak (data) {

    const longest = data.sort((a, b) => (a.streak < b.streak) ? 1 : -1)[0]
    console.log(longest)
    if(longest.streak > 1) {
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
    else {
        const div = document.createElement('div')
        div.className = 'habit'
        const name = document.createElement('p')
        name.textContent = 'No current streaks, work hard to get more!'
        const fire_icon = document.createElement('i')
        fire_icon.className = 'fa-solid fa-fire'
        div.append(name)
        div.append(fire_icon)
        longestStreakSection.append(div)
    }
}


display()

