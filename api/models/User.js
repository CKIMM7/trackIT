const db = require('../dbConfig/init');

module.exports = class User {
    constructor(data){
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.habits = { name: data.habit_name, path: `/habits/${data.habit_id}`};
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query('SELECT * FROM users;')
                const users = result.rows.map(d => ({ id: d.id, email: d.email }))
                resolve(users);
            } catch (err) {
                reject("Error retrieving authors")
            }
        })
    }

    static get user(){

    }

    static findHabits(){

    }

    static findHabit(){
        
    }

    static async login(){

    }

    static async signup(){

    }

    static async editInfo(){

    }

    delete(){

    }
}