<?php
header("Content-Type: application/json");
include '../database/db.php';

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['user_id']) && isset($_GET['anime_id'])) {
    $user_id = $_GET['user_id'];
    $anime_id = $_GET['anime_id'];

    try {
        $stmt = $pdo->prepare("SELECT COUNT(*) AS count FROM favorites WHERE user_id = :user_id AND anime_id = :anime_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':anime_id', $anime_id, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result["count"] > 0) {
            echo json_encode(["status" => "success", "is_favorite" => true]);
        } else {
            echo json_encode(["status" => "success", "is_favorite" => false]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>
