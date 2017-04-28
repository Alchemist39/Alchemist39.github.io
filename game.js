'use strict'

class Game {
	constructor(parentElement) {
		this.level = parseInt(localStorage.getItem('level')) || 1;

		this.battlefieldElement = createAndAppend(parentElement, '', 'battlefield');
		this.controlElement = createAndAppend(parentElement, '', 'control');
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
		this.pig = new Pig(this);
		this.devil = new Devil(this);
		this.horse = new Horse(this);		
		this.setAllHeroesTarget(this.enemy);
		this.general = new General(this);
		// в переменную передаем значение даты (количество миллисекунд на момент закрытия игры)
		var previousGameDate = localStorage.getItem('date');

		// при условии существования в хранилище последней даты
		if (previousGameDate) {
			//создаем переменную равную разнице дат в момент закрытия и открытия игры
			var delta = (new Date()).valueOf() - parseInt(previousGameDate);
			// переводим миллисекнуды в секунды
			delta = Math.floor(delta / 1000);

			// сохраняем суммарный урон всех героев за время, когда игра была закрыта
			var damage = (this.clicker.damage() + this.pig.damage() + this.devil.damage() + this.horse.damage()) * delta;
			// вычисляем сколько врагов умерло с момента закрытия игры
			var enemyKilled = Math.floor(damage / this.enemy.hp);
			// добавляем в кошелек деньги за убитых в оффлайне врагов
			this.wallet.addMoney(enemyKilled * this.level * 3); 
		}
		// каждую секунду сохраняем текущее время в миллисекундах
		setInterval(function() {
			localStorage.setItem('date', (new Date()).valueOf());
		}, 1000);
	};

	// устанавливает цель для всех кликеров
	setAllHeroesTarget(target) {
		this.clicker.target = target;
		this.pig.target = target;
		this.devil.target = target;
		this.horse.target = target;
	}

	// метод класса Game, который принимает аргумент указывающий на экземпляр класса врага
	// добавляем в кошелек деньги в размере награды за врага
	// увеличиваем уровень на один
	// сохраняем в хранилище увеличенный уровень
	// отображаем обновленный уровень
	// создаем новый экземпляр класса враг с аргументом экземпляра класса Game
	// для всех героев устанавливаем целью вновь созданного врага
	onKill(enemy) {		
		this.wallet.addMoney(enemy.getReward());
		this.level++;
		localStorage.setItem('level', this.level);
		this.displayLevel();
		var newEnemy = new Enemy(this);
		this.setAllHeroesTarget(newEnemy);
	}

	displayLevel() {
		this.levelElement.innerHTML = this.level + ' Уровень';
	}
}
