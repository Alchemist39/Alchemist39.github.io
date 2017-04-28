'use strict'
// создаем класс Враг
	//создаем в нем конструктор с аргументом экземпляра класса Game
class Enemy {
	constructor(game) {
		this.game = game;

		this.initialHp = this.game.level * 3 || 3;
		this.hp = this.initialHp;

		this.enemyElement = createAndAppend(this.game.battlefieldElement, '', 'enemy');
		this.hpBorderElement = createAndAppend(this.enemyElement, '', 'hpBorder');
		this.hpBarElement = createAndAppend(this.hpBorderElement, '', 'hpBar');
		this.hpElement = createAndAppend(this.hpBorderElement, this.hp, 'HP');

		this.enemyElement.onclick = function() {
			this.recieveDamage(1);
		}.bind(this);

		this.setCoordinates();
	}

	// уменьшаем количество хп врага в зависимости от нанесенного урона
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
	getReward() {
		return this.game.level * 3;
	}
	// метод изменения полоски здоровья
	// высчитываем соотношение текущего здоровья и начального здоровья в процентах
	// устанавливаем стиль для элемента полосы здоровья
	changeHpBar() {
		var percent = (this.hp / this.initialHp) * 100;
		this.hpBarElement.style.width = percent + '%';
	}
	// метод отображения ЦИФРЫ здоровья
	displayHp() {
		this.hpElement.innerHTML = Math.round(this.hp);
	}
	// метод удаления элемента врага
	// вызываем метод из экземпляра класса Game
	kill() {
		this.game.battlefieldElement.removeChild(this.enemyElement);
		this.game.onKill(this);
	}

	// метод рассчета случайного местоположения врага
	// размер родительского элемента, минус размер врага
	setCoordinates() {
		this.enemyElement.style.left = Math.random() * (this.game.battlefieldElement.clientWidth - 40) + 'px';
		this.enemyElement.style.top = Math.random() * (this.game.battlefieldElement.clientHeight - 40) + 'px';
	}
}