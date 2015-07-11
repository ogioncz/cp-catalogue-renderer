import {Renderer} from './Renderer';
import {Utils} from './Utils';
import {WikitextGenerator} from './WikitextGenerator';
import {WikitextTemplate} from './WikitextTemplate';
import {ItemGenerator} from './generators/ItemGenerator';
import {FurnitureGenerator} from './generators/FurnitureGenerator';
import {PenguinStyleGenerator} from './generators/PenguinStyleGenerator';
import {IglooCatalogGenerator} from './generators/IglooCatalogGenerator';
import {FurnitureCatalogGenerator} from './generators/FurnitureCatalogGenerator';
import {EnItemTemplate} from './templates/EnItemTemplate';
import {EnFurnitureTemplate} from './templates/EnFurnitureTemplate';
import {PtFurnitureTemplate} from './templates/PtFurnitureTemplate';
import {EnPenguinStyleTemplate} from './templates/EnPenguinStyleTemplate';
import {PtPenguinStyleTemplate} from './templates/PtPenguinStyleTemplate';
import {EnIglooCatalogTemplate} from './templates/EnIglooCatalogTemplate';
import {PtIglooCatalogTemplate} from './templates/PtIglooCatalogTemplate';
import {EnFurnitureCatalogTemplate} from './templates/EnFurnitureCatalogTemplate';
import {PtFurnitureCatalogTemplate} from './templates/PtFurnitureCatalogTemplate';

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
	} else if (catalogue === 'igloo') {
		generatorClass = IglooCatalogGenerator;
		if (lang === 'en') {
			template = new EnIglooCatalogTemplate;
		} else if (lang === 'pt') {
			template = new PtIglooCatalogTemplate;
		}
	} else if (catalogue === 'iglooedit') {
		generatorClass = FurnitureCatalogGenerator;
		if (lang === 'en') {
			template = new EnFurnitureCatalogTemplate;
		} else if (lang === 'pt') {
			template = new PtFurnitureCatalogTemplate;
		}
	}

	if (template) {
		let generator : WikitextGenerator = new generatorClass(template);
		container.innerHTML = '<div class="loading"></div>Loading…';
		generator.render({catalogue: catalogue, lang: lang}).then(function(result) {
			container.innerHTML = '<button type="button" class="edit">edit</button>' + result;
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
			container.parentNode.removeChild(container);
			alert(msg);
		});
	} else {
		container.parentNode.removeChild(container);
		alert('Requested language/type combination isn’t yet supported.');
	}
});

let itemidEntry : HTMLInputElement = <HTMLInputElement> document.getElementById('itemid');

itemidEntry.addEventListener('keypress', (e) => {
	if (e.key == 'Enter') {
		document.getElementById('item').click();
	}
})

document.getElementById('item').addEventListener('click', function generateItemWikitext(e) {
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
			container.innerHTML = '<button type="button" class="edit">edit</button>' + result;
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
			container.parentNode.removeChild(container);
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
	if (el.classList.contains('edit')) {
		let lang = langSelect.options[langSelect.selectedIndex].value;
		let copyable = el;
		while(copyable && !copyable.classList.contains('copyable')) {
			console.log(copyable);
			copyable = copyable.nextElementSibling;
		}

		let form = document.createElement('form');
		form.action = 'http://' + (lang == 'pt' ? 'pt' : 'www') + '.clubpenguinwiki.info/w/index.php?title=' + encodeURIComponent(copyable.getAttribute('data-title')) + '&action=edit';
		form.method = 'post';
		form.target = '_blank';
		form.style.display = 'none';

		let textarea = document.createElement('textarea');
		textarea.name = 'wpTextbox1';
		window.getSelection().removeAllRanges();
		let range = document.createRange();
		range.selectNode(copyable);
		window.getSelection().addRange(range);
		textarea.value = window.getSelection().toString();

		form.appendChild(textarea);
		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
	}
})