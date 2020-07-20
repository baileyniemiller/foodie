const request = require('supertest');
const app = require('express');

test ('GET to /favorites/id', () => {
  request(app)
  .get("/favorites/:id")
  .expect("Content-Type", /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
    done();
  });
})