/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
Variables for players' scores, round score, active player, state variable (whether game is playing or not)
*/

let scores, roundScore, activePlayer, gamePlaying;

// new game
init();

// event listener for roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// if no payers have won

		// Challenge: Add another dice to the game: player looses CURRENT score when on of them is 1

		// 1. Random number between 1 and 6 (inclusive)
		let number1 = Math.floor(Math.random() * 6) + 1;
		let number2 = Math.floor(Math.random() * 6) + 1;

		//2. Display the result
		let dice = document.querySelectorAll('.dice');

		for (const d of dice) {
			// show the dice
			d.style.display = 'block';
		}

		// select the dice element and add the appropriate dice image
		document.querySelector('#dice-1').src = 'dice-' + number1 + '.png';
		document.querySelector('#dice-2').src = 'dice-' + number2 + '.png';

		if (number1 > 1 && number2 > 1) {
			//3. Update the round number IF the rolled number is NOT 1

			// Add scores
			roundScore += number1 + number2;

			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
		else {
			// else if player rolled number is 1, reset current score and it is the next player's turn
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// if no players have won

		// add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// Check if player won the game
		if (scores[activePlayer] >= 100) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			for (d of document.querySelectorAll('.dice')) {
				d.style.display = 'none';
			}
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

			// stop the game
			gamePlaying = false;
		}
		else {
			// set current score to 0 and switch player's
			nextPlayer();
		}
	}
});

function nextPlayer() {
	document.getElementById('current-' + activePlayer).textContent = '0';
	roundScore = 0;
	activePlayer = 1 - activePlayer;
	document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
	document.querySelector('.player-' + (1 - activePlayer) + '-panel').classList.toggle('active');
	for (d of document.querySelectorAll('.dice')) {
		d.style.display = 'none';
	}
}

function init() {
	// set state variable
	gamePlaying = true;

	// set score
	scores = [
		0,
		0
	];
	roundScore = 0;

	// current player - construct it to be 0, 1 to match the indexes of the scores array and the player ids
	activePlayer = 0;

	// hide the dice at the beginning
	for (d of document.querySelectorAll('.dice')) {
		d.style.display = 'none';
	}

	// set initial score values - score and round score
	document.getElementById('score-0').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// set initial state
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);
