import {Renderer} from './Renderer';
import {Utils} from './Utils';
import {ItemGenerator} from './generators/ItemGenerator';
import {WikitextGenerator} from './WikitextGenerator';
import {EnItemTemplate} from './templates/EnItemTemplate';

document.getElementById('render').addEventListener('click', function renderCatalogue(e) {
	let container = document.createElement('div');
	document.body.appendChild(container);

	let lang = document.getElementById('lang');
	lang = lang.options[lang.selectedIndex].value;

	let catalogue = document.getElementById('catalogue');
	catalogue = catalogue.options[catalogue.selectedIndex].value;

	let renderer = new Renderer(container, 'http://media8.clubpenguin.com/mobile/cp-mobile-ui/clubpenguin_v1_6/' + Utils.full_langs[lang], catalogue);
});

document.getElementById('item').addEventListener('click', function renderCatalogue(e) {
	let container = document.createElement('pre');
	document.body.appendChild(container);

	let lang = document.getElementById('lang');
	lang = lang.options[lang.selectedIndex].value;

	let itemtype = document.getElementById('itemtype');
	itemtype = itemtype.options[itemtype.selectedIndex].value;

	let itemid = parseInt(document.getElementById('itemid').value);

	var template, generatorClass : WikitextGenerator;
	if (itemtype === 'item') {
		generatorClass = ItemGenerator;
		if (lang === 'en') {
			template = new EnItemTemplate();
		}
	}

	if (template) {
		let generator = new generatorClass(template);
		generator.render(itemid).then((result) => {container.textContent = result}).catch((msg) => alert(msg));
	} else {
		alert('Requested language/type combination isn’t yet supported.');
	}
});