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