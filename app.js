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
console.log('computerWord: ', computerWord);

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
  console.log('storedword: ', storedWord);
  next();
});

//array holding letters/blanks
let arrayBlanks = [];

//set endpoints
app.get('/', (req, res) => {
  for (let i = 0; i <= computerWord.length; i++) {
    arrayBlanks[i] = '_';
  };

  context = {
    arrayBlanks: arrayBlanks
  };

  res.render('index', context);
});

app.listen(3000);
