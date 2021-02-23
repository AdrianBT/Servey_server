const passport = require('passport');
// added here since we are using passport in app.get

module.exports = (app) => {
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
//we are now exporting a fuction from a file.
// (route handler) whenever someone vists the route auth/google do this.
// The scope specfic to google what objects they want.

app.get('/auth/google/callback', passport.authenticate('google'));
// trying to get the code and trade for the actual profile. so it will try to load the profile.

app.get('./api/current_user', (req, res) => {
    res.send(req.user);
}); 

};
