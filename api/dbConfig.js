const { Pool, Client } = require("pg");
const fs = require('fs');

const pool = new Pool({
    connectionString: process.env.CONNECTIONSTRING,
    ssl: {
      rejectUnauthorized: false
    }
  })

const client = new Client({
  connectionString: process.env.CONNECTIONSTRING,
  ssl: {
    rejectUnauthorized: false
  }
})


client.connect(function(err) {
    if (err) throw err;
    console.log("Postgres Client Connected!");
  });  

// const seeds = fs.readFileSync(__dirname + '/dev_seeds.sql').toString();
// pool.query(seeds, () => console.log('Dev database seeded'));


pool.query(`SELECT * FROM user_habits;`, (err, res) => {
  if (err) {
      console.log("Error - Failed to select all from Users");
      console.log(err);
  }
  else{
      console.log(res.rows);
  }
});


module.exports = pool;
