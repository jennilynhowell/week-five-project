const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
// ??? const parseurl = require('parseurl');

const app = express();
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//computer picks a random word
const WORDS = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

let word = '';

//get a random word
let chooseWord = function(){
  let pickedWord = '';
  let randomIndex = Math.floor(Math.random() * WORDS.length);
  pickedWord = WORDS[randomIndex];
  console.log('pickedWord: ', pickedWord);
  //check word for length
  if (pickedWord.length <= 8 && pickedWord.length >= 4){
    word = pickedWord;
    console.log('word in func: ', word);
    return word;
  } else {
    return chooseWord();
  }
};

let computerWord = chooseWord();

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

//arrays holding letters/blanks
let arrayBlanks = [];
let wordArray = Array.from(computerWord);
let triedLetters = [];
console.log('wordArray ', wordArray);

//set endpoints
app.get('/', (req, res) => {
  for (let i = 0; i < computerWord.length; i++) {
    arrayBlanks[i] = '_';
  };

  context = {
    arrayBlanks: arrayBlanks
  };

  res.render('index', context);
});


app.post('/', (req, res) => {
  let counter = 0;
  let numGuesses = 8;
  let letterGuess = req.body.text;
  letterGuess = letterGuess.toLowerCase();
  triedLetters.push(letterGuess.toUpperCase());

  for (let i = 0; i < wordArray.length; i++) {
    counter ++;
    numGuesses --;
    if (letterGuess === wordArray[i]) {
      arrayBlanks[counter - 1] = letterGuess;
    }

  };

  context = {
    arrayBlanks: arrayBlanks,
    triedLetters: triedLetters,
    numGuesses: numGuesses
  }

  res.render('index', context);
});


app.listen(3000);
