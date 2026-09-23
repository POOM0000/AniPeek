<?php
header("Content-Type: application/json");
include '../database/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['user_id']) || !isset($data['anime_id'])) {
        echo json_encode(["status" => "error", "message" => "Missing parameters"]);
        exit();
    }

    $user_id = intval($data['user_id']);
    $anime_id = intval($data['anime_id']);

    try {
        $stmt = $pdo->prepare("DELETE FROM favorites WHERE user_id = ? AND anime_id = ?");
        $stmt->execute([$user_id, $anime_id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["status" => "success", "message" => "Removed from favorite"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Not found in favorite"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid method"]);
}
?>
