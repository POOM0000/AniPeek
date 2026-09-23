<?php
header("Content-Type: application/json");
include '../database/db.php'; // เชื่อมต่อฐานข้อมูล

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->email) || !isset($data->password)) {
    echo json_encode(["status" => "error", "message" => "กรุณากรอกข้อมูลให้ครบถ้วน"]);
    exit();
}

$username = trim($data->username);
$email = trim($data->email);
$password = password_hash(trim($data->password), PASSWORD_BCRYPT); // Hash Password

try {
    $stmt = $pdo->prepare("INSERT INTO Users (username, email, password) VALUES (:username, :email, :password)");
    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $password);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "สมัครสมาชิกสำเร็จ"]);
    } else {
        echo json_encode(["status" => "error", "message" => "สมัครสมาชิกไม่สำเร็จ"]);
    }
} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        echo json_encode(["status" => "error", "message" => "อีเมลหรือชื่อผู้ใช้ถูกใช้งานแล้ว"]);
    } else {
        echo json_encode(["status" => "error", "message" => "เกิดข้อผิดพลาด: " . $e->getMessage()]);
    }
}
?>
