export class Utils {
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