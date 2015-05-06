(function renderer() {
	"use strict";

	var renderImage = function renderImage(image) {
		var img = document.createElement('img');
		img.src = 'http://media8.clubpenguin.com/mobile/cp-mobile-ui/clubpenguin_v1_6/en_US/deploy/metaplace/devicepng/assets/' + image.image;
		img.style.position = 'absolute';
		img.style.left = image.originX + 'px';
		img.style.top = image.originY + 'px';
		container.appendChild(img);
	}

	var renderButton = function renderButton(button) {
		var img = document.createElement('img');
		img.src = 'http://media8.clubpenguin.com/mobile/cp-mobile-ui/clubpenguin_v1_6/en_US/deploy/metaplace/devicepng/assets/' + button.imageUp;
		img.style.position = 'absolute';
		img.style.left = button.originX + 'px';
		img.style.top = button.originY + 'px';
		container.appendChild(img);
	}

	var renderComponent = function renderComponent(component) {
		if (component.images) {
			for (var image of component.images) {
				renderImage(image);
			}
		}
		if (component.buttons) {
			for (var button of component.buttons) {
				renderButton(button);
			}
		}
	};

	var getFile = function getFile(url, callback) {
		var request = new XMLHttpRequest();
		request.open('GET', 'proxy.php?url=' + encodeURIComponent(url), true);

		request.onreadystatechange = function() {
			if (request.readyState != 4 || request.status != 200) return;
			callback(request.responseText);
		}
		request.send();
	};



	var container = document.getElementById('main');

	getFile('http://media8.clubpenguin.com/mobile/cp-mobile-ui/clubpenguin_v1_6/en_US/deploy/metaplace/devicepng/config/catalog.json', function(content) {
		var data = JSON.parse(content);

		container.style.width = data.sourceWidth + 'px';
		container.style.height = data.sourceHeight + 'px';
		container.style.position = 'relative';
		container.style.backgroundColor = 'red';

		for (var component of data.components) {
			if (component.name === 'purchase_dialog') {
				continue;
			}
			renderComponent(component.layout);
		}

		getFile('http://media8.clubpenguin.com/mobile/cp-mobile-ui/clubpenguin_v1_6/en_US/deploy/metaplace/devicepng/config/catalog/penstyle.json', function(content) {
			var data = JSON.parse(content);

			renderComponent(data.dynamic);

			for (var component of data.components) {
				renderComponent(component.layout);
			}
		});
	});
})();
