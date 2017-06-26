const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const parseurl = require('parseurl');
const playController = require('./controllers/play-controllers');
const welcomeController = require('./controllers/welcome-controllers');

const app = express();
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//req game object

//middleware
  //set session
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));

  //store computerWord in session
    //needs to access the game obj in order to choose word. game.chooseWord() if no word in the session
  // app.use((req, res, next) => {
  //   let storedWord = req.session.store;
  //   storedWord = computerWord;
  //   next();
  // });

  //store guesses in session
  // app.use((req, res, next) => {
  //   let storedGuesses = req.session.store;
  //   storedGuesses = numGuesses;
  //   next();
  // });

  //require playerName
  // app.use((req, res, next) => {
  //   let pathname = parseurl(req).pathname;
  //   if (!req.session.user && pathname != '/welcome'){
  //     res.redirect('/welcome');
  //   } else {
  //     next();
  //   }
  // })

//set endpoints
  app.get('/', (req, res) => {
    res.redirect('/welcome');
  });

  app.get('/welcome', welcomeController.display);

  app.get('/play', playController.display);

  //welcome form
  app.post('/welcome', welcomeController.submitName);

  app.post('/play', playController.play);


app.listen(3000);
