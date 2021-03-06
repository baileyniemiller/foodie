const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/* 
  In the want.router file, it contains the GET, POST, and DELETE
  routes to handle anything in the user's Want-To-Go List from the
  database. 
*/

// GET /wants
router.get("/:id", (req, res) => {
  console.log("GET /wants/id");
  const userId = req.user.id;
  const queryText = `SELECT * FROM list WHERE (list_type=2 AND user_id=$1) ORDER BY name ASC`;
  const queryValue = [userId];
  pool
    .query(queryText, queryValue)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});
// end GET /wants

// POST /wants
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("POST /wants");
  if (req.isAuthenticated() === false) {
    res.sendStatus(403); //woah woah woah!!! You are not allowed
    return;
  }
  // sample of req.body: {
  //   name: 'Subway'
  //   formatted_address: 1234 5th ave,
  //   rating: 5
  // }
  const newPlace = req.body;
  const user = req.user;
  //set up a query to the list table to insert the user id, list_type, place name, address, and rating
  const queryText = `INSERT INTO "list" ("user_id", "list_type", "name", "address", "rating") VALUES ($1, $2, $3, $4, $5)`;
  //store the query values
  const queryValue = [
    user.id,
    2,
    newPlace.name,
    newPlace.formatted_address,
    newPlace.rating,
  ];
  pool
    .query(queryText, queryValue)
    .then((result) => {
      res.sendStatus(201); //all done, inserted to Want-To-Go's
    })
    .catch((error) => {
      console.log(`Error on query to the list table ${error}`);
      res.sendStatus(500);
    });
});
// end POST /wants

// DELETE /wants
router.delete("/", (req, res) => {
  console.log("DELETE /wants");
  const user = req.user;
  const place = req.body;
  const queryText = 'DELETE FROM "list" WHERE (user_id=$1 AND list_id=$2)';
  const queryValue = [user.id, place.list_id];
  pool
    .query(queryText, queryValue)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error deleting place from wants", error);
      res.sendStatus(500);
    });
});
// end DELETE /wants

module.exports = router;
