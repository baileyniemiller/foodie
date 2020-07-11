
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router'); // router for users - registering and logging in
const restaurants = require("./routes/restaurant.router.js"); // router for all of the restaurant results
const favoriteRouter = require("./routes/favorite.router.js"); // router for adding places to favorites list
const wantRouter = require("./routes/want.router.js"); // router for adding places to Want-To-Go list
const nogoRouter = require("./routes/nogo.router.js"); // router for adding places to No-Go list
const profileRouter = require('./routes/profile.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/restaurants', restaurants);
app.use("/favorites", favoriteRouter);
app.use("/wants", wantRouter);
app.use("/nogo", nogoRouter);
app.use('/api/profile', profileRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
