<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type'); // Headers usually handled automatically but good to be explicit
header('Content-Type: application/json');

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
            echo json_encode(['success' => false, 'message' => 'Erro ao mover arquivo']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Nenhum arquivo enviado']);
    }
}
?>
