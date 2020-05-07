const express = require('express');
const bcrypt = require('bcrypt');
const handler = require('./handler')
const mongodb = require('mongodb');
const mongo = require('./mongo');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const initialize = require('../passport-config');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const router = express.Router();

initialize(passport, async (username) => {
  const db = await mongo.getUserDb();
  const User = await db.find({username:username}).toArray()
  return User[0]
}, async(id) => {
  const db = await mongo.getUserDb();
  const UserById = await db.find({id:id}).toArray()
  return UserById[0]
});

router.use(flash());
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());

router.get('/',checkAuthentication, (req, res) => {
  res.render('index.ejs', {
    name: 'shreesh'
  })
})
router.get('/login',checkNotAuthentication, (req, res) => {
  res.render('login.ejs')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))


// router.post('/login', async (req, res) => {
//   try{
//     const hashed = await bcrypt.hash(req.body.password, 10);
//     console.log(hashed)
//     const db = await mongo.getUserDb();
//     db.insertOne({ username:req.body.username, password: hashed });
//
//   } catch(err) {
//     console.log(err);
//   }
//   res.render('login.ejs')
// })

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()) {
    return next()
  } else{
    res.redirect('/login')
  }
}
function checkNotAuthentication(req,res,next){
  if(req.isAuthenticated()) {
    res.redirect('/')
  } else{
    return next()
  }
}

module.exports = router
