const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/router');


app.set('view-engine', 'ejs')
app.use(bodyParser.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/', router);
app.use(express.static( __dirname + '/public'));


PORT = process.env.PORT || 8000;



app.listen(PORT, () => {
  console.log(`listening at port: ${PORT}`);
})
