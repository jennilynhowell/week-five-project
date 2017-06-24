const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const parseurl = require('parseurl');

const app = express();
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//computer picks a random word
const WORDS = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

//get a random word
let word = '';
let chooseWord = function(){
  let pickedWord = '';
  let randomIndex = Math.floor(Math.random() * WORDS.length);
  pickedWord = WORDS[randomIndex];
  //check word for length
  if (pickedWord.length <= 8 && pickedWord.length >= 4){
    word = pickedWord;
    return word;
  } else {
    return chooseWord();
  }
};

//variables for game play
let computerWord = chooseWord();
let playerName = '';
let arrayBlanks = [];
let wordArray = Array.from(computerWord);
console.log('wordArray ', wordArray);
let triedLetters = [];
let numGuesses = 8;
console.log('guesses: ', numGuesses);

//middleware
  //set session
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));

  //store computerWord in session
  app.use((req, res, next) => {
    let storedWord = req.session.store;
    storedWord = computerWord;
    next();
  });

  //store guesses in session
  app.use((req, res, next) => {
    let storedGuesses = req.session.store;
    storedGuesses = numGuesses;
    next();
  });

  //require playerName
  app.use((req, res, next) => {
    let pathname = parseurl(req).pathname;
    if (!req.session.user && pathname != '/welcome'){
      res.redirect('/welcome');
    } else {
      next();
    }
  })

//set endpoints
  app.get('/', (req, res) => {
    res.redirect('/welcome');
  });

  app.get('/welcome', (req, res) => {
    res.render('welcome', {});
  });

  app.get('/play', (req, res) => {
    for (let i = 0; i < computerWord.length; i++) {
      arrayBlanks[i] = '_';
    };

    let context = {
      numGuesses: numGuesses,
      playerName: playerName,
      arrayBlanks: arrayBlanks
    };

    res.render('play', context);
  });

  //welcome form
  app.post('/welcome', (req, res) => {
    //capture player name
    playerName = req.body.name;
    if (playerName) {
      req.session.user = playerName;
    };

    if(req.session.user){
      res.redirect('/play');
    } else {
      res.redirect('/welcome');
    }

  });

  //guessing form
  app.post('/play', (req, res) => {
    let counter = 0;
    let repeats = [];
    let letterGuess = req.body.guess;
    letterGuess = letterGuess.toLowerCase();
    triedLetters.push(letterGuess);
    console.log('tried: ', triedLetters);

    for (let i = 0; i < wordArray.length; i++) {
      counter ++;

      //if no match, check for duplicates
      if (letterGuess !== wordArray[i]){
        for (let i = 0; i < triedLetters.length; i++) {
          if (triedLetters[i] === letterGuess) {
            repeats.push(letterGuess);
            console.log('repeats: ', repeats);
          } else {
            numGuesses --;
          }
        };
      } else if (letterGuess === wordArray[i]) {
        arrayBlanks[counter - 1] = letterGuess;
        console.log(arrayBlanks);
      }
    };


    // if (letterGuess !== wordArray[i] && triedLetters.length > 1) {
    //   for (let i = 0; i < triedLetters.length; i++) {
    //     if (letterGuess.toUpperCase() == triedLetters[i]) {
    //       repeat = letterGuess;
    //       console.log('repeat: ', repeat);
    //     };
    //   }
    // }


    let context = {
      playerName: playerName,
      arrayBlanks: arrayBlanks,
      triedLetters: triedLetters,
      // repeatLetters: repeatLetters
      // numGuesses: numGuesses
    }

    res.render('play', context);
  });


app.listen(3000);
