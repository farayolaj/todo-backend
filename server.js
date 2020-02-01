const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
//const asyncHandler = require('express-async-handler');
const createError = require('http-errors');


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

/*app.get('/', (req, res, next) => {
  throw createError('Here is the little devil😈');
});*/

// Logging the error
app.use((error, req, res, next) => {
  console.log('Error status: ', error.status);
  console.log('Message: ', error.message);

  // Sets HTTP status code
  res.status(error.status||500);

  // Sends response
  res.json({
    status: error.status||500,
    message: error.message,
    stack: error.stack
  });
});

app.listen(PORT, error => {
  if (error) console.log(error);

  console.log(`Server now running on port ${PORT}`);
});

