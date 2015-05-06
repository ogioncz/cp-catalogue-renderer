<?php
if (isset($_GET['url']) && strpos($_GET['url'], 'http://media8.clubpenguin.com/') === 0) {
	http_response_code(200);
	echo file_get_contents($_GET['url']);
} else {
	http_response_code(400);
}
