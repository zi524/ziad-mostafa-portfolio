<?php
header("Content-Type: application/json");
$db = new SQLite3("test.db");



if ($_SERVER["REQUEST_METHOD"] === "POST" ) {

    $data = json_decode(file_get_contents("php://input"), true);

    $name = $data["name"] ?? "";
    $email = $data["email"] ?? "";
    $password = $data["password"] ?? "";
    $check = $db->prepare("SELECT 1 FROM users WHERE email = :email");
    $check->bindValue(":email", $email, SQLITE3_TEXT);
    $result = $check->execute();
    $exists = $result->fetchArray();
    if( !($exists)){
    // 🔐 HASH the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // ✅ SAFE prepared statement
    $stmt = $db->prepare(
        "INSERT INTO users (name, email, password)
         VALUES (:name, :email, :password)"
    );

    $stmt->bindValue(":name", $name, SQLITE3_TEXT);
    $stmt->bindValue(":email", $email, SQLITE3_TEXT);
    $stmt->bindValue(":password", $hashedPassword, SQLITE3_TEXT);

    $stmt->execute();

    echo json_encode(["status"=>"registered"]);
}
else echo json_encode(["status"=>"change the email"]);
}
?>
