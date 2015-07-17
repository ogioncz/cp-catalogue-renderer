import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';

export class EnFurnitureTemplate implements WikitextTemplate {
	private types = {1: 'room', 2: 'wall', 3: 'floor', 4: 'pet'}
	private sorts = {1: 'room', 2: 'wall', 3: 'floor', 4: 'pet'}

	render(data) {
		let item = data.item;
		item.type = parseInt(item.type);
		item.sort = parseInt(item.sort);

		let cost = item.cost ? item.cost + ' [[coin]]s' : 'free';

		let is_member = item.is_member ? 'Yes' : 'No';

		let d = new Date();
		let release_date = Utils.en_months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();

		let catalogue = true;
		let catalogue_sentence = catalogue ? (' in the [[' + Utils.en_months[d.getMonth()] + ' ' + d.getFullYear() + ' Furniture & Igloo Catalog]]') : '';

		return `<div class="copyable" data-title="${item.label}">{{FurnitureInfobox
|name = ${item.label}
|available = Yes
|member = ${is_member}
|image = File:${item.label}.png
|type = ${Utils.capitalise(this.types[item.type])} [[Furniture]]
|sort = ${Utils.capitalise(this.sorts[item.sort])}
|cost = ${cost}
|id = ${item.id}
}}

The '''${item.label}''' is a ${this.sorts[item.sort]} furniture item in ''[[Club Penguin]]''. [[Members]] are able to purchase this item for ${cost} each in the ''[[Furniture & Igloo Catalog]]''.

== History ==
The ${item.label} made its debut on ${release_date}${catalogue_sentence}. It's currently considered a common item.

=== Release history ===
{|class="wikitable"
!Catalog!!Available from!!Available until
|-
|Furniture & Igloo Catalog||${release_date}||{{Available|Furniture}}
|}

== Names in other languages ==
{{OtherLanguage
|portuguese = ${item.label_pt}
|french = ${item.label_fr}
|spanish = ${item.label_es}
|german = ${item.label_de}
|russian = ${item.label_ru}
}}

{{Furnitureswf|${item.id}}}

[[Category:${Utils.capitalise(this.sorts[item.sort])} Furniture]]
[[Category:Furniture released in ${d.getFullYear()}]]]

[[pt:${item.label_pt}]]
</div>`;
	}
}