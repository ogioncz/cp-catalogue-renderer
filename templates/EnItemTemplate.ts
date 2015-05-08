import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';

export class EnItemTemplate implements WikitextTemplate {
	private types = {1: 'color', 2: 'head', 3: 'face', 4: 'neck', 5: 'body', 6: 'hand', 7: 'feet', 8: 'pin', 9: 'background', 10: 'award'};
	private type_categories = {1: 'Color Items', 2: 'Head Items', 3: 'Face Items', 4: 'Neck Items', 5: 'Body Items', 6: 'Hand Items', 7: 'Feet Items', 8: 'Flags and Pins', 9: 'Backgrounds', 10: 'Awards'};

	render(data) {
		let item = data.item;
		item.type = parseInt(item.type);

		let cost = item.cost ? item.cost + ' [[coin]]s' : 'Free';
		let cost_sentence = item.cost ? 'for ' + item.cost + ' [[coin]]s' : 'for free';

		let type_info = this.types[item.type];
		let type_sentence = 'a ' + this.types[item.type];
		let is_member = item.is_member ? 'yes' : 'no';
		let who_can_buy = item.is_member ? 'All players' : 'Members';
		let where_to_get = ' from ########';

		let d = new Date();
		let release_date = Utils.en_months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();

		let pin_order = item.type === 8 ? ' It was \'\'[[Club Penguin]]\'\'’s ###<sup>th</sup> [[Pin]].' : '';

		let secret_item = data.secret ? '[[Category:Secret Items]]\n' : '';

		let itemswf_args = '';
		if (item.type === 8) {
			itemswf_args = '|pin=1';
		} else if (item.type === 9) {
			itemswf_args = '|sprites=0|paper=0|photos=1';
		}

		let template = `{{ItemInfobox
|name = ${item.label}
|image = File:${item.label}.png
|available = Yes
|type = ${type_info}
|member = ${is_member}
|party = None
|cost = ${cost}
|found = ?
|id = ${item.id}
|unlock = No
}}

The '''${item.label}''' is ${type_sentence} in ''[[Club Penguin]]''. ${who_can_buy} are able to get ${item.label} ${cost_sentence}${where_to_get}.

== History ==
This item was released on ${release_date}.${pin_order}

=== Release History ===
{|class="wikitable"
!Available from!!Available until
|-
|${release_date}||{{Available|Items}}
|}

== Gallery ==
<gallery captionalign="left">
File:${item.label}2.png|The ${item.label} in-game.
File:${item.label}1.png|The ${item.label} on a player card.
</gallery>

== Names in other languages ==
{{OtherLanguage
|portuguese = ${item.label_pt}
|french = ${item.label_fr}
|spanish = ${item.label_es}
|german = ${item.label_de}
|russian = ${item.label_ru}
}}

{{Itemswf|${item.id}${itemswf_args}}}

[[Category:Clothing]]
[[Category:${this.type_categories[item.type]}]]
[[Category:Clothes released in ${d.getFullYear()}]]${secret_item}

[[pt:${item.label_pt}]]
`;

		return template;
	}
}