import {Promise} from './vendor/rsvp-latest.js';

export class Utils {
	static full_langs = {'en': 'en_US', 'pt': 'pt_BR', 'es': 'es_LA', 'fr': 'fr_FR', 'de': 'de_DE', 'ru': 'ru_RU'};

	static map(obj, cb) {
		return Object.keys(obj).reduce(function(carry, current) {
			carry[current] = cb(obj[current], current);
			return carry;
		}, {});
	}

	static getFile(url) {
		var promise = new Promise(function(resolve, reject) {
			var request = new XMLHttpRequest();
			request.open('GET', 'proxy.php?url=' + encodeURIComponent(url), true);

			request.onreadystatechange = function() {
				if (this.readyState === this.DONE) {
					if (this.status === 200) {
						resolve(this.response);
					} else {
						reject(this.statusText);
					}
				}
			}
			request.send();
		});
		return promise;
	}

	static getJson(url) {
		var promise = new Promise(function(resolve, reject) {
			Utils.getFile(url).then(function(content) {
				try {
					let ret = JSON.parse(content)
					resolve(ret);
				} catch (ex) {
					reject(ex);
				}
			}).catch((msg) => reject(msg));
		});
		return promise;
	}
}