<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Authentication Check
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '');

if (!$authHeader || strpos($authHeader, 'Bearer ') !== 0) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$token = substr($authHeader, 7);
if ($token !== 'admin123') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Invalid password']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image'])) {
        $file = $_FILES['image'];
        $uploadDir = 'images/';
        
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $filename = time() . '_' . preg_replace('/[^a-zA-Z0-9_\-\.]/', '', str_replace(' ', '_', $file['name']));
        $uploadFile = $uploadDir . $filename;

        if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
            echo json_encode(['success' => true, 'url' => '/images/' . $filename]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Error moving file']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No file sent']);
    }
}
?>
