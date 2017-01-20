//GAME CLASS
// Create the game constructor to store the game variables
var Game = function() {
	this.gameOver = false;
	this.gameWin = false;
};

// Enemies our player must avoid
var Enemy = function(x,y) {

	// Set the image for the enemy
	this.sprite = 'images/enemy-bug.png';

	// Set the enemy position
	this.x = x;
	this.y = y;

	// Set the speed multipler for the enemy using a random
	this.multiplier = Math.floor((Math.random() * 3) + 1);

};

// Update the enemy's position and check for collisions
Enemy.prototype.update = function(dt) {
	// Set the position of the enemy based on dt and the speed multipler
	// 120, a speed constant. Increase it to increase the speed
	this.x = this.x + 120 * dt * this.multiplier;
	// Check for collisions with the player
	if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {
		// Player has encountered an emeny and thus loses one life
		player.lives--;
		document.getElementsByClassName('lives')[0].innerHTML = 'Lives: ' + player.lives;
		// Check to see if the player has any lives left
		if (player.lives === 0) {
			// Player is out of lives, show the game over image
			game.gameOver = true;
		} 
		player.reset();
		}
	// If the enemy goes off of the board, reset it
	if (this.x > 750) {
		this.reset();
	}
};

// Reset the enemy to the left of the board with a new y position
// and a new speed multiplier
Enemy.prototype.reset = function() {
	this.x = -200;
	var ynew = [220, 140, 60];
	this.y = ynew[Math.floor((Math.random() * 3))];
	this.multiplier = Math.floor((Math.random() * 5) + 1);
};

// Render the enemy to the canvas
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
	// Set the player image
	this.sprite = 'images/char-boy.png';
	// Set the player's location
	this.x = x;
	this.y = y;
	// Give the player 5 lives to start
	this.lives = 5;
	// Store the original position of the player for resetting later
	this.xo = x;
	this.yo = y;
};

Player.prototype.handleInput = function(dir) {
	// Change the player's position based on the user keyboard input
	//x changes by 101 and y changes by 80 to match the block dimensions
	if (dir == 'up') {
		this.y = this.y - 80;
	} else if (dir == 'down') {
		this.y = this.y + 80;
	} else if (dir == 'left') {
		this.x = this.x - 101;
	} else if (dir == 'right') {
		this.x = this.x + 101;
	}

	// Check the position of the player
	if (this.x < 0) {
		// Player is off to the left side of the board, move the player
		// back to zero
		this.x = 0;

	} else if (this.x > 606) {
		// Player is off to the right side of the board, move the player
		// back to the right-most square (606)
		this.x = 606;
	} else if (this.y > 404) {
		this.reset();
	} else if (this.y <= -20 && this.x > 0 && this.x < 606) {// Player has made it to the top blocks
		if (this.x > 101 && this.x < 606){ //Player is not in the water block
		// Check to see if the player has won the game
		var win = true;// Player has reached the destination
			} else {
			win = false;// Set the win flag to false
			}

		// If the player has won, display the game winning image
		if (win) {
			game.gameWin = true;
		}
		// Reset the player to the original location & image
		this.reset();
	} else if (this.y <= -20 && (this.x === 0 || this.x === 606)) {
		// Player made it to one of the two water blocks
		// Lose a life and reset the player
		this.lives--;
		if (this.lives === 0) {
			// Player has no more lives left, show the game over image
			game.gameOver = true;
		} else {
			// Player still has lives left so update the lives and reset the player
			document.getElementsByClassName('lives')[0].innerHTML = 'Lives: ' + this.lives;
			this.reset();
		}
	}
};

// Reset the player to the original position & image
Player.prototype.reset = function() {
	// Reset the player to the original position
	//xo, yo has the original position value as described in Player function
	this.x = this.xo;
	this.y = this.yo;
	// Reset the image
	this.sprite = 'images/char-boy.png';
};

// Update the player's position
Player.prototype.update = function() {
	this.x = this.x;
	this.y = this.y;
};

// Render the player to the canvas
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Create the allEnemies array, which will hold all of the
// enemy objects
var allEnemies = [];
// Set a varaiable for the possible y values
var ynew = [220, 140, 60];
// Create the separate enemy instances
for (var i = 0; i < 5; i++) {
	// Set a starting x-position based on a random value
	var x = Math.floor((Math.random() * -1000) + 1);
	// Set a starting y-position based on a random selection
	// of the 3 possible values
	var y = ynew[Math.floor(Math.random() * 3)];
	// Create the new enemy object
	var enemy = new Enemy(x, y);
	// Push the enemy into the array
	allEnemies.push(enemy);
}

// -- Instantiate the player --
var player = new Player(303, 380);
var game = new Game();
