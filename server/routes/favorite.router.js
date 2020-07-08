const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/* 
  In the favorite.router file, it contains the GET, POST, and DELETE
  routes to handle anything in the user's Favorites List from the
  database. 
*/

// GET /favorites
router.get("/:id", (req, res) => {
  console.log("GET /favorite");
  console.log('is authenticated? ', req.isAuthenticated());
  console.log('user ', req.user);
  const userId = req.user.id;
  const queryText = `SELECT * FROM list WHERE (list_type=1 AND user_id=$1) ORDER BY name ASC`;
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
// end GET /favorites


// POST /favorites
router.post("/", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated() === false) {
    res.sendStatus(403); //woah woah woah!!! You are not allowed to see this.
    return;
  }
  // sample of req.body: {
  //   name: 'Subway'
  //   formatted_address: 1234 5th ave,
  //   rating: 5
  // }
  // pull out req.body
  console.log("POST /favorites");
  console.log(req.body);
  console.log('is authenticated? ', req.isAuthenticated());
  console.log('user ', req.user);
  const newPlace = req.body;
  const user = req.user;
  //set up a query to the list table to insert the user id, list_type, place name, address, and rating
  //list_type is 1 because it represents the favorites list
  const queryText = `INSERT INTO "list" ("user_id", "list_type", "name", "address", "rating") VALUES ($1, $2, $3, $4, $5)`;
  //store the query values
  const queryValue = [user.id, 1, newPlace.name, newPlace.formatted_address, newPlace.rating];
  pool
    .query(queryText, queryValue)
    .then((result) => {
      res.sendStatus(201); //all done, inserted
    })
    .catch((error) => {
      console.log(`Error on query to the list table ${error}`);
      res.sendStatus(500);
    });
}); 
// end POST /favorites

module.exports = router;