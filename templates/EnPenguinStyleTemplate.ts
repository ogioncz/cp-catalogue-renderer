import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';

export class EnPenguinStyleTemplate implements WikitextTemplate {
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
		let item_data = data.items;
		let getLabel = (id) => (item_data.filter((item) => parseInt(item.paper_item_id) === parseInt(id))[0].label);


		let filenamize = (label) => Utils.capitalise(label).replace(/ /g, '');


		let colors = '';
		for (let item of items.filter((item) => parseInt(item.type) === 1)) {
			colors += `\nFile:${filenamize(getLabel(item.id))}ClothingIcon.png|[[${getLabel(item.id)}]]`;
		}

		let backgrounds = '';
		for (let item of items.filter((item) => parseInt(item.type) === 9)) {
			backgrounds += `\nFile:${filenamize(getLabel(item.id))}Icon.png|[[${getLabel(item.id)}]]`;
		}

		let member_items = '';
		for (let item of items.filter((item) => item.is_member === 'true')) {
			member_items += `\nFile:${filenamize(getLabel(item.id))}.png|[[${getLabel(item.id)}]]`;
		}

		let items_for_everyone = '';
		for (let item of items.filter((item) => item.is_member === 'false' && parseInt(item.type) !== 1 && parseInt(item.type) !== 8 && parseInt(item.type) !== 9)) {
			items_for_everyone += `\nFile:${filenamize(getLabel(item.id))}.png|[[${getLabel(item.id)}]]`;
		}

		let flags = '';
		for (let item of items.filter((item) => parseInt(item.type) === 8)) {
			flags += `\nFile:${filenamize(getLabel(item.id))}Flag.png|[[${getLabel(item.id)} flag|${getLabel(item.id)}]]`;
		}


		return `<div class="copyable" data-title="${native_months[month]} ${year} Penguin Style">{{Current}}

{{Succession box|${native_months[prev_month]} ${prev_year} Penguin Style|${native_months[next_month]} ${next_year} Penguin Style}}

&lt;center&gt;The ${native_months[month]} ${year} ''[[Penguin Style]]'' catalog was released on ${native_months[month]} ${first_wednesday}, ${year} and is still available.&lt;/center&gt;

== Cover ==
[[File:PenguinStyle${native_months[month]}${year}.png|center|250px]]

__NOTOC__

== Items ==
=== Colors ===
&lt;gallery widths="60" heights="60"&gt;${colors}
&lt;/gallery&gt;

=== Backgrounds ===
&lt;gallery&gt;${backgrounds}
&lt;/gallery&gt;

=== Items for everyone ===
&lt;gallery&gt;${items_for_everyone}
&lt;/gallery&gt;

=== Member clothes ===
&lt;gallery&gt;${member_items}
&lt;/gallery&gt;

=== “LAST CHANCE!” items ===
&lt;gallery&gt;

&lt;/gallery&gt;

=== Flags ===
&lt;gallery widths="60" heights="60"&gt;${flags}
&lt;/gallery&gt;

== Archived files ==
* [[archives:Media:ENCataloguesClothing${native_months[month].substr(0, 3)}${year}.json|${native_months[month]} ${year} Penguin Style]]

{{Penguin Style}}

[[Category:Penguin Style]]

[[pt:Estilo Pinguim ${Utils.pt_months[month]} ${year}]]
</div>`;
	}
}