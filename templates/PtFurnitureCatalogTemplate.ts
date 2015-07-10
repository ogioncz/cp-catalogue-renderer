import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';

export class PtFurnitureCatalogTemplate implements WikitextTemplate {
	render(data) {
		let native_months = Utils.pt_months;

		let d = new Date();
		let month = d.getMonth();
		let year = d.getFullYear();
		let short_year = year.toString().slice(2,4);
		let first_wednesday = Utils.getFirstDayInMonthDate(3, d);

		d.setMonth(d.getMonth() + 1);
		let next_month = d.getMonth();
		let next_year = d.getFullYear();
		let next_wednesday = Utils.getFirstDayInMonthDate(3, d);

		d.setMonth(d.getMonth() - 2);
		let prev_month = d.getMonth();
		let prev_year = d.getFullYear();


		let items = data.catalogue.configurator;
		let furniture_data = data.furniture;
		let flooring_data = data.flooring;
		let getFurnitureLabel = (id) => (furniture_data.filter((item) => parseInt(item.furniture_item_id) === parseInt(id))[0].label);
		let getFloorLabel = (id) => (flooring_data.filter((item) => parseInt(item.igloo_floor_id) === parseInt(id))[0].label);
		let filenamize = (label) => label.replace(/ /g, '');


		let items_current = '';
		for (let item of items.filter((item) => false)) {
			items_current += `\nArquivo:${filenamize(getFurnitureLabel(item.id))}.png|[[${getFurnitureLabel(item.id)}]]`;
		}

		let items_normal = '';
		for (let item of items.filter((item) => item.category === 'furniture_item')) {
			items_normal += `\nArquivo:${filenamize(getFurnitureLabel(item.id))}.png|[[${getFurnitureLabel(item.id)}]]`;
		}

		let items_flooring = '';
		for (let item of items.filter((item) => item.category === 'igloo_floor')) {
			items_flooring += `\nArquivo:${filenamize(getFloorLabel(item.id))}.png|[[${getFloorLabel(item.id)}]]`;
		}

		let items_clearance = '';
		for (let item of items.filter((item) => item.category !== 'furniture_item' && item.category !== 'igloo_floor')) {
			items_clearance += `\nArquivo:${filenamize(getFurnitureLabel(item.id))}.png|[[${getFurnitureLabel(item.id)}]]`;
		}

		return `{{Caixa de Sucessão|Iglu Doce Iglu ${native_months[prev_month]} ${prev_year}|Iglu Doce Iglu ${native_months[next_month]} ${next_year}}}
&lt;center&gt;O catálogo [[Iglu Doce Iglu]] de ${native_months[month]} de ${year} foi lançado dia ${first_wednesday} de ${native_months[month]} e permaneceu disponível até ${next_wednesday} de ${native_months[next_month]} de ${next_year}.&lt;/center&gt;

__NOTOC__
== Capa ==
[[Arquivo:IgluDoceIglu${native_months[month].substring(0, 3)}${short_year}.png|center|250px]]

== Itens ==
&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Móveis de ${native_months[month]}'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${items_current}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Móveis'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${items_normal}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Pisos para iglus'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${items_flooring}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Até ${next_wednesday} de ${native_months[next_month].toLowerCase().substring(0, 3)}.'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${items_clearance}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;


== Arquivos arquivados ==
* [[archives:Media:PTCataloguesFurniture${Utils.en_months[month].substring(0, 3)}${year}.json|Iglu Doce Iglu ${native_months[month]} ${year}]]


{{Iglu Doce Iglu}}

[[Categoria:Iglu Doce Iglu]]

[[en:${Utils.en_months[month]} ${year} Furniture Catalog]]
`;
	}
}