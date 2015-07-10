import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';

export class PtPenguinStyleTemplate implements WikitextTemplate {
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
		let item_data = data.items;
		let getLabel = (id) => (item_data.filter((item) => parseInt(item.paper_item_id) === parseInt(id))[0].label);
		let filenamize = (label) => label.replace(/ /g, '');


		let colors = '';
		for (let item of items.filter((item) => parseInt(item.type) === 1)) {
			colors += `\nArquivo:IconeCor${filenamize(getLabel(item.id))}.png|[[${getLabel(item.id)}]]`;
		}

		let backgrounds = '';
		for (let item of items.filter((item) => parseInt(item.type) === 9)) {
			backgrounds += `\nArquivo:${filenamize(getLabel(item.id))}Icon.png|[[${getLabel(item.id)}]]`;
		}

		let member_items = '';
		for (let item of items.filter((item) => item.is_member === 'true')) {
			member_items += `\nArquivo:${filenamize(getLabel(item.id))}.png|[[${getLabel(item.id)}]]`;
		}

		let items_for_everyone = '';
		for (let item of items.filter((item) => item.is_member === 'false' && parseInt(item.type) !== 1 && parseInt(item.type) !== 8 && parseInt(item.type) !== 9)) {
			items_for_everyone += `\nArquivo:${filenamize(getLabel(item.id))}.png|[[${getLabel(item.id)}]]`;
		}

		let flags = '';
		for (let item of items.filter((item) => parseInt(item.type) === 8)) {
			flags += `\nArquivo:Bandeira${filenamize(getLabel(item.id))}.png|[[Bandeira ${getLabel(item.id)}|${getLabel(item.id)}]]`;
		}

		return `{{Caixa de Sucessão|Estilo Pinguim ${native_months[prev_month]} ${prev_year}|Estilo Pinguim ${native_months[next_month]} ${next_year}}}
&lt;center&gt;O catálogo [[Estilo Pinguim]] de ${native_months[month]} de ${year} foi lançado no dia ${first_wednesday} de ${native_months[month]} e permaneceu disponível até ${next_wednesday} de ${native_months[next_month]} de ${next_year}.&lt;/center&gt;

__NOTOC__
== Capa ==
[[Arquivo:EstiloPinguim${Utils.stripDiacritics(native_months[month])}${short_year}.png|center|250px]]

== Itens ==
&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Cores'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${colors}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Planos de Fundo'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${backgrounds}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Itens para todos os pinguins'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${items_for_everyone}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Itens para assinantes'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${member_items}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Faça um moletom do seu jeito'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;

&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''ÚLTIMA CHANCE'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;

&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

&lt;div class="toccolours mw-collapsible mw-collapsed"&gt;
&lt;center&gt;&lt;big&gt;'''Bandeiras'''&lt;/big&gt;&lt;/center&gt;
&lt;div class="mw-collapsible-content"&gt;
&lt;gallery&gt;${flags}
&lt;/gallery&gt;
&lt;/div&gt;
&lt;/div&gt;

== Itens secretos ==
=== Itens para assinantes ===
* Clique na posição 1 ou 2 do ''Leaderboard'' → [[Cachecol Axadrezado]]

=== Crie o seu moletom ===
* Clique na nadadeira direita do pinguim roxo → [[Elmo de Viking]]
** Repita isso três vezes (assim na quarta vez você vai encontrar o Elmo de Viking Azul) → [[Elmo de Viking Azul]]

=== Até ${next_wednesday} de ${native_months[next_month].toLocaleLowerCase()} ===
* Clique no tênis da direita dos ''Tênis Quadriculados Roxos'' → [[Fantasia de Puffle Dourado]]

== Arquivos arquivados ==
* [[archives:Media:PTCataloguesClothing${Utils.en_months[month].substring(0, 3)}${year}.json|Estilo Pinguim ${native_months[month]} ${year}]]


{{Estilo Pinguim}}

[[Categoria:Estilo Pinguim]]

[[en:${Utils.en_months[month]} ${year} Penguin Style]]
`;
	}
}