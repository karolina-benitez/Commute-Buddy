const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  database: 'commutebuddy',
  port: 5432
});

function emptyToNull(value) {
  if (value === "")
    return null;
  return value;
};

//----------Show all Commute Buddy users -----------
app.get('/udata', async (req, res) => {
  const client = await pool.connect();
  client.query('SELECT * FROM udata', function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
      client.release();
    } else {
      res.status(200).json(result.rows);
      client.release();
    }
  });

});

//----------Show individual user data -----------
app.get('/udata/:email', async (req, res) => {

  const client = await pool.connect();

  client.query('SELECT udata.uid, udata.firstname, udata.lastname, udata.email, udata.phonenumber, destinations.address, destinations.arrivedate, destinations.arrivetime, destinations.id FROM udata INNER JOIN destinations ON udata.uid = destinations.uid WHERE email=$1;', [req.params.email], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
      client.release();
    } if (result.rowCount === 0) {
      res.status(404).send("E-mail not found");
      client.release;
    }
    else {
      client.release();
      res.status(200).json(result.rows[0]);
    }
  });
});

//----------- Create New User -----------
app.post('/newUser', async (req, res) => {

  const client = await pool.connect();

  req.body.uid = emptyToNull(req.body.uid);
  req.body.firstname = emptyToNull(req.body.firstname);
  req.body.lastname = emptyToNull(req.body.lastname);
  req.body.phonenumber = emptyToNull(req.body.phonenumber);

  client.query('INSERT INTO udata(uid, firstname, lastname, email, phonenumber) VALUES($1, $2, $3, $4, $5) RETURNING *', [req.body.uid, req.body.firstname, req.body.lastname, req.body.email, req.body.phonenumber],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("Server error: " + err);
        client.release();
      } if (req.body.firstname == null || req.body.lastname == null || req.body.uid == null || req.body.email == null || req.body.phonenumber == null) {
        res.status(400).send("Conflict creating user: All fields are required")
        client.release();
      }
      else {
        res.status(201).json(result.rows[0]);
        client.release();
      }
    });
});

//----------- Update User Info -----------
app.put("/udata/:email", async (req, res) => {

  const client = await pool.connect();

  req.body.firstname = emptyToNull(req.body.firstname);
  req.body.lastname = emptyToNull(req.body.lastname);
  req.body.phonenumber = emptyToNull(req.body.phonenumber);

  client.query('UPDATE udata SET firstname=COALESCE($1,firstname), lastname=COALESCE($2,lastname), phonenumber=COALESCE($3,phonenumber) WHERE email=($4) RETURNING *',
    [req.body.firstname, req.body.lastname, req.body.phonenumber, req.params.email],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("Server error: " + err);
        client.release();
      } else {
        res.status(201).json(result.rows[0]);
        client.release();
      }
    });
});
//----------- User Notification Preferences ------------
app.get('/notifications/:email', async (req, res) => {

  const client = await pool.connect();

  client.query('SELECT udata.trafficalert, udata.weatheralert, udata.eventalert, udata.transitalert, udata.uid, udata.email FROM udata WHERE email=$1;',
    [req.params.email], function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
        client.release();
      } if (result.rowCount === 0) {
        res.status(404).send("Notification preferences not found");
        client.release;
      }
      else {
        client.release();
        res.status(200).json(result.rows[0]);
      }
    });
});

//----------- Set Notification Preferences --------------
app.put('/notifications/:email', async (req, res) => {

  const client = await pool.connect();

  req.body.trafficalert = emptyToNull(req.body.trafficalert);
  req.body.weatheralert = emptyToNull(req.body.weatheralert);
  req.body.eventalert = emptyToNull(req.body.eventalert);
  req.body.transitalert = emptyToNull(req.body.transitalert);

  client.query('UPDATE udata SET trafficalert=COALESCE($1,trafficalert), weatheralert=COALESCE($2,weatheralert), eventalert=COALESCE($3,eventalert), transitalert=COALESCE($4,transitalert) WHERE email=($5) RETURNING *',
    [req.body.trafficalert,
    req.body.weatheralert,
    req.body.eventalert,
    req.body.transitalert,
    req.params.email],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("Server error: " + err);
        client.release();
      } else {
        res.status(201).json(result.rows[0]);
        client.release();
      }
    });
});

//----------- Get User Destination -----------
app.get('/destinations/:email', async (req, res) => {

  const client = await pool.connect();

  client.query('SELECT destinations.uid, destinations.address, destinations.arrivedate, destinations.arrivetime FROM destinations INNER JOIN udata ON udata.uid = destinations.uid WHERE email=$1;',
    [req.params.email], function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
        client.release();
      } if (result.rowCount === 0) {
        res.status(404).send("Destinations not found");
        client.release;
      }
      else {
        client.release();
        res.status(200).json(result.rows[0]);
      }
    });
});

//----------- Add New Destination -----------

app.post('/destinations', async (req, res) => {

  const client = await pool.connect();

  req.body.uid = emptyToNull(req.body.uid);
  req.body.address = emptyToNull(req.body.address);
  req.body.arrivedate = emptyToNull(req.body.arrivedate);
  req.body.arrivetime = emptyToNull(req.body.arrivetime);

  client.query('INSERT INTO destinations(uid, address, arrivedate, arrivetime) VALUES($1, $2, $3, $4) RETURNING *', [req.body.uid, req.body.address, req.body.arrivedate, req.body.arrivetime],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("Server error: " + err);
        client.release();
      } if (req.body.firstname == null || req.body.lastname == null || req.body.uid == null || req.body.email == null || req.body.phonenumber == null) {
        res.status(400).send("Conflict creating destination: All fields are required")
        client.release();
      }
      else {
        res.status(201).json(result.rows[0]);
        client.release();
      }
    });
});

//----------- User start/destination/arrive by -----------

//----------- User Select Route -----------






app.listen(port, () => console.log(`Example app listening on port ${port}!`))

