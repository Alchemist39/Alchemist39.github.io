'use strict'

class Game {
	constructor(parentElement) {
		// устанавливаем уровень равный значению из хранилища или 1
		this.level = parseInt(localStorage.getItem('level')) || 1;

		this.killAtLevel = 1;

		// создаем левое поле
		this.battlefieldElement = createAndAppend(parentElement, '', 'battlefield');
		// создаем правое поле
		this.controlElement = createAndAppend(parentElement, '', 'control');
		// создаем элемент Уровня и передаем в него содержимое HTML 
		this.levelElement = createAndAppend(this.controlElement, this.level + ' Уровень' + ' ' + '(' 
			+ this.killAtLevel + ' ' + '/10)', 'level');
		
		// создаем экземпляр класса кошелек с аргументом экземпляра Game
		this.wallet = new Wallet(this);

		// создаем кнопку ресета хранилища
		this.resetElement = createAndAppend(this.controlElement, 'Reset', 'reset');

		// метод вызова очищения хранилища при клике на элемент ресет
		// создаем переменную с вызовом формы подтверждения
		// если ответ утвердительный (true) очищаем хранилище и перезагружаем страницу
		this.resetElement.onclick = function() {
			var result = confirm('Удалить весь прогресс?');
			if(result) {
				localStorage.clear();
				location.reload();
			}
		}

		// создаем первого врага
		this.enemy = new Enemy(this);

		// создаем экземпляры классов расширенных из класса Герой
		this.clicker = new Clicker(this);
		this.pig = new Pig(this);
		this.devil = new Devil(this);
		this.horse = new Horse(this);

		// вызываем метод установки первой цели - Первый враг
		this.setAllHeroesTarget(this.enemy);

		// создаем временный/тестовый экземпляр класса апгрейд
		this.general = new General(this);

		// в переменную передаем значение даты (количество миллисекунд на момент закрытия игры)
		var previousGameDate = localStorage.getItem('date');

		// при условии существования в хранилище последней даты
		// создаем переменную delta равную разнице дат в момент закрытия и открытия игры
		// переводим миллисекнуды в секунды

		// сохраняем суммарный урон damage всех героев за время, когда игра была закрыта
		// вычисляем сколько врагов умерло с момента закрытия игры

		// добавляем в кошелек деньги за убитых в оффлайне врагов (награда за врага на данном уровне)
		if (previousGameDate) {
			var delta = (new Date()).valueOf() - parseInt(previousGameDate);
			delta = Math.floor(delta / 1000);

			var damage = (this.clicker.damage() + this.pig.damage() + this.devil.damage() + this.horse.damage()) * delta;
			var enemyKilled = Math.floor(damage / this.enemy.hp);

			this.wallet.addMoney(enemyKilled * this.enemy.getReward()); 
		}

		// каждую секунду сохраняем текущее время в миллисекундах
		// (new Date()).valueOf() - приведение текущей даты к миллисекундам
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
	// если врагов на уровне убито меньше 10, то увеличиваем счетчик убитых на уровне врагов
	// если врагов убито 10 на текущем уровне, то устанавливаем счетчик на 1 и 
	// увеличиваем уровень на один
	// сохраняем в хранилище увеличенный уровень
	// отображаем обновленный уровень
	// создаем новый экземпляр класса враг с аргументом экземпляра класса Game
	// для всех героев устанавливаем целью вновь созданного врага
	onKill(enemy) {		
		this.wallet.addMoney(enemy.getReward());
		
		if (this.killAtLevel < 10) {
			this.killAtLevel++;
		} else if (this.killAtLevel == 10) {
			this.killAtLevel = 1;
			this.level++;
		}
		localStorage.setItem('level', this.level);
		this.displayLevel();
		var newEnemy = new Enemy(this);
		this.setAllHeroesTarget(newEnemy);
	}

	// выводим на экран отображение уровня
	displayLevel() {
		this.levelElement.innerHTML = this.level + ' Уровень' + ' ' + '(' + this.killAtLevel + ' ' 
		+ '/10)';
	}
}
