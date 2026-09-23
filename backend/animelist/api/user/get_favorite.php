<?php
header("Content-Type: application/json");
include '../database/db.php';

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['user_id'])) {
    $user_id = $_GET['user_id']; // รับ user_id จาก request

    try {
        $stmt = $pdo->prepare("
            SELECT f.user_id, u.username, a.anime_id, a.title 
            FROM favorites f
            JOIN users u ON f.user_id = u.user_id
            JOIN animes a ON f.anime_id = a.anime_id
            WHERE f.user_id = :user_id
        ");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => "success", "favorites" => $favorites]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request or missing user_id"]);
}
?>
