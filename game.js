'use strict'

class Game {
	constructor() {

		this.battlefieldElement = document.createElement('div');
		this.battlefieldElement.className = 'battlefield';
		document.body.appendChild(this.battlefieldElement);

		this.controlElement = document.createElement('div');
		this.controlElement.className = 'control';
		document.body.appendChild(this.controlElement);

		this.levelElement = document.createElement('div');
		this.levelElement.className = 'level';
		this.levelElement.innerHTML = this.level || 1;
		this.controlElement.appendChild(this.levelElement);

		
		this.wallet = new Wallet(this);

		this.resetElement = document.createElement('div');
		this.resetElement.className = 'reset';
		this.resetElement.innerHTML = 'Reset';
		this.controlElement.appendChild(this.resetElement);

		this.resetElement.onclick = function() {
			var result = confirm('Удалить весь прогресс?');
			if(result) {
				localStorage.clear();
				location.reload();
			}
		}

		this.enemy = new Enemy(this);

		this.clicker = new Hero(this);
		this.level = 1;
	};


	onKill(enemy) {		
		this.wallet.addMoney(this.level * 3);
		this.level += 1;
		this.displayLevel();
		var newEnemy = new Enemy(this);
	}
	displayLevel() {
		this.levelElement.innerHTML = this.level;
	}

}



window.onload = function() {
	var game = new Game();
}