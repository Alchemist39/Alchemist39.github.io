'use strict'

class Enemy {
	constructor(game) {
		this.game = game;

		this.initialHp = this.game.level * 3 || 3;
		this.hp = this.initialHp;

		this.enemyElement = document.createElement('div');
		this.enemyElement.className = 'enemy';
		this.game.battlefieldElement.appendChild(this.enemyElement);

		this.hpBorderElement = document.createElement('div');
		this.hpBorderElement.className = 'hpBorder';
		this.enemyElement.appendChild(this.hpBorderElement);

		this.hpBarElement = document.createElement('div');
		this.hpBarElement.className = 'hpBar';
		this.hpBorderElement.appendChild(this.hpBarElement);

		this.hpElement = document.createElement('div');
		this.hpElement.className = 'HP';
		this.hpElement.innerHTML = this.hp;
		this.hpBorderElement.appendChild(this.hpElement);

		this.enemyElement.onclick = function() {
			this.recieveDamage(1);
			this.displayHp();
		}.bind(this);

		//setTimeout(this.recieveDamage(this.game.hero.damage), 1000).bind(this);

		this.coordinates();
	}

	recieveDamage(value) {
		this.hp = this.hp - value;

		if (this.hp <= 0) {
			this.kill();
		}
		this.changeHpBar();

	}

	changeHpBar() {
		var percent = (this.hp / this.initialHp) * 100;
		this.hpBarElement.style.width = percent + '%';
	}

	displayHp() {
		this.hpElement.innerHTML = this.hp;
	}

	kill() {
		this.game.battlefieldElement.removeChild(this.enemyElement);
		this.game.onKill(this);
	}

	coordinates() {
		this.enemyElement.style.left = Math.random() * (this.game.battlefieldElement.clientWidth - 40) + 'px';
		this.enemyElement.style.top = Math.random() * (this.game.battlefieldElement.clientHeight - 40) + 'px';
	}
}