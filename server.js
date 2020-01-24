const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
// const createError = require('http-errors');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', authRoute);
app.use('/user', userRoute);


const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose.connect('mongodb://localhost:27017/todo', options)
  .catch(error => console.error(error));

mongoose.connection.on('connect', () => console.log('Connected to database'));

mongoose.connection.on('error', error => console.error(error));


const PORT = 1234;

app.listen(PORT, error => {
  if (error) console.log(error);

  console.log(`Server now running on port ${PORT}`);
});
