const db = require('../dbConfig');

module.exports = class Habit {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.desc = data.desc;
        this.freq = data.freq;
        this.start_date = data.start_date;
        this.last_completed = data.last_completed;
        this.streak = data.streak;
        this.completed = data.completed;
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query('SELECT * FROM habit;')
                const habits = result.rows.map(data => ({ id: data.id, name: data.name, desc: data.description, freq: data.frequency, start_date: data.start_date, last_completed: data.last_completed, streak: data.streak, completed: data.completed }))
                resolve(habits);
            } catch (err) {
                console.log(err)
                reject("Error retrieving habits")
            }
        })
    }

    static findHabit(id){
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query(`SELECT * FROM habit WHERE id = $1;`, [id])
                const habit = result.rows.map(data => ({ id: data.id, name: data.name, desc: data.description, freq: data.frequency, start_date: data,start_date, last_completed: data.last_completed, streak: data.streak, completed: data.completed}))
                resolve(habit);
            } catch (err) {
                reject("Error retrieving habit")
            }
        })
    }

    static create (data) {
        return new Promise (async (resolve, reject) => {
            try {
                console.log(data)
                const { name, desc, freq, start_date, user_id} = data;
                const result = await db.query(`INSERT INTO habit (name, description, frequency, start_date, last_completed, streak) VALUES ($1, $2, $3, $4, null, null);`, [name, desc, freq, start_date])
                
                console.log(result.rows[0])

                const result2 = await db.query(`INSERT INTO user_habits (user_id, habit_id) VALUES ($1, $2);`, [user_id, result.rows[0].id])

                resolve(result2.rows[0]);
            } catch (err) {
                console.log(err)
                reject("Error creating habit")
            }
        })
    }

    // markComplete () {}

    // setFrequency () {}

    // setStartDate () {}

    // setLastCompleted () {}

    // setStreak () {}

    // setCompleted () {}

    update (data) {
        return new Promise (async (resolve, reject) => {
            try {
                const { name, desc, freq, start_date, last_completed, streak, id } = data;
                const result = await db.query(`UPDATE habit SET name = $1, description = $2, frequency = $3, start_date = $4, last_completed = $5, streak = $6 WHERE id = $7;`, [name, desc, freq, start_date, last_completed, streak, id])
                resolve(result.rows[0]);
            } catch (err) {
                reject("Error updating habit")
            }
        })
    }

    delete (id) {
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query(`DELETE FROM habit WHERE id = $1;`, [id])
                resolve("Habit was deleted");
            } catch (err) {
                reject("Error deleting habit")
            }
        })
    }
}
