'use strict'


// создаем див
// присваиваем ему класс
// записываем что-то в HTML
// помещаем его в родительский элемент
var createAndAppend = function(parentElement, text, className, visibility) {

	var element = document.createElement('div');
	element.className = className;
	element.innerHTML = text;
	element.style.visibility = visibility;
	parentElement.appendChild(element);
	return element;
}

var decreaseBigNumbers = function(value) {
	var number = value;
	if (value > 1000 && value < 1000000) {
		number = (value / 1000).toFixed(3) + 'k';
		return number;
	} else if (value > 1000000 && value < 1000000000) {
		number = (value / 1000000).toFixed(3) + 'n';
		return number;
	} else if (value > 1000000000){
		number = (value / 1000000000).toFixed(3) + 'o';
		return number;
	} else {
		return value;
	}
}