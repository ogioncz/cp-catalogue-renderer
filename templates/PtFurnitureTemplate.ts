import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';

export class PtFurnitureTemplate implements WikitextTemplate {
	private types = {1: 'room', 2: 'wall', 3: 'floor', 4: 'pet'}
	private sorts = {1: 'room', 2: 'wall', 3: 'floor', 4: 'pet'}

	render(data) {
		let item = data.item;
		item.type = parseInt(item.type);
		item.sort = parseInt(item.sort);

		let available = true ? 'Sim' : 'Não';

		let pl = (a, b) => '<span data-type="radio" data-name="number" data-value="plural">' + a + '</span>' + '<span data-type="radio" data-name="number" data-value="singular">' + b + '</span>';
		let f = (a, b) => '<span data-type="radio" data-name="gender" data-value="femininum">' + a + '</span>' + '<span data-type="radio" data-name="gender" data-value="masculinum">' + b + '</span>';

		let cost = item.cost ? item.cost + ' cada' : 'Grátis';
		let price_sentence =  item.cost ? ('por ' + item.cost + ' cada') : 'gratuitamente';

		let is_member = item.is_member ? 'Sim' : 'Não';

		let d = new Date();
		let release_date = Utils.pt_months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
		let release_year = d.getFullYear();
		let release_month = Utils.pt_months[d.getMonth()];
		let catalogue_issue = Utils.pt_months[d.getMonth()] + ' ' + d.getFullYear();

		let image = 'File:' + Utils.stripDiacritics(item.label_pt) + '.png'

		return `<form><label><input type="radio" name="gender" value="masculinum" checked="checked">Masculinum</label> <label><input type="radio" name="gender" value="femininum">Femininum</label>
<label><input type="radio" name="number" value="singular" checked="checked">Singular</label> <label><input type="radio" name="number" value="plural">Plural</label>

{{InfoboxMoveis
|nome = ${item.label_pt}
|imagem = ${image}
|disponivel = ${available}
|assinantes = ${is_member}
|categoria = Móvel de ${Utils.capitalise(this.types[item.type])}
|preco = ${item.id}
|encontrado = ???
|id = ${cost}
}}

${f('A', 'O')}${pl('s', '')} '''${item.label_pt}''' ${pl('são', 'é')} um móvel de ${this.types[item.type]} do [[Club Penguin]]. ${f('Ela', 'Ele')}${pl('s', '')} ${pl('estão disponíveis', 'está disponível')} no catálogo [[Iglu & Cia]], onde [[assinante]]s podem ${f('adquiri-la', 'adquiri-lo')}${pl('s', '')} ${price_sentence}.

== História ==
${f('A', 'O')}${pl('s', '')} ${item.label_pt} ${pl('foram', 'foi')} ${f('lançada', 'lançado')}${pl('s', '')} na edição de [[Iglu & Cia ${catalogue_issue}|${release_month} de ${release_year}]] do catálogo Iglu & Cia. Atualmente ${pl('são', 'é')} ${f('considerada', 'considerado')}${pl('s', '')} um móvel comum.

=== Histórico ===
{|class="wikitable table-release-history" 
!Catálogo!!Disponível de!!Disponível até
|-
|[[Iglu & Cia]]||${release_date}||{{Disponível|Móveis}}
|}

== Em outras línguas ==
{{OutroIdioma
|inglês = ${item.label_en}
|francês = ${item.label_fr}
|espanhol = ${item.label_es}
|alemão = ${item.label_ru}
|russo = ${item.label_de}
|lrusso = ${Utils.transliterateCyrillic(item.label_ru)}
}}

{{Movswf|${item.id}}}

[[Categoria:Móveis de ${Utils.capitalise(this.sorts[item.sort])}]]
[[Categoria:Móveis lançados em ${release_year}]]

[[en:${item.label_en}]]
</form>`;
	}
}