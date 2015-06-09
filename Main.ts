import {Renderer} from './Renderer';
import {Utils} from './Utils';
import {WikitextGenerator} from './WikitextGenerator';
import {WikitextTemplate} from './WikitextTemplate';
import {ItemGenerator} from './generators/ItemGenerator';
import {FurnitureGenerator} from './generators/FurnitureGenerator';
import {PenguinStyleGenerator} from './generators/PenguinStyleGenerator';
import {EnItemTemplate} from './templates/EnItemTemplate';
import {EnFurnitureTemplate} from './templates/EnFurnitureTemplate';
import {PtFurnitureTemplate} from './templates/PtFurnitureTemplate';
import {EnPenguinStyleTemplate} from './templates/EnPenguinStyleTemplate';
import {PtPenguinStyleTemplate} from './templates/PtPenguinStyleTemplate';

var langSelect : HTMLSelectElement = <HTMLSelectElement> document.getElementById('lang');

document.getElementById('render').addEventListener('click', function renderCatalogue(e) {
	let container : HTMLElement = document.createElement('div');
	document.body.appendChild(container);

	let lang = langSelect.options[langSelect.selectedIndex].value;

	let catalogueSelect : HTMLSelectElement = <HTMLSelectElement> document.getElementById('catalogue');	
	let catalogue = catalogueSelect.options[catalogueSelect.selectedIndex].value;

	let renderer = new Renderer(container, 'http://media8.clubpenguin.com/mobile/cp-mobile-ui/clubpenguin_v1_6/' + Utils.full_langs[lang], catalogue);
});

document.getElementById('wikicatalogue').addEventListener('click', function generateCatalogueWikitext(e) {
	let container : HTMLElement = document.createElement('pre');
	document.body.appendChild(container);

	let lang = langSelect.options[langSelect.selectedIndex].value;

	let catalogueSelect : HTMLSelectElement = <HTMLSelectElement> document.getElementById('catalogue');	
	let catalogue = catalogueSelect.options[catalogueSelect.selectedIndex].value;

	var template : WikitextTemplate, generatorClass;
	if (catalogue === 'penstyle') {
		generatorClass = PenguinStyleGenerator;
		if (lang === 'en') {
			template = new EnPenguinStyleTemplate();
		} else if (lang === 'pt') {
			template = new PtPenguinStyleTemplate();
		}
	}

	if (template) {
		let generator : WikitextGenerator = new generatorClass(template);
		generator.render('http://media8.clubpenguin.com/mobile/cp-mobile-ui/clubpenguin_v1_6/' + Utils.full_langs[lang] + '/deploy/metaplace/devicepng/config/catalog/' + catalogue + '.json').then(function(result) {
			container.innerHTML = result;
			Utils.eachChild(container, 'input[type="radio"]', function(el) {
				if (!el.checked) {
					Utils.eachChild(container, '[data-name="' + el.name + '"][data-value="' + el.value + '"]', (child) => child.style.display = 'none');
				}
				el.addEventListener('change', function(e) {
					Utils.eachChild(container, '[data-name="' + this.name + '"]', (child) => child.style.display = 'none');
					Utils.eachChild(container, '[data-name="' + this.name + '"][data-value="' + this.value + '"]', (child) => child.style.display = 'inline');
				});
			});
		}).catch(function(msg) {
			container.textContent = msg;
			alert(msg);
		});
	} else {
		container.parentNode.removeChild(container);
		alert('Requested language/type combination isn’t yet supported.');
	}
});

document.getElementById('item').addEventListener('click', function generateItemWikitext(e) {
	let itemidEntry : HTMLInputElement = <HTMLInputElement> document.getElementById('itemid');
	if (!itemidEntry.checkValidity()) {
		alert('Please enter a valid ID.');
		return;
	}

	let container : HTMLElement = document.createElement('pre');
	document.body.appendChild(container);

	container.innerHTML = '<div class="loading"></div>Loading…';

	let lang = langSelect.options[langSelect.selectedIndex].value;

	let itemtypeSelect : HTMLSelectElement = <HTMLSelectElement> document.getElementById('itemtype');
	let itemtype = itemtypeSelect.options[itemtypeSelect.selectedIndex].value;

	let itemid = parseInt(itemidEntry.value);

	var template : WikitextTemplate, generatorClass;
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
		let generator : WikitextGenerator = new generatorClass(template);
		generator.render(itemid).then(function(result) {
			container.innerHTML = result;
			Utils.eachChild(container, 'input[type="radio"]', function(el) {
				if (!el.checked) {
					Utils.eachChild(container, '[data-name="' + el.name + '"][data-value="' + el.value + '"]', (child) => child.style.display = 'none');
				}
				el.addEventListener('change', function(e) {
					Utils.eachChild(container, '[data-name="' + this.name + '"]', (child) => child.style.display = 'none');
					Utils.eachChild(container, '[data-name="' + this.name + '"][data-value="' + this.value + '"]', (child) => child.style.display = 'inline');
				});
			});
		}).catch(function(msg) {
			container.textContent = msg;
			alert(msg);
		});
	} else {
		container.parentNode.removeChild(container);
		alert('Requested language/type combination isn’t yet supported.');
	}
});

document.getElementById('cache').addEventListener('click', function clearCache(e) {
	localStorage.clear();
});

document.addEventListener('click', function(e) {
	let el : Element = <Element> e.target;
	if (el.classList.contains('copy')) {
		let copyable = el.nextElementSibling;

		window.getSelection().removeAllRanges();
		let range = document.createRange();
		range.selectNode(copyable);
		window.getSelection().addRange(range);

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Copy email command was ' + msg);
		} catch (err) {
			console.log('Oops, unable to copy');
		}
		window.getSelection().removeAllRanges();

		e.preventDefault();
	}
})