<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

include '../database/db.php'; // เชื่อมต่อฐานข้อมูล

// กำหนด BASE URL สำหรับรูปภาพ
$IMAGE_BASE_URL = "http://192.168.1.117/backend/animelist/img/";

try {
    $sql = "SELECT c.category_id, c.name, 
                   GROUP_CONCAT(
                       JSON_OBJECT(
                           'anime_id', a.anime_id,
                           'title', a.title,
                           'rating', a.rating,
                           'description', a.description,
                           'image', CONCAT('$IMAGE_BASE_URL', a.image)
                       )
                   ) AS animes
            FROM Categories c
            LEFT JOIN Animes a ON c.category_id = a.category_id
            GROUP BY c.category_id, c.name";

    $stmt = $pdo->query($sql);
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // แปลงข้อมูล JSON String ที่ถูก CONCAT มาเป็น Array
    foreach ($categories as &$category) {
        $category['animes'] = $category['animes'] ? json_decode("[" . $category['animes'] . "]") : [];
    }

    echo json_encode(["status" => "success", "data" => $categories], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Failed to fetch categories", "error" => $e->getMessage()]);
}

?>
