const express = require('express');
const bcrypt = require('bcrypt');
const handler = require('./handler')
const mongodb = require('mongodb');
const mongo = require('./mongo');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs', { name: 'shreesh' })
})
router.get('/login', (req, res) => {
  res.render('login.ejs')
})
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
router.post('/login', async (req, res) => {
  try{
    const hashed = await bcrypt.hash(req.body.password, 10);
    console.log(hashed)
    const db = await mongo.getUserDb();
    db.insertOne({ username:req.body.username, password: hashed });

  } catch(err) {
    console.log(err);
  }
  res.render('login.ejs')
})

module.exports = router
