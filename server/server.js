let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const createError = require('http-errors');
const { connect, disconnect } = require('./database/db');
const path = require('path')
const sign = require("./routes/sign");
const transaction = require("./routes/transaction");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.options('*', cors()) // include before other routes
app.use(cors())
connect();
app.use("/", sign);
app.use("/", transaction);

//server.js-> routess-> controller->service->repository
// model

app.get('/', (req, res) => {
  res.send('Server is up and running!')
});

// static files

app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function (req,res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})


// PORT 
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});