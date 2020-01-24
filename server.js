const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
// const createError = require('http-errors');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', authRoute);
app.use('/user', userRoute);

const PORT = 1234;

app.listen(PORT, error => {
  if (error) console.log(error);

  console.log(`Server now running on port ${PORT}`);
});
