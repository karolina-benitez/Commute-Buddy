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

  // SELECT udata.uid, udata.firstname, udata.lastname, udata.email, udata.phonenumber, trips.origin, trips.destination, destinations.arrivedate FROM udata INNER JOIN trips ON udata.uid = trips.uid WHERE email=$1;'

  client.query('SELECT udata.uid, udata.firstname, udata.lastname, udata.email, udata.phonenumber FROM udata WHERE email=$1;', [req.params.email], function (err, result) {
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
      res.status(200).json(result.rows);
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
  req.body.email = emptyToNull(req.body.email);
  req.body.trafficalert = emptyToNull(req.body.trafficalert);
  req.body.weatheralert = emptyToNull(req.body.weatheralert);
  req.body.eventalert = emptyToNull(req.body.eventalert);
  req.body.transitalert = emptyToNull(req.body.transitalert);

  client.query('INSERT INTO udata(uid, firstname, lastname, phonenumber, email, trafficalert, weatheralert, eventalert, transitalert) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [req.body.uid, req.body.firstname, req.body.lastname, req.body.phonenumber, req.body.email, req.body.trafficalert, req.body.weatheralert, req.body.eventalert, req.body.transitalert],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("Server error: " + err);
        client.release();
      } if (req.body.firstname == null || req.body.lastname == null || req.body.uid == null || req.body.email == null || req.body.phonenumber == null || req.body.trafficalert == null || req.body.weatheralert == null || req.body.eventalert == null || req.body.transitalert == null) {
        res.status(400).send("Conflict creating user: All fields are required")
        client.release();
      }
      else {
        res.status(201).json(result.rows);
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
  req.body.trafficalert = emptyToNull(req.body.trafficalert);
  req.body.weatheralert = emptyToNull(req.body.weatheralert);
  req.body.eventalert = emptyToNull(req.body.eventalert);
  req.body.transitalert = emptyToNull(req.body.transitalert);

  client.query('UPDATE udata SET firstname=COALESCE($1,firstname), lastname=COALESCE($2,lastname), phonenumber=COALESCE($3,phonenumber),trafficalert=COALESCE($4,trafficalert), weatheralert=COALESCE($5,weatheralert), eventalert=COALESCE($6,eventalert), transitalert=COALESCE($7,transitalert) WHERE email=($8) RETURNING *',
    [req.body.firstname,
    req.body.lastname,
    req.body.phonenumber,
    req.body.trafficalert,
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
        res.status(201).json(result.rows);
        client.release();
      }
    });
});

// //----------- Set Notification Preferences --------------
// app.put('/notifications/:email', async (req, res) => {

//   const client = await pool.connect();



//   client.query('UPDATE udata SET trafficalert=COALESCE($1,trafficalert), weatheralert=COALESCE($2,weatheralert), eventalert=COALESCE($3,eventalert), transitalert=COALESCE($4,transitalert) WHERE email=($5) RETURNING *',
//     [req.body.trafficalert,
//     req.body.weatheralert,
//     req.body.eventalert,
//     req.body.transitalert,
//     req.params.email],
//     function (err, result) {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Server error: " + err);
//         client.release();
//       } else {
//         res.status(201).json(result.rows[0]);
//         client.release();
//       }
//     });
// });

// ----------- Get Trips ----------- //TODO: create trips route
app.get('/trips/:email', async (req, res) => {
  const client = await pool.connect();

  client.query('SELECT trips.uid, trips.originaddress, trips.destinationaddress, trips.departdate, trips.arrivedate FROM trips INNER JOIN udata ON udata.uid = trips.uid WHERE email=$1;',
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
        res.status(200).json(result.rows);
      }
    });
});

//----------- Add New Trip ----------- TODO: create trips route

app.post('/newTrip', async (req, res) => {

  const client = await pool.connect();

  req.body.uid = emptyToNull(req.body.uid);
  req.body.originid = emptyToNull(req.body.originid);
  req.body.originaddress = emptyToNull(req.body.originaddress);
  req.body.destinationid = emptyToNull(req.body.destinationid);
  req.body.destinationaddress = emptyToNull(req.body.destinationaddress);
  req.body.departDate = emptyToNull(req.body.departDate);
  req.body.arriveDate = emptyToNull(req.body.arriveDate);

  client.query('INSERT INTO trips(uid, originid, originaddress,  destinationid, destinationaddress, departDate, arriveDate) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [req.body.uid, req.body.originid, req.body.originaddress, req.body.destinationid, req.body.destinationaddress, req.body.departDate, req.body.arriveDate],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send("Server error: " + err);
        client.release();
        // } if (req.body.uid == null || req.body.originId == null || req.body.destinationId == null || req.body.departDate == null || req.body.arriveDate == null) {
        //   res.status(400).send("Conflict creating destination: All fields are required")
        //   client.release();
      } else {
        res.status(201).json(result.rows[0]);
        client.release();
      }
    });
});

//----------- User start/destination/arrive by ----------- TODO: create trips route

// app.post('/setdestination', async (req, res) => {

//   const client = await pool.connect();

//   req.body.uid = emptyToNull(req.body.uid);
//   req.body.address = emptyToNull(req.body.address);
//   req.body.arrivedate = emptyToNull(req.body.arrivedate);
//   req.body.arrivetime = emptyToNull(req.body.arrivetime);

//   client.query('INSERT INTO destinations(uid, address, arrivedate, arrivetime) VALUES($1, $2, $3, $4) RETURNING *', [req.body.uid, req.body.address, req.body.arrivedate, req.body.arrivetime],
//     function (err, result) {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Server error: " + err);
//         client.release();
//       } if (req.body.uid == null || req.body.address == null || req.body.arrivedate == null || req.body.arrivetime == null) {
//         res.status(400).send("Conflict creating route: All fields are required")
//         client.release();
//       }
//       else {
//         res.status(201).json(result.rows[0]);
//         client.release();
//       }
//     });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

