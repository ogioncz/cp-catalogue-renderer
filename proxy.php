<?php
if (isset($_GET['url']) && preg_match('~^http://(media\d|cdn)\.clubpenguin\.com/~', $_GET['url'])) {
	http_response_code(200);
	echo file_get_contents($_GET['url']);
} else {
	http_response_code(400);
}
