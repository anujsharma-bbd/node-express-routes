// run `node index.js` in the terminal

// console.log(`Hello Node.js v${process.versions.node}!`);

const http = require('http');
const cors = require('cors');
var bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

var express = require('express');
var app = express();

var widgetsRoutes = require('./widgets/widgets.routes.js');

const PORT = 7000;

app.use(cors());
app.options('*', cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 200, // limit each IP to 200 requests per windowMs
  handler: function (req, res /*next*/) {
    return res.status(429).json({
      error: 'You sent too many requests. Please wait a while then try again',
    });
  },
});
app.use(apiRequestLimiter);

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/widgets', widgetsRoutes);

app.get('/widgets2', () => {});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('*/search/:text*', (req, res) => {
  console.log(req.params);
  res.send('Hello World!');
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
