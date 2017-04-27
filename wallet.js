'use strict'

class Wallet {
	constructor(game) {
		this.game = game;

		this.walletElement = document.createElement('div');
		this.walletElement.className = 'wallet';
		this.walletElement.innerHTML = this.money || 0;
		this.game.controlElement.appendChild(this.walletElement);

		this.money = 0;
	}


	get money() {
		return this._money;
	};
	set money(amount) {
		this._money = amount;
		this.displayMoney();
	};

	addMoney(value) {
		this.money += value;
	};
	spendMoney(value) {
		if(this.money < value) {
			throw "Недостаточно золота!"
		} else {
			this.money -= value;
		}
	};
	displayMoney() {
		this.walletElement.innerHTML = this.money;
	}
}