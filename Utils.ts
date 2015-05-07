export class Utils {
	static full_langs = {'en': 'en_US', 'pt': 'pt_BR', 'es': 'es_LA', 'fr': 'fr_FR', 'de': 'de_DE', 'ru': 'ru_RU'};

	static getFile(url, callback) {
		var request = new XMLHttpRequest();
		request.open('GET', 'proxy.php?url=' + encodeURIComponent(url), true);
	
		request.onreadystatechange = function() {
			if (request.readyState != 4 || request.status != 200) return;
			callback(request.responseText);
		}
		request.send();
	}
}