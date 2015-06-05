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

		let items = data.configurator;

		let filenamize = (label) => Utils.capitalise(label).replace(/ /g, '');


		let colors = '';
		for (let item of items.filter((item) => parseInt(item.type) === 1)) {
			colors += `\nFile:${filenamize(item.label)}ClothingIcon.png|[[${item.label}]]`;
		}

		let backgrounds = '';
		for (let item of items.filter((item) => parseInt(item.type) === 9)) {
			backgrounds += `\nFile:${filenamize(item.label)}Icon.png|[[${item.label}]]`;
		}

		let member_items = '';
		for (let item of items.filter((item) => item.is_member === 'true')) {
			member_items += `\nFile:${filenamize(item.label)}.png|[[${item.label}]]`;
		}

		let items_for_everyone = '';
		for (let item of items.filter((item) => item.is_member === 'false' && parseInt(item.type) !== 1 && parseInt(item.type) !== 8 && parseInt(item.type) !== 9)) {
			items_for_everyone += `\nFile:${filenamize(item.label)}.png|[[${item.label}]]`;
		}

		let flags = '';
		for (let item of items.filter((item) => parseInt(item.type) === 8)) {
			flags += `\nFile:${filenamize(item.label)}Flag.png|[[${item.label} flag|${item.label}]]`;
		}


		return `{{Current}}
{{Spoilers}}

{{Succession box|${native_months[prev_month]} ${prev_year} Penguin Style|${native_months[next_month]} ${next_year} Penguin Style}}

&lt;center&gt;The ${native_months[month]} ${year} ''[[Penguin Style]]'' catalog was released on ${native_months[month]} ${first_wednesday}, ${year} and is still available.&lt;/center&gt;

== Cover ==
[[File:PenguinStyle${native_months[month]}${year}.png|center|250px]]

__NOTOC__

== Items ==
&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Colors'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${colors}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Backgrounds'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${backgrounds}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Items for everyone'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${items_for_everyone}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Member clothes'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${member_items}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''"Build your own Hoodie" items'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;
File:Clothing4500.PNG|[[Custom Hoodie|Black Hoodie with white dots]]
File:Clothing4582.PNG|[[Custom Hoodie|Black Hoodie with red and yellow splatter]]
File:Clothing4583.PNG|[[Custom Hoodie|Black Hoodie with white stars]]
File:Clothing4584.PNG|[[Custom Hoodie|Black Hoodie with white stripes]]
File:Clothing4585.PNG|[[Custom Hoodie|Black Hoodie with Black Puffle in fire]]
File:Clothing4495.PNG|[[Custom Hoodie|White Hoodie with black dots]]
File:Clothing4586.PNG|[[Custom Hoodie|White Hoodie with red and yellow splatter]]
File:Clothing4587.PNG|[[Custom Hoodie|White Hoodie with black stars]]
File:Clothing4588.PNG|[[Custom Hoodie|White Hoodie with grey stripes]]
File:Clothing4589.PNG|[[Custom Hoodie|White Hoodie with Black Puffle in fire]]
File:Clothing4591.PNG|[[Custom Hoodie|Yellow Hoodie with black dots]]
File:Clothing4590.PNG|[[Custom Hoodie|Yellow Hoodie with red and yellow splatter]]
File:Clothing4592.PNG|[[Custom Hoodie|Yellow Hoodie with white stars]]
File:Clothing4593.PNG|[[Custom Hoodie|Yellow Hoodie with white stripes]]
File:Clothing4594.PNG|[[Custom Hoodie|Yellow Hoodie with Black Puffle in fire]]
File:Clothing4595.PNG|[[Custom Hoodie|Orange Hoodie with black dots]]
File:Clothing4596.PNG|[[Custom Hoodie|Orange Hoodie with red and yellow splatter]]
File:Clothing4597.PNG|[[Custom Hoodie|Orange Hoodie with white stars]]
File:Clothing4598.PNG|[[Custom Hoodie|Orange Hoodie with white stripes]]
File:Clothing4599.PNG|[[Custom Hoodie|Orange Hoodie with Black Puffle in fire]]
File:Clothing4600.PNG|[[Custom Hoodie|Red Hoodie with black dots]]
File:Clothing4601.PNG|[[Custom Hoodie|Red Hoodie with red and yellow splatter]]
File:Clothing4602.PNG|[[Custom Hoodie|Red Hoodie with white stars]]
File:Clothing4603.PNG|[[Custom Hoodie|Red Hoodie with white stripes]]
File:Clothing4604.PNG|[[Custom Hoodie|Red Hoodie with Black Puffle in fire]]
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''“LAST CHANCE!” items'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;
File:Hans'Boots.PNG|[[Hans' Boots]]
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Flags'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${flags}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

== Secret items ==
{{Spoiler}}
=== Member clothes ===

=== Build your own hoodie! ===
* Click the Purple Penguin’s flipper → [[Viking Helmet]]
:* Repeat the steps to get the Viking Helmet 3 times (so you’ll find the Blue Viking Helmet on the fourth time) → [[Blue Viking Helmet]]

=== “LAST CHANCE!” items ===
* Click on the snow near the “L” of Leader → [[Checkered Scarf]]
* Click on the purple penguin’s flipper → [[Lime Green Sneakers]]
* Click on the owl of the ''Owl I Want Outfit'' → [[Hot Pink Sneakers]]
{{Spoiler2}}

== SWF ==
* [[archives:Media:ENCataloguesClothing${native_months[month].substr(0, 3)}${year}.swf|${native_months[month]} ${year} Penguin Style]]

[[Category:Penguin Style]]
{{Penguin Style}}

[[pt:Estilo Pinguim ${Utils.pt_months[month]} ${year}]]
`;
	}
}