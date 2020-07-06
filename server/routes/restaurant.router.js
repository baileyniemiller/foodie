const axios = require("axios");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get(`/:input`, (req, res) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.REACT_APP_GOOGLE_KEY}&query=${req.params.input}`
    )
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    });
});

module.exports = router;
