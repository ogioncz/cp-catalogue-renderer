import {Renderer} from './Renderer';
import {Utils} from './Utils';
import {WikitextGenerator} from './WikitextGenerator';
import {ItemGenerator} from './generators/ItemGenerator';
import {FurnitureGenerator} from './generators/FurnitureGenerator';
import {EnItemTemplate} from './templates/EnItemTemplate';
import {EnFurnitureTemplate} from './templates/EnFurnitureTemplate';
import {PtFurnitureTemplate} from './templates/PtFurnitureTemplate';

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

	container.innerHTML = '<div class="loading"></div>Loading…';

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
	} else if (itemtype === 'furniture') {
		generatorClass = FurnitureGenerator;
		if (lang === 'en') {
			template = new EnFurnitureTemplate();
		} else if (lang === 'pt') {
			template = new PtFurnitureTemplate();
		}
	}

	if (template) {
		let generator = new generatorClass(template);
		generator.render(itemid).then((result) => {container.textContent = result}).catch(function(msg) {
			container.textContent = msg;
			alert(msg);
		});
	} else {
		alert('Requested language/type combination isn’t yet supported.');
	}
});