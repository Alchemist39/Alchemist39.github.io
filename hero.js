'use strict'

		// создаем конструктор класса Герой
		// в конструктор передаем аттрибуты options
class Hero {
	constructor(options) {

		// передаем аттрибуты (options) в свойства класса (this...) || значения по умолчанию
		this.game = options.game;
		this.name = options.name;
		this.initialPrice = options.initialPrice;
		this.text = options.text;
		this.visibility = options.visibility || 'hidden';
		this.initialDamage = options.initialDamage || 1;

		// передаем в count значение из хранилища по ID: имя + постоянная приписка || или дефолт
		this.count = parseInt(localStorage.getItem(this.name + '-count')) || 0;

		// создаем элемент героя по хелперу
		this.heroElement = createAndAppend(
			this.game.controlElement, 
			this.mainString(), 
			this.name, 
			this.visibility
		);

		// при клике по элементу героя добавляем одного героя данного типа
		// проверка достаточности денег происходит в методе траты денег в wallet'е
		this.heroElement.onclick = function() {
			this.add(1);
		}.bind(this);

		// если враг существует, наносим ему урон равный урону героя каждую секунду 
		// каждую секунду проверяем выполнение условия в методе видимости (visible)
		setInterval(function() {
			if (this.target) {
				this.target.recieveDamage(this.damage());				
			}
			this.setVisible();
		}.bind(this), 1000);

		// устанавливаем начальную видимость при отрисовке страницы (сборке конструктора)
		this.setVisible();
	}

	// метод увеличения количества героев данного типа
	// тратим деньги из кошелька в размере стоимости следущего героя
	// увеличиваем количество героев на один
	// устанавливаем в локальное хранилище текущее количество героев с уникальным именем
	// отображаем количество героев на экране
	add() {
		this.game.wallet.spendMoney(this.getCurrentPrice());
		this.count++;
		localStorage.setItem(this.name + '-count', this.count);
		this.displayCount();
	}

	// возвращаем цену следущего героя
	// увеличиваем стоимость героя в размере начальная цена * 1.07 от количества героев || начальная
	getCurrentPrice() {
		var currentPrice = Math.round(this.initialPrice * (this.count * 1.07)) || this.initialPrice;
		return currentPrice;
	}


	// устанавливаем видимость героев
	// если цена героя становится меньше чем денег в хранилище, герой становится видимым перманентно
	// если денег больше, чем цена героя, герой непрозрачный
	// если денег становится меньше чем цена героя, герой становится прозрачным, но не невидимым
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
		var mainString = this.count + ' ' + 'кликеров за' + ' ' + this.displayCurrentPrice() 
		+ ' ' + 'золота' + ' ' + 'Урон: ' + this.displayDamage();
		return mainString;
	}

	// метод отображения строки состояния на экране
	// добавлен метод видимости, чтобы отображение героев менялось при изменении количества героев
	displayCount() {
		this.heroElement.innerHTML = this.mainString();
		this.setVisible();
	}
	displayCurrentPrice() {
		var price = decreaseBigNumbers(this.getCurrentPrice());
		return price;
	}

	// метод установки урона героя равный количеству героев * начальный урон героя*активные усиления
	damage() {
		var dmg = this.count * this.initialDamage; //* this.game.general.boostDamage();
		return dmg;
	}

	displayDamage() {
		var dmg = decreaseBigNumbers(this.damage());
		return dmg;
	}
}

// расширяем класс Герой в класс Кликер
// super - берем конструктор родителя, индивидуализируем начальные значения
class Clicker extends Hero {
	constructor(game) {
		super({
			game,
			initialPrice: 1,
			initialDamage: 10,
			name: 'clicker',
			text: 'кликеры',
			visibility: 'visible'
		});
		// добавить метод в героя, в который передаем класс апгрейда
		//this.addposibleUpgrade(new SuperClickerUpgrade);
	}
}

class Pig extends Hero {
	constructor(game) {
		super({
			game,
			initialPrice: 10,
			initialDamage: 100,
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
			initialDamage: 1000000,
			name: 'horse',
			text: 'Лошадки'
		});
	}
}
