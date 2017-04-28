'use strict'

class Game {
	constructor() {
		this.level = parseInt(localStorage.getItem('level')) || 1;

		this.battlefieldElement = createAndAppend(document.body, '', 'battlefield');
		this.controlElement = createAndAppend(document.body, '', 'control');
		this.levelElement = createAndAppend(this.controlElement, this.level + ' Уровень', 'level');
		
		this.wallet = new Wallet(this);

		this.resetElement = createAndAppend(this.controlElement, 'Reset', 'reset');

		this.resetElement.onclick = function() {
			var result = confirm('Удалить весь прогресс?');
			if(result) {
				localStorage.clear();
				location.reload();
			}
		}

		this.enemy = new Enemy(this);

		this.clicker = new Clicker(this);
		this.clicker.target = this.enemy;

		this.pig = new Pig(this);
		this.pig.target = this.enemy;

		this.devil = new Devil(this);
		this.devil.target = this.enemy;

		this.horse = new Horse(this);
		this.horse.target = this.enemy;

	};


	onKill() {		
		this.wallet.addMoney(this.level * 3);
		this.level++;
		localStorage.setItem('level', this.level);
		this.displayLevel();
		var newEnemy = new Enemy(this);
		this.clicker.target = newEnemy;
		this.pig.target = newEnemy;
		this.devil.target = newEnemy;
		this.horse.target = newEnemy;
	}

	displayLevel() {
		this.levelElement.innerHTML = this.level + ' Уровень';
	}

}


window.onload = function() {
	var game = new Game();
}