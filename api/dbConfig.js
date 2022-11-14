const { Pool, Client } = require("pg");
const fs = require('fs');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'demo'
  })

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'demo'
  })


client.connect(function(err) {
    if (err) throw err;
    console.log("Client Connected!");
  });  

const seeds = fs.readFileSync(__dirname + '/2_seed.sql').toString();
pool.query(seeds, () => console.log('Dev database seeded'));

module.exports = pool;
