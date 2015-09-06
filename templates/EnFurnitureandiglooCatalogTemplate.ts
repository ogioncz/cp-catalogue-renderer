import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';

export class EnFurnitureandiglooCatalogTemplate implements WikitextTemplate {
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
		let igloo_data = data.igloos;
		let location_data = data.locations;
		let getFurnitureLabel = (id) => (furniture_data.filter((item) => parseInt(item.furniture_item_id) === parseInt(id))[0].label);
		let getFloorLabel = (id) => (flooring_data.filter((item) => parseInt(item.igloo_floor_id) === parseInt(id))[0].label);
		let getIglooLabel = (id) => (igloo_data[parseInt(id)].name);
		let getLocationLabel = (id) => (location_data.filter((item) => parseInt(item.igloo_location_id) === parseInt(id))[0].label);
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

		let igloos_current = '';
		for (let item of items.filter((item) => false)) {
			igloos_current += `\nFile:${filenamize(getIglooLabel(item.id))}.png|[[${getIglooLabel(item.id)}]]`;
		}

		let igloos_normal = '';
		for (let item of items.filter((item) => item.category === 'igloo')) {
			igloos_normal += `\nFile:${filenamize(getIglooLabel(item.id))}.png|[[${getIglooLabel(item.id)}]]`;
		}

		let igloo_locations = '';
		for (let item of items.filter((item) => item.category === 'igloo_location')) {
			igloo_locations += `\nFile:${filenamize(getLocationLabel(item.id))}LocationIcon.png|[[${getLocationLabel(item.id)} Location]]`;
		}

		let items_clearance = '';
		for (let item of items.filter((item) => item.category !== 'furniture_item' && item.category !== 'igloo_floor' && item.category !== 'igloo' && item.category !== 'igloo_location')) {
			items_clearance += `\nFile:${item.category + item.id}.png|[[${item.category + item.id}]]`;
		}

		return `<div class="copyable" data-title="${native_months[month]} ${year} Furniture & Igloo Catalog">{{Current}}

{{Succession box|${native_months[prev_month]} ${prev_year} Furniture Catalog|}}
&lt;center&gt;The ${native_months[month]} ${year} ''[[Furniture & Igloo Catalog]]'' was released on ${native_months[month]} ${first_wednesday}, ${year} and it’s still available.&lt;/center&gt;

__NOTOC__
== Cover ==
[[File:Furniture&IglooCatalog${native_months[month]}${year}.png|center|250px]]

== Items ==
=== ${native_months[month]} Furniture ===
&lt;gallery&gt;${items_current}
&lt;/gallery&gt;

=== Furniture ===
&lt;gallery&gt;${items_normal}
&lt;/gallery&gt;

=== Igloo Flooring ===
&lt;gallery&gt;${items_flooring}
&lt;/gallery&gt;

=== ${native_months[month]} Igloos ===
&lt;gallery&gt;${igloos_current}
&lt;/gallery&gt;

=== Igloos ===
&lt;gallery&gt;${igloos_normal}
&lt;/gallery&gt;

=== Igloo Locations ===
&lt;gallery&gt;${igloo_locations}
&lt;/gallery&gt;

=== Until ${native_months[next_month].toLowerCase().substring(0, 3)}. ${next_wednesday} ===
&lt;gallery&gt;${items_clearance}
&lt;/gallery&gt;

== Archived files ==
* [[archives:Media:ENCataloguesFurniture${Utils.en_months[month].substring(0, 3)}${year}.json|Furniture & Igloo Catalog ${native_months[month]} ${year}]]


{{Furniture & Igloo Catalog}}

[[Category:Furniture & Igloo Catalog]]

[[pt:Iglu Doce Iglu ${Utils.pt_months[month]} ${year}]]
</div>`;
	}
}