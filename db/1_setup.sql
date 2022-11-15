DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_habits;
DROP TABLE IF EXISTS habit;

CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(30) NOT null
);

CREATE TABLE user_habits (
    id serial PRIMARY KEY,
    user_id int,
    habit_id int,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (habit_id) REFERENCES habit(id);
);

CREATE TABLE habit (
    id serial PRIMARY KEY,
    name varchar(30) NOT NULL,
    description varchar(300),
    frequency INT,
    start_date varchar(25),
    last_completed varchar(20),
    streak INT,
    completed boolean
);
