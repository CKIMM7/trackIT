const db = require('../dbConfig');

module.exports = class Habit {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.desc = data.description;
        this.freq = data.frequency;
        this.start_date = data.start_date;
        this.last_completed = data.last_completed;
        this.streak = data.streak;
        this.completed = data.completed;
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query('SELECT * FROM habit;')
                const habits = result.rows.map(data => (new Habit(data)))
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
                const habit = new Habit(result.rows[0])
                resolve(habit)
            } catch (err) {
                console.log(err)
                reject("Error retrieving habit")
            }
        })
    }

    static create (data) {
        return new Promise (async (resolve, reject) => {
            try {
                console.log("---Server----")
                console.log(data)
                const { name, desc, freq, start_date, user_id} = data;
                const result = await db.query(`INSERT INTO habit (name, description, frequency, start_date, last_completed, streak, completed) VALUES ($1, $2, $3, $4, null, null, false) RETURNING *;`, [name, desc, freq, start_date])
                
                console.log(result.rows[0])

                const result2 = await db.query(`INSERT INTO user_habits (user_id, habit_id) VALUES ($1, $2) RETURNING *;`, [user_id, result.rows[0].id])

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
                const { name, desc, freq, start_date, last_completed, streak, completed, id } = data;
                console.log("Updating")
                const result = await db.query(`UPDATE habit SET name = $1, description = $2, frequency = $3, start_date = $4, last_completed = $5, streak = $6, completed = $7 WHERE id = $8;`, [name, desc, freq, start_date, last_completed, streak, completed, id])
                resolve(result.rows[0]);
            } catch (err) {
                reject("Error updating habit")
            }
        })
    }

    delete () {
        return new Promise (async (resolve, reject) => {
            try {
                console.log(`Server delete ${this.id}`)
                const result = await db.query(`DELETE FROM habit WHERE id = $1;`, [this.id])
                resolve("Habit was deleted");
            } catch (err) {
                reject("Error deleting habit")
            }
        })
    }
}
