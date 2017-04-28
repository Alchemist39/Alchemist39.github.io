'use strict'

class Wallet {
	constructor(game) {
		this.game = game;

		this.walletElement = createAndAppend(
			this.game.controlElement, 
			this.getMoney() + ' Золото', 
			'wallet'
		);
	}

	// возвращает число денег из хранилища
	getMoney() {
		return parseInt(localStorage.getItem('money')) || 0;
	};

	// сохраняет в хранилище переданное значение и выводит их на экран
	setMoney(amount) {
		localStorage.setItem('money', amount);
		this.displayMoney();
	};

	// добавляет деньги в хранилище
	addMoney(value) {
		var newValue = this.getMoney() + value;
		this.setMoney(newValue);
	};

	// тратит деньги из хранилища
	// если денег не хватает, выводит ошибку
	spendMoney(value) {
		if(this.getMoney() < value) {
			throw new Error("Недостаточно золота!");
		} else {
			var newValue = this.getMoney() - value;
			this.setMoney(newValue);
		}
	};

	// выводим количество денег на экран
	displayMoney() {
		this.walletElement.innerHTML = this.getMoney() + ' Золото';
	}
}