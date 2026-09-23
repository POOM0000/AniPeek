<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

include '../database/db.php';

$IMAGE_BASE_URL = "http://192.168.1.117/backend/animelist/img/";

try {
    // ตรวจสอบว่ามี anime_id หรือไม่
    $anime_id = isset($_GET['anime_id']) ? $_GET['anime_id'] : null;

    // ถ้ามี anime_id ให้ดึงข้อมูลของอนิเมะตัวเดียว
    if ($anime_id) {
        $sql = "SELECT a.anime_id, a.title, a.rating, c.name AS category_name, 
                    a.description, a.image 
                FROM Animes a
                JOIN Categories c ON a.category_id = c.category_id
                WHERE a.anime_id = :anime_id";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':anime_id', $anime_id, PDO::PARAM_INT);
        $stmt->execute();
        $anime = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($anime) {
            $anime['rating'] = (float) $anime['rating'];
            $anime['image'] = $IMAGE_BASE_URL . $anime['image'];

            echo json_encode(['status' => 'success', 'data' => $anime], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Anime not found']);
        }
    } else {
        // ถ้าไม่มี anime_id ให้ดึงรายการทั้งหมด
        $sql = "SELECT a.anime_id, a.title, a.rating, c.name AS category_name, 
                    a.description, a.image 
                FROM Animes a
                JOIN Categories c ON a.category_id = c.category_id";

        $stmt = $pdo->query($sql);
        $animes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // ปรับแต่งค่า image และ rating ก่อนส่งกลับ
        foreach ($animes as &$anime) {
            $anime['rating'] = (float) $anime['rating'];
            $anime['image'] = $IMAGE_BASE_URL . $anime['image'];
        }

        echo json_encode(['status' => 'success', 'data' => $animes], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database query failed', 'error' => $e->getMessage()]);
}

?>
