const db = require('../dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SQL = require('sql-template-strings');

module.exports = class User {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
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

    static getUser (id) {
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query(`SELECT * FROM users WHERE id = $1;`, [id])
                // console.log(result)
                const user = result.rows.map(data => ({ id: data.id, name: data.name, email : data.email}))
                resolve(user);
            } catch (err) {
                reject("Error retrieving user")
            }
        })
    }

    static getHabits (id) {
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query('SELECT users.name AS user, habit.* as habit FROM user_habits JOIN users on users.id = user_habits.user_id JOIN habit ON habit.id = user_habits.habit_id WHERE user_id = $1;', [ id ])
                const habits = result.rows.map(data => ({ id: data.id, name: data.name, desc: data.description, freq: data.frequency, start_date: data.start_date, last_completed: data.last_completed, streak: data.streak, completed: data.completed }))
                resolve(habits);
            } catch (err) {
                console.log(err)
                reject("Error retrieving habits")
            }
        })
    }

    // static findHabit () {
        
    // }

    // addHabit (data) {
    //     return new Promise (async (resolve, reject) => {
    //         try {
    //             const { name, desc, freq, start_date} = data;
    //             const result = await db.query(`INSERT INTO habits (name, description, frequency, start_date, last_completed, streak) VALUES ($1, $2, $3, $4, null, null)`, [name, desc, freq, start_date])
    //             resolve(result.rows[0]);
    //         } catch (err) {
    //             console.log(err)
    //             reject("Error creating habit")
    //         }
    //     })
    // }

    // removeHabit (id) {}



    static async login(email, password){
        
        return new Promise (async (resolve, reject) => {

            try {
                const user = await User.findByEmail(email)
                console.log(user);
        
                if(!user){ throw new Error('No user with this email') }

                const authed = await bcrypt.compare(password, user.password)

                //if user authenticates successfully
                if (!!authed){
                    const payload = { user: email };
                    console.log(payload)
                    const secret = 'some_secret'; //load from .env files
                    const options = {expiresIn: 60}
        
                    const token = jwt.sign(payload, secret, options, (err, token) => {
                        if(err){ 
                            throw new Error('No user with this email')
                         }
                        else {
                            resolve(token)
                        }
                    })
 
                } else {
                    throw new Error('Wrong password') 
                }
            } catch (err) {
                reject(err)
            }

        })
    }


    static findByEmail (email) {


        return new Promise (async (resolve, reject) => {
            try {

                const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
                let user = new User(result.rows[0]);
                //console.log(user);
                resolve(user);
                
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    }

    static create(name, email, password){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(SQL`INSERT INTO users (name, email, password)
                VALUES (${name}, ${email}, ${password}) RETURNING *;`);
                let user = new User(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }

    static async signup(name, password, email){
        console.log(name, password, email);

            return new Promise (async (resolve, reject) => {

                try {
                    const salt = await bcrypt.genSalt(12);
                    const hashed = await bcrypt.hash(password, salt)
                    const newUser = await User.create(name, email, hashed)
                    console.log(hashed)
    
                    resolve(newUser);
    
    
                } catch (err) {
                    console.log(err)
                    reject(err);
                }
    
            })
    }

    update(data){
        return new Promise (async (resolve, reject) => {
            try {
                const { id, name } = data;
                const result = await db.query(`UPDATE users SET name = $2 WHERE id = $1;`, [ id, name ])
                resolve(result.rows[0]);
            } catch (err) {
                reject("Error updating user")
            }
        })
    }

    delete(id){
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query(`DELETE FROM users WHERE id = $1;`, [id])
                resolve("User was deleted")
            } catch (err) {
                reject("Error deleting user")
            }
        })
    }
}
