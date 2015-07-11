import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';

export class PtIglooCatalogTemplate implements WikitextTemplate {
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
		let igloo_data = data.igloos;
		let location_data = data.locations;
		let getIglooLabel = (id) => (igloo_data[parseInt(id)].name);
		let getLocationLabel = (id) => (location_data.filter((item) => parseInt(item.igloo_location_id) === parseInt(id))[0].label);
		let filenamize = (label) => label.replace(/ /g, '');


		let igloos_current = '';
		for (let item of items.filter((item) => false)) {
			igloos_current += `\nArquivo:${filenamize(getIglooLabel(item.id))}.png|[[${getIglooLabel(item.id)}]]`;
		}

		let igloos_normal = '';
		for (let item of items.filter((item) => item.category === 'igloo')) {
			igloos_normal += `\nArquivo:${filenamize(getIglooLabel(item.id))}.png|[[${getIglooLabel(item.id)}]]`;
		}

		let igloo_locations = '';
		for (let item of items.filter((item) => item.category === 'igloo_location')) {
			igloo_locations += `\nArquivo:${filenamize(getLocationLabel(item.id))}Iglu.png|[[${getLocationLabel(item.id)} (local para iglu)|${getLocationLabel(item.id)}]]`;
		}

		let items_clearance = '';
		for (let item of items.filter((item) => item.category !== 'igloo' && item.category !== 'igloo_location')) {
			items_clearance += `\nArquivo:${item.category + item.id}.png|[[${item.category + item.id}]]`;
		}

		return `<div class="copyable" data-title="Iglu Novo em Folha ${native_months[month]} ${year}">{{Caixa de Sucessão|Iglu Novo em Folha ${native_months[prev_month]} ${prev_year}|Iglu Novo em Folha ${native_months[next_month]} ${next_year}}}
&lt;center&gt;O catálogo [[Iglu Novo em Folha]] de ${native_months[month]} de ${year} foi lançado dia ${first_wednesday} de ${native_months[month]} e permaneceu disponível até ${next_wednesday} de ${native_months[next_month]} de ${next_year}.&lt;/center&gt;

__NOTOC__
== Capa ==
[[Arquivo:IgluNovoemFolha${native_months[month].substring(0, 3)}${short_year}.png|center|250px]]

== Itens ==
&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Iglus de ${native_months[month]}'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${igloos_current}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Iglus'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${igloos_normal}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Pisos para iglus'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${igloo_locations}
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
* [[archives:Media:PTCataloguesFurniture${Utils.en_months[month].substring(0, 3)}${year}.json|Iglu Novo em Folha ${native_months[month]} ${year}]]


{{Iglu Novo em Folha}}

[[Categoria:Iglu Novo em Folha]]

[[en:${Utils.en_months[month]} ${year} Igloo Catalog]]
</div>`;
	}
}