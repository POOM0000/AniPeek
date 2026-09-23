<?php
header("Content-Type: application/json");
include '../database/db.php'; // เชื่อมต่อฐานข้อมูล

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // อ่านข้อมูล JSON จาก request body
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data['username']) || !isset($data['password'])) {
        echo json_encode(["status" => "error", "message" => "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน"]);
        exit();
    }

    $username = trim($data['username']);
    $password = trim($data['password']);

    try {
        // ตรวจสอบ username ในฐานข้อมูล
        $stmt = $pdo->prepare("SELECT user_id, username, email, password, role FROM Users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user) {
            // ตรวจสอบรหัสผ่าน
            if (password_verify($password, $user['password'])) {
                $response = [
                    "status" => "success",
                    "message" => "เข้าสู่ระบบสำเร็จ",
                    "user" => [
                        "id" => $user['user_id'], // 🛠️ เปลี่ยนชื่อจาก `user_id` เป็น `id`
                        "username" => $user['username'],
                        "email" => $user['email'],
                        "role" => $user['role']
                    ]
                ];
            } else {
                $response = ["status" => "error", "message" => "รหัสผ่านไม่ถูกต้อง"];
            }
        } else {
            $response = ["status" => "error", "message" => "ไม่พบชื่อผู้ใช้ในระบบ"];
        }
    } catch (Exception $e) {
        $response = ["status" => "error", "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()];
    }

    echo json_encode($response);
} else {
    echo json_encode(["status" => "error", "message" => "Method ไม่ถูกต้อง"]);
}
?>
