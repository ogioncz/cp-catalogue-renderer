import {WikitextGenerator} from '../WikitextGenerator';
import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';
import {hash} from '../vendor/rsvp-latest.js';

export class PenguinStyleGenerator implements WikitextGenerator {
	private template : WikitextTemplate;
	private findById = (list, id) => list.filter((item) => parseInt(item.furniture_item_id) === id);

	constructor(template) {
		this.template = template;
	}

	render(data) {
		let promises = {
			catalogue: Utils.getJson('http://media8.clubpenguin.com/mobile/cp-mobile-ui/clubpenguin_v1_6/' + Utils.full_langs[data.lang] + '/deploy/metaplace/devicepng/config/catalog/' + data.catalogue + '.json'),
			items: Utils.getJson('http://cdn.clubpenguin.com/play/' + data.lang + '/web_service/game_configs/paper_items.json')
		};
		return hash(promises).then(this.template.render);
	}
}