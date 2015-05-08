import {Promise} from './vendor/rsvp-latest.js';

export class Utils {
	static full_langs = {'en': 'en_US', 'pt': 'pt_BR', 'es': 'es_LA', 'fr': 'fr_FR', 'de': 'de_DE', 'ru': 'ru_RU'};

	static getFile(url) {
		var promise = new Promise(function(resolve, reject) {
			var request = new XMLHttpRequest();
			request.open('GET', 'proxy.php?url=' + encodeURIComponent(url), true);

			request.onreadystatechange = function() {
				if (this.readyState === this.DONE) {
					if (this.status === 200) {
						resolve(this.response);
					} else {
						reject(this);
					}
				}
			}
			request.send();
		});
		return promise;
	}
}