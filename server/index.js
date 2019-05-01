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
app.get("/udata", async (req, res) => {
  const client = await pool.connect();
  let userdata = await client.query("SELECT * FROM udata;"
    // let userdata = await client.query("SELECT * FROM udata WHERE uid=$1;",    **this will retreive only uid data
    // [
    //   req.params.uid
    // ]
  );
  client.release();
  res.json(userdata.rows);
  // used to be (userdata.rows[0].rows)
});

//----------Show user addresses-----------
app.get("/useraddresses", async (req, res) => {
  const client = await pool.connect();
  let useraddresses = await client.query("SELECT * FROM destinations;");
  client.release();
  res.json(useraddresses.rows[0]);
  // res.json(useraddresses.rows);
});

//----------Show a list of all cohorts-----------
app.get("/cohorts", async (req, res) => {
  const client = await pool.connect();
  let databaseItems = await client.query("SELECT year, city from cohortInfo;");
  client.release();
  res.json(databaseItems.rows);
});

//---------Add one new apprentice---------
app.post("/apprentices", async (req, res) => {
  const client = await pool.connect();
  await client.query(
    "INSERT INTO apprenticeInfo(firstName, lastName, cohortID) VALUES($1, $2, $3) RETURNING *",
    [req.body.firstName, req.body.lastName, req.body.cohortID]
  );
  let databaseItems = await client.query("SELECT * FROM apprenticeInfo");
  client.release();
  res.json(databaseItems.rows);
});
//---------Find Apprentice by ID ---------
app.get("/apprentices/:userID", async (req, res) => {
  const client = await pool.connect();
  var databaseItems = await client.query("SELECT * FROM apprenticeInfo WHERE userID=$1", [
    req.params.userID
  ]);
  client.release();
  res.json(databaseItems.rows[0]);
});
//---------delete one item from database---------
app.delete("/apprentices/:userid", async (req, res) => {
  const client = await pool.connect();
  var dataToDelete = client.query(function (dataFunc) {
    return req.params.userid == dataFunc.userid;
  });
  res.json(dataToDelete);
  var found = await client.query("DELETE FROM apprenticeInfo WHERE userid = $1", [
    req.params.userid
  ]);
  client.release();
});

//---------edit one apprentice---------
app.put("/apprentices/:userid", async (req, res) => {
  const client = await pool.connect();
  var oldData = client.query(function (dataFunc) {
    return req.params.userid == dataFunc.userid;
  });
  oldData.firstName = req.body.firstName;
  oldData.lastName = req.body.lastName;
  oldData.cohortID = req.body.cohortID;
  res.json(oldData);
  var found = await client.query("SELECT * FROM apprenticeInfo WHERE userID=$1", [
    req.params.userID
  ]);
  await client.query(
    "UPDATE apprentices SET firstName = ($1),lastName = ($2), cohortID = ($3) WHERE userID = ($4) RETURNING *",
    [req.body.firstName, req.body.lastName, req.body.cohortID, req.params.userID]
  );
  client.release();
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))

