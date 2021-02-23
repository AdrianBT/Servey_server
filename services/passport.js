const passport = require('passport'); //gives express the idea of handling authentfication
const Googlestrategy = require('passport-google-oauth20').Strategy; // use to imstruct passport on how to use google oauth
//import express from 'express';
const mongoose = require('mongoose');
const keys = require('../config/keys');
// ./ means look in the directory. so we added another . to say go up one directory into the server folder into the config folder to find the Keys


const User = mongoose.model('users');


passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
    });
});



passport.use(
  new Googlestrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          // we already have a record with the give profile id
          done(null, existingUser);
        } else {
          // we dont have a user record with this id to make a new record.
          new User({ googleIdL: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
   }
 )
);
// //craetes a new instant of the google passport stragtegy
// passport i want you to use and recgonize this stragtegy
//Im know as a stragtegy called google so when you load me up when someone ask me to authenticate with google use me
