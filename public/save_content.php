<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Authentication Check
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '');

// DEBUG: Descomente a linha abaixo se precisar ver o que o servidor está recebendo (cuidado, expõe dados)
// echo json_encode(['debug_header' => $authHeader, 'server_auth' => $_SERVER['HTTP_AUTHORIZATION']]); exit;

if (!$authHeader || strpos($authHeader, 'Bearer ') !== 0) {
    http_response_code(401);
    // Tenta ser mais útil no erro
    echo json_encode(['success' => false, 'message' => 'Unauthorized: Header Authorization não chegou. Verifique o .htaccess']);
    exit;
}

$token = substr($authHeader, 7);

// HARDCODED PASSWORD
if ($token !== 'admin123') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Forbidden: Senha incorreta ou token inválido. Recebido: ' . substr($token, 0, 3) . '***']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if ($data === null) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
        exit;
    }

    // Backup before saving
    copy('content.json', 'content.backup.json');

    if (file_put_contents('content.json', json_encode($data, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error saving file. Check permissions.']);
    }
}
?>
