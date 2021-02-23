const express = require('express');
const mongoose = require('mongoose');
const coookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//const authRoutes = require('./routes/authRoutes');

require('./models/user');
require('./services/passport');

const app = express();
// app.get('/', (req, res) => {
//   res.send({hi: 'there'});
// });

app.use(
  coookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
//when we require the authRoutes file it returns a function and calls that fuction app.


mongoose.connect(keys.mongoURI);





const PORT = process.env.PORT || 5000;
app.listen(PORT);
