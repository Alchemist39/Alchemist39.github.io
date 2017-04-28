'use strict'
		
		// создаем класс Апгрейд
		// в нем создаем конструктор класса
		// переводим аргументы (options) в свойства (this...)
class Upgrade {
	constructor(options){
		this.game = options.game;
		this.name = options.name;

		// по хелперу создаем элемент апгрейда (кнопку)
		// по дефолту устанавливаем ее неактивной/не преобретенной
		this.generalElement = createAndAppend(this.game.controlElement, 'General', 'general');
		this.generalElement.style.opacity = '0.5';

		// при клике на кнопку апгрейда
		// вызываем метод покупки апгрейда
		// устанавливаем иконку апгрейда активной
		this.generalElement.onclick = function() {
			this.buyUpgrade();
			this.generalElement.style.opacity = '1';
		}.bind(this);

	}

	// метод возвращает значение из хранилища или false
	getUpgrade() {
		return localStorage.getItem(this.name + '-Upgrade') || false;
	}

	// сохраняем в хранилище строку со значением exist (главное, чтобы было наличие строки)
	setUpgrade(exist) {
		localStorage.setItem(this.name + '-Upgrade', exist)
	}
	
	// создаем метод покупки апгрейда
	// в переменную сохраняем значение, возвращаемое из хранилища (по дефолту False)
	// если значение отсутствует в хранилище (false) меняем его на true (!false)
	// сохраняем в хранилище первое значение, таким образом getUpgrade становится true, а в условии false
	buyUpgrade() {
		var exist = this.getUpgrade();
		if (!exist) {
			this.setUpgrade(true);
		}
	}

	// метод увелиения урона
	// если getUpgrade true (значение есть в хранилище), то урон увеличиваем на 50%
	// если же нет, то оставляем без изменений, т.е. 1
	boostDamage() {
		if (this.getUpgrade()) {
			return 1.5;
		} else {
			return 1;
		}
	}
}












class General extends Upgrade {
	constructor(game) {
		super({
			game,
			name: 'general'
		});
	}
}