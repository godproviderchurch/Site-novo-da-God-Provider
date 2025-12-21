<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit;
}

require_once 'config.php';

$input = json_decode(file_get_contents('php://input'));
$sentPassword = $input->password ?? '';

if ($sentPassword === $ADMIN_PASSWORD) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Senha incorreta']);
}
?>
