<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if ($data['password'] === 'admin123') { // Consider changing this to a more secure check
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Senha inválida']);
    }
}
?>
