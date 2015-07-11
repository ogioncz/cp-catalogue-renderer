import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';

export class EnFurnitureCatalogTemplate implements WikitextTemplate {
	render(data) {
		let native_months = Utils.en_months;

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
			items_current += `\nFile:${filenamize(getFurnitureLabel(item.id))}.png|[[${getFurnitureLabel(item.id)}]]`;
		}

		let items_normal = '';
		for (let item of items.filter((item) => item.category === 'furniture_item')) {
			items_normal += `\nFile:${filenamize(getFurnitureLabel(item.id))}.png|[[${getFurnitureLabel(item.id)}]]`;
		}

		let items_flooring = '';
		for (let item of items.filter((item) => item.category === 'igloo_floor')) {
			items_flooring += `\nFile:${filenamize(getFloorLabel(item.id))}.png|[[${getFloorLabel(item.id)}]]`;
		}

		let items_clearance = '';
		for (let item of items.filter((item) => item.category !== 'furniture_item' && item.category !== 'igloo_floor')) {
			items_clearance += `\nFile:${filenamize(getFurnitureLabel(item.id))}.png|[[${getFurnitureLabel(item.id)}]]`;
		}

		return `<div class="copyable" data-title="${native_months[month]} ${year} Furniture Catalog">{{Current}}

{{Succession box|${native_months[prev_month]} ${prev_year} Furniture Catalog|}}
&lt;center&gt;The ${native_months[month]} ${year} ''[[Furniture Catalog]]'' was released on ${native_months[month]} ${first_wednesday}, ${year} and it’s still available.&lt;/center&gt;

__NOTOC__
== Cover ==
[[File:FurnitureCatalog${native_months[month].substring(0, 3)}${year}.png|center|250px]]

== Items ==
&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''${native_months[month]} Furniture'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${items_current}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Furniture'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${items_normal}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Igloo Flooring'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${items_flooring}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Until ${native_months[next_month].toLowerCase().substring(0, 3)}. ${next_wednesday}'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${items_clearance}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

== Archived files ==
* [[archives:Media:ENCataloguesFurniture${Utils.en_months[month].substring(0, 3)}${year}.json|Furniture Catalog ${native_months[month]} ${year}]]


{{Furniture Catalog}}

[[Category:Furniture Catalog]]

[[pt:Iglu Doce Iglu ${Utils.pt_months[month]} ${year}]]
</div>`;
	}
}