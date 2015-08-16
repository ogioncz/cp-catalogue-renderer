<?php
if (!isset($_GET['i']) || !preg_match('~^http://media8\.clubpenguin\.com/~', $_GET['i'])) {
	http_response_code(400);
	exit;
}
$im = new Imagick($_GET['i']);
$im->trimImage(0);
header("Content-Type: image/" . $im->getImageFormat());
echo $im;
