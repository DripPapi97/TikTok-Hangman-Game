'use strict';
import Timer from "./Timer.js";

const letterDiv = document.querySelector('.letter-div');
const hintButton = document.querySelector('.hint-btn');
const resetButton = document.querySelector('.reset-btn');
const easyButton = document.querySelector('.easy-btn');
const normalButton = document.querySelector('.normal-btn');
const hardButton = document.querySelector('.hard-btn');
const hintDiv = document.querySelector('.hint-div');
const hintText = document.querySelector('.hint-txt');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');
const notifL = document.querySelector('.notifL');
const notifContentL = document.querySelector('.notifL-content');
const notifSpanL = document.querySelector('.notifL-span');
const playAgainL = document.querySelector('.notifL-btn');
const notifContentW = document.querySelector('.notifW-content');
const notifW = document.querySelector('.notifW');
const notifSpanW = document.querySelector('.notifW-span');
const playAgainW = document.querySelector('.notifW-btn');
const difficulty = document.querySelector('.Difficulty');
const timer = new Timer(
    document.querySelector(".timer"),
)


// keeping letters using javascript
// so until we put html content into letter-div,
// we cant capture letters
let letters;
let lives;

const words = new Map([
  ['computer', 'What freezes when it overheats?'],
  ['short', 'What 5 letter work becomes shorter when you add two letters to it?'],
  ['swims', 'What five-letter word can be read the same upside down or right side up?'],
  ['coin', 'What has a head and a tail, but no body or legs?'],
  ['lightning', ' I touch the earth and I touch the sky, but if I touch you, you’ll likely die. What am I?'],
  ['coin', 'What has a head and a tail, but no body or legs'],
]);

// making a list of only keys from words
const word_list = [...words.keys()];

// get random word from word_list function
const getRandomWord = function (list) {
  return list[Math.floor(Math.random() * word_list.length)];
};

// random word will be selected upon every reset and init
let select_word;
export {select_word};

const init = function (state) {
  wordDiv.innerHTML = '';
  
  if (state === 'start') {
    // putting all letters into html
    for (const i of 'abcdefghijklmnopqrstuvwxyz') {
      const html = `<button class="alpha">${i.toUpperCase()}</button>`;
      letterDiv.insertAdjacentHTML('beforeend', html);
      select_word = getRandomWord(word_list);
      difficulty.textContent = "Easy";
      lives = 6;
    }
  } 
  else if (state === 'reset') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notifL.classList.add('hidden');
      notifW.classList.add('hidden');
      select_word = getRandomWord(word_list);
      if(difficulty.textContent === "Easy")
      {
        lives = 6;
      }
      if(difficulty.textContent === "Normal")
      {
        lives = 4;
      }
      if(difficulty.textContent === "Hard")
      {
        lives = 2;
      }
      changehangman();
      timer; // creating new instance of the timer class
    });
  }
  else if (state === 'easy') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notifL.classList.add('hidden');
      notifW.classList.add('hidden');
      select_word = getRandomWord(word_list);
      lives = 6;
      //start with picture 6 (original picture)
      liveSpan.textContent = lives;
      difficulty.textContent = "Easy";
      changehangman();
      timer;
    });
  }
  else if (state === 'normal') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notifL.classList.add('hidden');
      notifW.classList.add('hidden');
      select_word = getRandomWord(word_list);
      lives = 4;
      //start with picture 4
      liveSpan.textContent = lives;
      difficulty.textContent = "Normal";
      changehangman();
      timer;
    });
  }
  else if (state === 'hard') {
    letters.forEach(btn => {
      btn.classList.remove('disabled');
      hintDiv.classList.add('hidden');
      notifL.classList.add('hidden');
      notifW.classList.add('hidden');
      select_word = getRandomWord(word_list);
      lives = 2;
      //start with picture 2
      liveSpan.textContent = lives; 
      difficulty.textContent = "Hard";
      changehangman();
      timer;
    });
  }

  // capturing letters div
  letters = document.querySelectorAll('.alpha');
  liveSpan.textContent = lives;

  // putting selected word
  for (let i = 0; i < select_word.length; i++) {
    const html = `<p class="word">_</p>`;
    wordDiv.insertAdjacentHTML('beforeend', html);
  }
};
// initializing the page
init('start');

// show lose notification
const showNotifL = function (msg) {
  notifL.classList.remove('hidden');
  notifSpanL.textContent = select_word;
  notifContentL.textContent = `You ${msg}`;
};

// show win notification
const showNotifW = function (msg) {
  notifW.classList.remove('hidden');
  notifSpanW.textContent = select_word;
  notifContentW.textContent = `You ${msg}`;
};

// decrease life
const decreaseLife = function () {
  lives--;
  //   console.log(lives);
  liveSpan.textContent = lives;
  if (lives === 0) {
    showNotifL('lost');
  }
};

// get multiple matching indexes of pressed letter
// to the selected word
const getindexes = function (letter) {
  let indexes = [];
  [...select_word].forEach((val, i) => {
    if (val === letter) {
      const index = i;
      indexes.push(index);
    }
  });
  //   console.log(indexes);
  return indexes;
};

// check if we get complete word
const checkWord = function () {
  let val = true;
  for (let i = 0; i < wordDiv.children.length; i++) {
    if (wordDiv.children[i].textContent === '_') {
      val = false;
    }
  }
  return val;
};

//change hangman display
const changehangman = function() {
  document.getElementById('hangmandisplay').src ='./Hangman Images/'+ lives + '.jpg';
}

// letters event listener function
const letterPress = function () {
  const letter = this.textContent.toLowerCase();

  if (select_word.includes(letter)) {
    const indexes_list = getindexes(letter);
    indexes_list.forEach((val, i) => {
      wordDiv.children[val].textContent = this.textContent;
    });
    if (checkWord()) showNotifW('won');
  } else {
    decreaseLife();
    changehangman();
  }
  this.classList.add('disabled');
};

// listening to letter buttons presses
letters.forEach(btn => {
  btn.addEventListener('click', letterPress);
});

// Listening to hint btn
hintButton.addEventListener('click', function () {
  hintDiv.classList.remove('hidden');
  hintText.textContent = words.get(select_word);
});

// listening to reset btn
resetButton.addEventListener('click', function () {
  init('reset');
});

// listening to easy btn
easyButton.addEventListener('click', function () {
  init('easy');
});

// listening to normal btn
normalButton.addEventListener('click', function () {
  init('normal');
});

// listening to hard btn
hardButton.addEventListener('click', function () {
  init('hard');
});

// listening to play again lose button
playAgainL.addEventListener('click', function () {
  init('reset');
});

// listening to play again win button
playAgainW.addEventListener('click', function () {
  init('reset');
});