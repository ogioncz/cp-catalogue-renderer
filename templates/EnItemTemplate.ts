import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';

export class EnItemTemplate implements WikitextTemplate {
	private types = {1: 'color', 2: 'head', 3: 'face', 4: 'neck', 5: 'body', 6: 'hand', 7: 'feet', 8: 'pin', 9: 'background', 10: 'award'};
	private type_categories = {1: 'Color Items', 2: 'Head Items', 3: 'Face Items', 4: 'Neck Items', 5: 'Body Items', 6: 'Hand Items', 7: 'Feet Items', 8: 'Flags and Pins', 9: 'Backgrounds', 10: 'Awards'};

	render(data) {
		let pl = (a, b) => '<span data-type="radio" data-name="number" data-value="plural">' + a + '</span>' + '<span data-type="radio" data-name="number" data-value="singular">' + b + '</span>';

		let item = data.item;
		item.type = parseInt(item.type);

		let cost = item.cost ? item.cost + ' [[coin]]s' : 'Free';
		let cost_sentence = item.cost ? 'for ' + item.cost + ' [[coin]]s' : 'for free';

		let file_name = Utils.capitalise(item.label).replace(/ /g, '');

		let type_info = (item.type == 8 || item.type == 9) ? ('[[' + Utils.capitalise(this.types[item.type]) + ']]') : (Utils.capitalise(this.types[item.type]) + ' Item');

		let singular_checked = '';
		let plural_checked = '';
		if (item.type == 7) {
			plural_checked = ' checked="checked"';
		} else {
			singular_checked = ' checked="checked"';
		}

		let type_sentence = 'a ' + this.types[item.type] + ((item.type == 8 || item.type == 9) ? '' : ' item');
		let is_member = item.is_member ? 'Yes' : 'No';
		let who_can_buy = !item.is_member ? 'All players' : 'Members';

		let where = '?';
		let where_to_get = ' from ########';
		let history_catalogue = '';

		let d = new Date();

		let penguin_style = true;
		let party = 'None';
		let where_available = where;
		if (penguin_style) {
			d.setDate(Utils.getFirstDayInMonthDate(3, d));
			where_available = where = '[[Penguin Style]]';
			where_to_get = ' from the [[Penguin Style]]';
			history_catalogue = ' in [[' + Utils.en_months[d.getMonth()] + ' ' + d.getFullYear() + ' Penguin Style]]';
		} else {
			where = '[[Headquarters (Inside Out Party)|Headquarters]]';
			where_available = party = '[[Inside Out Party]]';
			where_to_get = ' after finding the missing Disgust Core Memory during the ' + party;
		}

		let goes_along = ` ${pl('They go', 'It goes')} along with [[]] and the [[]].`;

		let release_date = Utils.en_months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();

		let pin_order = item.type === 8 ? ' It was \'\'[[Club Penguin]]\'\'’s ###&lt;sup&gt;th&lt;/sup&gt; [[Pin]].' : '';

		let secret_item = data.secret ? '[[Category:Secret Items]]\n' : '';

		let itemswf_template = 'Itemswf';
		let itemswf_args = '';
		if (item.type === 8) {
			itemswf_args = '|pin=1';
		} else if (item.type === 9) {
			itemswf_template = 'Photoswf';
		}

		let gallery = '';
		if (item.type === 8) {
			gallery = `File:${file_name}Location.png|The ${item.label} location
`;
		} else if (item.type === 9) {
			gallery = `File:${file_name}Icon.png|The ${item.label} icon
`;
		} else {
			gallery = `File:${file_name}1.png|The ${item.label} in-game
File:${file_name}2.png|The ${item.label} on a player card
`;
		}

		let categories = [
			''
		];

		let uploadButton = function(uploaded_url) {
			return ` (<form action="http://www.clubpenguinwiki.info/w/index.php?title=Special:Upload&wpDestFile=${file_name}.png" class="uploadForm" method="post" target="_blank"><input type="hidden" name="wpUploadFileURL" value="${window.location.href + uploaded_url}"><input type="hidden" name="wpUploadDescription" value="Icon of [[${item.label}]]"><input type="hidden" name="wpLicense" value="Copyrighted Game"><input type="hidden" name="wpSourceType" value="url"><button type="submit">Upload</button></form>)`
		}

		let icon_file = `trim.php?i=http://media8.clubpenguin.com/game/items/images/paper/icon/600/${item.id}.png`;
		let paper_file = `trim.php?i=http://media8.clubpenguin.com/game/items/images/paper/icon/600/${item.id}.png`;

		let template = ` · <a href="${icon_file}">inventory icon</a>${uploadButton(icon_file)} · <a href="${paper_file}">player-card</a>

<form><label><input type="radio" name="number" value="singular"${singular_checked}>Singular</label> <label><input type="radio" name="number" value="plural"${plural_checked}>Plural</label></form>
<div class="copyable" data-title="${item.label}">{{ItemInfobox
|name = ${item.label}
|image = File:${file_name}.png
|available = Yes
|type = ${type_info}
|member = ${is_member}
|party = ${party}
|cost = ${cost}
|found = ${where}
|id = ${item.id}
|unlock = No
}}

The '''${item.label}''' ${pl('are a pair of', 'is')} ${type_sentence} in ''[[Club Penguin]]''. ${who_can_buy} are able to get ${item.label} ${cost_sentence}${where_to_get}.${goes_along}

== History ==
This item ${pl('were', 'was')} released on ${release_date}${history_catalogue}.${pin_order}

=== Release History ===
{|class="wikitable"
!Where!!Available from!!Available until
|-
|${where_available}||${release_date}||{{Available|Items}}
|}

== Gallery ==
&lt;gallery&gt;
${gallery}&lt;/gallery&gt;

== Names in other languages ==
{{OtherLanguage
|portuguese = ${item.label_pt}
|french = ${item.label_fr}
|spanish = ${item.label_es}
|german = ${item.label_de}
|russian = ${item.label_ru}
}}

{{${itemswf_template}|${item.id}${itemswf_args}}}

[[Category:Clothing]]
[[Category:${this.type_categories[item.type]}]]
[[Category:Clothes released in ${d.getFullYear()}]]${secret_item}
${categories.join('\n')}
[[pt:${item.label_pt}]]
</div>`;

		return template;
	}
}