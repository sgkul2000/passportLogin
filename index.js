const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/router');
const passport = require('passport')
const initPassport = require('./passport.config')

app.use(bodyParser.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/', router);
app.use(express.static( __dirname + '/public'));


PORT = process.env.PORT || 8000;



app.listen(PORT, () => {
  console.log(`listening at port: ${PORT}`);
})
