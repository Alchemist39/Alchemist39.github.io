'use strict'

class Hero {
	constructor(game) {
		this.game = game;


		this.price = 1;
		this.count = 0;
		this.initialDamage = 10;

		this.heroElement = document.createElement('div');
		this.heroElement.className = 'clicker';
		this.heroElement.innerHTML = this.count + ' ' + 'кликеров за' + ' ' + this.price + ' ' + 'золота';
		this.game.controlElement.appendChild(this.heroElement);

		this.heroElement.onclick = function() {
			this.add(1);
		}.bind(this);
	}

	add(amount) {
		this.game.wallet.spendMoney(this.price * amount);
		this.count += amount;
		this.price = Math.round(this.count * 1.25);
		this.displayCount();
	}

	displayCount() {
		this.heroElement.innerHTML = this.count + ' ' + 'кликеров за' + ' ' + this.price + ' ' + 'золота';
	}

	damage() {
		return (this.count * this.initialDamage) / 5;
	}
}