const main = document.querySelector('main')
const editHabitForm = document.querySelector('#edit-habit-form')
const editHabitBtn = document.querySelector('#edit-habit')
const titleInput = document.querySelector('#title-input')
const descInput = document.querySelector('#desc-input')
const freqInput = document.querySelector('#freq-input')
const deleteHabitBtn = document.querySelector('#delete-btn')
const updateBtn = document.querySelector('#update-btn')
const title = document.querySelector('#title')
const desc = document.querySelector('#desc')
const freq = document.querySelector('#freq')
const deadline = document.querySelector('#next-deadline')

const user_id = 2
const habit_id = 2

editHabitBtn.addEventListener('click', showHabitForm)
updateBtn.addEventListener('click', updateHabit)


async function showHabitForm (e) {
    e.preventDefault()
    const data = await getItem('habits', habit_id)
    titleInput.value = data.name
    descInput.value = data.desc
    freqInput.value = data.freq
    editHabitForm.style.display = 'block';

}

async function updateHabit (e) {
    e.preventDefault()
    const data = await getItem('habits', habit_id)
    data.name = titleInput.value
    data.desc = descInput.value
    data.freq = freqInput.value
    update('habits', data)
}

async function nextDeadline (date) {
    console.log(date)
    console.log(Date(date))
}

async function display () {
    const habit = await getItem('habits',habit_id)
    console.log("Client")
    title.textContent = habit.name
    desc.textContent = habit.desc
    freq.textContent = habit.freq
    await nextDeadline(habit.start_date)
    // nextDeadline.textContent = habit.start_date

}


display()
