<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include '../database/db.php'; // เชื่อมต่อฐานข้อมูล

$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;
$anime_id = isset($_GET['anime_id']) ? $_GET['anime_id'] : null;

$sql = "SELECT * FROM Reviews WHERE 1";
$params = [];

if ($user_id) {
    $sql .= " AND user_id = ?";
    $params[] = $user_id;
}
if ($anime_id) {
    $sql .= " AND anime_id = ?";
    $params[] = $anime_id;
}

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(["status" => "success", "data" => $reviews], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
exit;

?>
