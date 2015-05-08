import {Promise} from './vendor/rsvp-latest.js';

export interface WikitextGenerator {
	render(data) : Promise;
}