<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include '../database/db.php';

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON",
        "raw_data" => $raw_data // ดูข้อมูล JSON ที่ส่งมา
    ]);
    exit;
}

if (!isset($data['user_id']) || !isset($data['anime_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing user_id or anime_id",
        "raw_data" => $raw_data // Log เพิ่มเติม
    ]);
    exit;
}

$user_id = (int)$data['user_id'];
$anime_id = (int)$data['anime_id'];

try {
    $stmt = $pdo->prepare("SELECT user_id FROM users WHERE user_id = ?");
    $stmt->execute([$user_id]);
    if ($stmt->rowCount() == 0) {
        echo json_encode(["status" => "error", "message" => "User not found"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT anime_id FROM animes WHERE anime_id = ?");
    $stmt->execute([$anime_id]);
    if ($stmt->rowCount() == 0) {
        echo json_encode(["status" => "error", "message" => "Anime not found"]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM favorites WHERE user_id = ? AND anime_id = ?");
    $stmt->execute([$user_id, $anime_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "error", "message" => "Anime already in favorites"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO favorites (user_id, anime_id) VALUES (?, ?)");
    $stmt->execute([$user_id, $anime_id]);

    echo json_encode(["status" => "success", "message" => "Anime added to favorites"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Failed to add anime to favorites", "error" => $e->getMessage()]);
}

?>
