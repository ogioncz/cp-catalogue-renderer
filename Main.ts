import {Renderer} from './Renderer';
import {Utils} from './Utils';

document.getElementById('render').addEventListener('click', function renderCatalogue(e) {
	let container = document.createElement('div');
	document.body.appendChild(container);

	let lang = document.getElementById('lang');
	lang = lang.options[lang.selectedIndex].value;

	let catalogue = document.getElementById('catalogue');
	catalogue = catalogue.options[catalogue.selectedIndex].value;

	let renderer = new Renderer(container, 'http://media8.clubpenguin.com/mobile/cp-mobile-ui/clubpenguin_v1_6/' + Utils.full_langs[lang], catalogue);
});