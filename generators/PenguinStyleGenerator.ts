import {WikitextGenerator} from '../WikitextGenerator';
import {WikitextTemplate} from '../WikitextTemplate';
import {Utils} from '../Utils';
//import {Promise, hash} from '../vendor/rsvp-latest.js';

export class PenguinStyleGenerator implements WikitextGenerator {
	private template : WikitextTemplate;
	private findById = (list, id) => list.filter((item) => parseInt(item.furniture_item_id) === id);

	constructor(template) {
		this.template = template;
	}

	render(url) {
		return Utils.getJson(url).then(this.template.render);
	}
}