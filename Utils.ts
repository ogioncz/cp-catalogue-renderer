import {Promise} from './vendor/rsvp-latest.js';

export class Utils {
	static full_langs = {'en': 'en_US', 'pt': 'pt_BR', 'es': 'es_LA', 'fr': 'fr_FR', 'de': 'de_DE', 'ru': 'ru_RU'};
	static en_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	static pt_months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
	private static cyrillic = {'Ё':'YO','Й':'I','Ц':'TS','У':'U','К':'K','Е':'E','Н':'N','Г':'G','Ш':'SH','Щ':'SCH','З':'Z','Х':'H','Ъ':'’','ё':'yo','й':'i','ц':'ts','у':'u','к':'k','е':'e','н':'n','г':'g','ш':'sh','щ':'sch','з':'z','х':'h','ъ':'’','Ф':'F','Ы':'I','В':'V','А':'a','П':'P','Р':'R','О':'O','Л':'L','Д':'D','Ж':'ZH','Э':'E','ф':'f','ы':'i','в':'v','а':'a','п':'p','р':'r','о':'o','л':'l','д':'d','ж':'zh','э':'e','Я':'Ya','Ч':'CH','С':'S','М':'M','И':'I','Т':'T','Ь':'’','Б':'B','Ю':'YU','я':'ya','ч':'ch','с':'s','м':'m','и':'i','т':'t','ь':'’','б':'b','ю':'yu'};

	static map(obj, cb) {
		return Object.keys(obj).reduce(function(carry, current) {
			carry[current] = cb(obj[current], current);
			return carry;
		}, {});
	}

	static capitalise(str) {
		// should really be \b\w but javascript is idiotic
		return str.replace(/(?:^|[\s-_:])\S/g, (match) => match.toUpperCase());
	}

	static stripDiacritics(str) {
		return str.normalize('NFD').replace(/[\u0300-\u036F]+/g, '');
	}

	static transliterateCyrillic(word) {
		return word.split('').map((char) => this.cyrillic[char] || char).join('');
	}

	static getFirstDayInMonthDate(day, date) {
		date.setDate(1);
		var firstDay = date.getDay();
		return (firstDay > day ? (day + 1 + 7 - firstDay) : (1 + day - firstDay));
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

	static getCachedFile(url) {
		var promise = new Promise(function(resolve, reject) {
			if (localStorage['game_configs:' + url]) {
				resolve(localStorage['game_configs:' + url]);
			} else {
				Utils.getFile(url).then(function(content) {
					try {
						localStorage['game_configs:' + url] = content;
						resolve(content);
					} catch (ex) {
						reject(ex);
					}
				}).catch((msg) => reject(msg));
			}
		});
		return promise;
	}

	static getJson(url) {
		return Utils.getCachedFile(url).then(JSON.parse);
	}

	static eachChild(parent : Element, selector : string, cb) {
		return Array.prototype.forEach.call(parent.querySelectorAll(selector), (child) => cb.bind(parent)(child));
	}
}