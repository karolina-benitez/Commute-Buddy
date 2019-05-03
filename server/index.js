// npm init
// npm install nodemon

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require('pg').Pool
const pool = new Pool({
  // user: 'me',
  host: 'localhost',
  database: 'commutebuddy',
  port: 5432
});

//~~~~~~routes~~~~~~~~~~
// MAINPAGE = '/main';
// NOTIFICATIONS = '/notifications';
// SELECTEDROUTE = '/selected-route';
// SIGNIN = '/signin';
// USERSETTINGS = '/settings'; 


//----------Show user data-----------
app.get("/udata/:email", async (req, res) => {
  const client = await pool.connect();
  let userdata = await client.query("SELECT udata.uid, udata.firstname, udata.lastname, udata.email, udata.phonenumber, destinations.address, destinations.arrivedate, destinations.arrivetime FROM udata INNER JOIN destinations ON udata.uid = destinations.uid WHERE email=$1;",
    [
      req.params.email
    ]
  );
  client.release();
  res.json(userdata.rows);
  // used to be (userdata.rows[0].rows) //SELECT * FROM udata WHERE uid=$1;
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

