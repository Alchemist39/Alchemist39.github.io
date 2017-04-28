'use strict'

// создаем конструктор класса Герой
class Hero {

	// в конструктор передаем аттрибуты options
	constructor(options) {

		// передаем аттрибуты в свойства класса || значения по умолчанию
		this.game = options.game;
		this.name = options.name;
		this.initialPrice = options.initialPrice;
		this.text = options.text;
		this.visibility = options.visibility || 'hidden';

		// передаем в count значение из хранилища по ID: имя + постоянная приписка || или дефолт
		this.count = parseInt(localStorage.getItem(this.name + '-count')) || 0;
		this.initialDamage = options.initialDamage || 1;

		// создаем элемент героя по хелперу
		this.heroElement = createAndAppend(
			this.game.controlElement, 
			this.mainString(), 
			this.name, 
			this.visibility
		);

		// приклике по врагу наносим урон
		this.heroElement.onclick = function() {
			this.add(1);
		}.bind(this);

		// если враг существует, наносим ему урон равный урону героя каждую секунду 
		setInterval(function() {
			if (this.target) {
				this.target.recieveDamage(this.damage());				
			}
			this.setVisible();
		}.bind(this), 1000);
		this.setVisible();
	}

	// метод увеличения количества героев данного типа
	// тратим деньги из кошелька в размере стоимости следущего героя
	// увеличиваем количество героев на один
	// устанавливаем в локальное хранилище текущее количество героев
	// увеличиваем стоимость героя в размере 1.25 от количества героев
	// отображаем количество героев на экране
	add() {
		this.game.wallet.spendMoney(this.getCurrentPrice());
		this.count++;
		localStorage.setItem(this.name + '-count', this.count);
		this.displayCount();
	}

	// возвращаем цену следущего героя
	getCurrentPrice() {
		var currentPrice = Math.round(this.initialPrice * (this.count * 1.25)) || this.initialPrice;
		return currentPrice;
	}

	// устанавливаем видимость героев
	// если цена героя становится меньше чем денег в хранилище, героя становится видимым перманентно
	// если денег становится меньше чем денег, герой становится прозрачным, но не невидимым
	// если денег вновь больше, чем цена героя, герой становится непрозрачным
	setVisible() {
		if (this.getCurrentPrice() <= this.game.wallet.getMoney()) {
			this.heroElement.style.visibility = 'visible';
			this.heroElement.style.opacity = '1';
		} else {
			this.heroElement.style.opacity = '0.5';
		}
	}

	// основную строку состояния героя выносим в отдельный метод для оптимизации
	mainString() {
		var mainString = this.count + ' ' + 'кликеров за' + ' ' + this.getCurrentPrice() + ' ' + 'золота';
		return mainString;
	}

	// метод отображения строки состояния на экране
	// добавлен метод видимости, чтобы отображение героев менялось при изменении количества героев
	displayCount() {
		this.heroElement.innerHTML = this.mainString();
		this.setVisible();
	}

	// метод установки урона героя равный количеству героев * начальный урон героя / 5
	damage() {
		var peps = this.count * this.initialDamage;
		return peps;
	}
}

// расширяем класс Герой в класс Кликер
// super - берем конструктор родителя, индивидуализируем начальные значения
class Clicker extends Hero {
	constructor(game) {
		super({
			game,
			initialPrice: 1,
			initialDamage: 1,
			name: 'clicker',
			text: 'кликеры',
			visibility: 'visible'
		});
	}
}

class Pig extends Hero {
	constructor(game) {
		super({
			game,
			initialPrice: 10,
			initialDamage: 10,
			name: 'pig',
			text: 'поросята'
		});
	}
}

class Devil extends Hero {
	constructor(game) {
		super({
			game,
			initialPrice: 1000,
			initialDamage: 1000,
			name: 'devil',
			text: 'дьяволятки'
		});
	}
}

class Horse extends Hero {
	constructor(game) {
		super({
			game,
			initialPrice: 10000,
			initialDamage: 10000,
			name: 'horse',
			text: 'Лошадки'
		});
	}
}
