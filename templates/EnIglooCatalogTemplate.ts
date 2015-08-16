import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';

export class EnIglooCatalogTemplate implements WikitextTemplate {
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
		let igloo_data = data.igloos;
		let location_data = data.locations;
		let getIglooLabel = (id) => (igloo_data[parseInt(id)].name);
		let getLocationLabel = (id) => (location_data.filter((item) => parseInt(item.igloo_location_id) === parseInt(id))[0].label);
		let filenamize = (label) => Utils.capitalise(label).replace(/ /g, '');


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
		for (let item of items.filter((item) => item.category !== 'igloo' && item.category !== 'igloo_location')) {
			items_clearance += `\nFile:${item.category + item.id}.png|[[${item.category + item.id}]]`;
		}

		return `<div class="copyable" data-title="${native_months[month]} ${year} Igloo Catalog">{{Current}}

{{Succession box|${native_months[prev_month]} ${prev_year} Igloo Catalog|}}
&lt;center&gt;The ${native_months[month]} ${year} ''[[Igloo Catalog]]'' was released on ${native_months[month]} ${first_wednesday}, ${year} and it’s still available.&lt;/center&gt;

__NOTOC__
== Cover ==
[[File:IglooCatalog${native_months[month].substring(0, 3)}${year}.png|center|250px]]

== Items ==
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
* [[archives:Media:ENCataloguesIgloo${Utils.en_months[month].substring(0, 3)}${year}.json|Igloo Catalog ${native_months[month]} ${year}]]


{{Igloo Catalog}}

[[Category:Igloo Catalog]]

[[pt:Iglu Novo em Folha ${Utils.pt_months[month]} ${year}]]
</div>`;
	}
}