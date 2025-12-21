<?php
header('Content-Type: application/json');

// Allow CORS if testing locally, though in production same origin is used
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

require_once 'config.php';

// Check for Authorization header
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';
// Remove "Bearer " if present
if (strpos($authHeader, 'Bearer ') === 0) {
    $authHeader = substr($authHeader, 7);
}

if ($authHeader !== $ADMIN_PASSWORD) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// Receive raw JSON
$input = file_get_contents('php://input');
$data = json_decode($input);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

// Security: Basic check to ensure we are saving what looks like our content structure
// (Optional, keeps it flexible for now)

$file = 'content.json';

// Create backup (optional)
// copy($file, $file . '.bak');

if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to write file. Check file permissions on server.']);
}
?>
