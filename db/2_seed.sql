INSERT INTO users (name, email, password) 
VALUES
    ('Beth', 'beth121@hotmail.com', 'password'),
    ('Tom', 'tomriddle190@gmail.com', 'pass1'),
    ('Katie', 'katie@me.com', 'pass2');

INSERT INTO user_habits (user_id, habit_id) 
VALUES
    (1, 1), 
    (2, 2), 
    (2, 3),
    (3, 4);

INSERT INTO habit (name, description, frequency, current_count, start_date, streak, completed)
VALUES
    ( 'Drink h20 a day', null, 1, 0, '2022-11-01', 3, false ),
    ( 'Gym', 'Hit 7 stones', 3, 2, '2022-10-01', 5, false ),
    ( 'Read chapter a day', null, 1, 1, '2022-09-30', 3, true ),
    ( 'No caffiene =v=', null, 2, 0,'2022-09-30', null,  false );
