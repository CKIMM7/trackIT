const db = require('../dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                const user = result.rows.map(data => ({ id: data.id, name: data.name, email : data.email}))
                resolve(user);
            } catch (err) {
                reject("Error retrieving user")
            }
        })
    }

    static findHabits () {
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query('SELECT users.name AS user, habits.* as habit FROM user_habits JOIN users on users.id = user_habits.user_id JOIN habits ON habits.id = user_habits.habit_id WHERE user_id = $1;', [ id ])
                const habits = result.rows.map(data => ({ id: data.id, name: data.name, desc: data.desc }))
                resolve(habits);
            } catch (err) {
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

    static findByEmail (email) {
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
                const user = result.rows.map(data => ({ id: data.id, name: data.name, email : data.email}))
                resolve(user);
            } catch (err) {
                reject("Error retrieving user")
            }
        })
    }


    static async login(email, password){
        
        return new Promise (async (resolve, reject) => {

            try {
                const user = await User.findByEmail(email)
                console.log(user);
        
                if(!user){ throw new Error('No user with this email') }
                const authed = bcrypt.compare(password, user.passwordDigest)
                if (!!authed){
                    const payload = {
                        user: user.username
                    };
        
                    const secret = 'some_secret'; //load from .env files
                    console.log(secret);
        
                    const options = {
                        expiresIn: 60
                    }
        
                    const token = await jwt.sign(payload, secret, options)
                    resolve(token)
                } else {
                    throw new Error('User could not be authenticated')  
                }
            } catch (err) {
                reject(err)
            }

        })
    }


    static create(email, password){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.run(SQL`INSERT INTO users (email, password)
                VALUES (${email}, ${password}) RETURNING *;`);
                let user = new User(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }

    static async signup(password, userInfo){

        return new Promise (async (resolve, reject) => {

            try {
                const salt = await bcrypt.genSalt(12);
                const hashed = await bcrypt.hash(password, salt)
                const newUser = await User.create(email, hashed)
                resolve(newUser);

            } catch (err) {
                reject(err);
            }

        })
    }

    update(){
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
