'use strict';

//score elements selection
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdGame = document.querySelector('.btn--hold');

// scope
let scores, currentScore, activePlayer, stillPlaying;

// function to house all default elements
const initLogic = function() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  stillPlaying = true;

  // set cummulative scores to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  
  // set current scores to 0
  current0El.textContent = 0;
  current1El.textContent = 0;
  // to change the background to default
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  // reset active player
  player0El.classList.add('player--active');
}
initLogic();


const playerSwitch = function() {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
}

// roll the dice
rollDice.addEventListener('click', function() {
  if(stillPlaying) {
     // 1. generate a random die
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. display a dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;

    //3. if the generated value is 1, pass the game to the next player
    if(dice !== 1) {
      //add value to current score
      currentScore += dice;
      // determine which player to award points to
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // switch to new player
      playerSwitch();
    }
  }
})

// hold the game and save points globally
holdGame.addEventListener('click', function() {
  if(stillPlaying) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  
    // check if score is >=100
    if(scores[activePlayer] >= 50) {
      stillPlaying = false;
      diceEl.classList.add('hidden');
      
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  
    } else {
    //switch to next player
    playerSwitch();
    }
  }
});

newGame.addEventListener('click', initLogic);