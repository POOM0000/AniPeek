<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include '../database/db.php'; // เชื่อมต่อฐานข้อมูล

// รับค่า user_id จาก request
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 0;
if ($user_id <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid user_id"]);
    exit();
}

try {
    // ดึงข้อมูลผู้ใช้
    $stmt = $pdo->prepare("SELECT user_id, username, email, role FROM Users WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $userData = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$userData) {
        echo json_encode(["status" => "error", "message" => "User not found"]);
        exit();
    }

    // ดึงรายการโปรดของผู้ใช้
    $stmt = $pdo->prepare("
        SELECT A.anime_id, A.title, A.rating, A.description, A.image, C.name AS category 
        FROM Favorites F
        JOIN Animes A ON F.anime_id = A.anime_id
        JOIN Categories C ON A.category_id = C.category_id
        WHERE F.user_id = ?
    ");
    $stmt->execute([$user_id]);
    $favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // รวมข้อมูลผู้ใช้กับรายการโปรด
    $response = [
        "status" => "success",
        "user" => $userData,
        "favorites" => $favorites
    ];

    // คืนค่า JSON
    echo json_encode($response, JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
