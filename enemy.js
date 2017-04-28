'use strict'
		// создаем класс Враг
		// создаем в нем конструктор с аргументом экземпляра класса Game
		// создаем ссылку this.game на экземпляр класса Game

		// устанавливаем начальное хп равным 10 - 1 + 1,55 в степени уровень -1
		// текущее хп изначально устанавливаем равным начальному хп
class Enemy {
	constructor(game) {
		this.game = game;

		this.initialHp = Math.round(10 * (this.game.level - 1 + Math.pow(1.55, (this.game.level - 1))));
		this.hp = this.initialHp;

		// создаем элемент врага в окне слева
		this.enemyElement = createAndAppend(this.game.battlefieldElement, '', 'enemy');

		// создаем рамку для шкалы здоровья
		// создаем динамическую шкалу здоровья
		// создаем числовое отображение количества здоровья
		this.hpBorderElement = createAndAppend(this.enemyElement, '', 'hpBorder');
		this.hpBarElement = createAndAppend(this.hpBorderElement, '', 'hpBar');
		this.hpElement = createAndAppend(
			this.hpBorderElement, 
			decreaseBigNumbers(Math.round(this.hp)), 
			'HP'
		);

		// создаем метод, уменьшающий хп врага при клике по нему
		this.enemyElement.onclick = function() {
			this.recieveDamage(5);
		}.bind(this);

		// устанавливаем начальные случайные координаты спауна первого врага
		this.setCoordinates();
	}

	// метод уменьшения хп:
	// уменьшаем количество хп врага в зависимости от нанесенного урона, переданного аргументом (value)
	// если хп заканчиваются, вызываем метод kill
	// динамически изменяем полосу здоровья
	// динамически меняем цифру отображающую хп
	recieveDamage(value) {
		this.hp = this.hp - value;

		if (this.hp <= 0) {
			this.kill();
		}
		this.changeHpBar();
		this.displayHp();
	}

	// метод для доступа к награде за текущего врага
	// если награда за врага меньше единицы, то выдаем 1 золота за его убийство
	// иначе рассчитываем награду по формуле
	getReward() {
		var reward = this.initialHp / 15;
		if (reward < 1) {
			return 1;
		} else {
			return reward;
		}
	}

	// метод изменения полоски здоровья
	// высчитываем соотношение текущего здоровья и начального здоровья в процентах
	// устанавливаем стиль для элемента полосы здоровья
	changeHpBar() {
		var percent = (this.hp / this.initialHp) * 100;
		this.hpBarElement.style.width = percent + '%';
	}

	// метод отображения ЦИФРЫ здоровья, округленный до целого
	displayHp() {
		this.hpElement.innerHTML = decreaseBigNumbers(Math.round(this.hp));
	}


	// метод удаления элемента врага
	// вызываем метод из экземпляра класса Game
	kill() {
		this.game.battlefieldElement.removeChild(this.enemyElement);
		this.game.onKill(this);
	}

	// метод рассчета случайного местоположения врага
	// размер родительского элемента, минус размер врага умноженные на рандом (0 - 1)
	setCoordinates() {
		this.enemyElement.style.left = Math.random() * 
			(this.game.battlefieldElement.clientWidth - 40) + 'px';
		this.enemyElement.style.top = Math.random() * 
			(this.game.battlefieldElement.clientHeight - 40) + 'px';
	}
}