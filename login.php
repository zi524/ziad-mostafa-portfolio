<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
$db = new SQLite3("test.db");
$data = json_decode(file_get_contents("php://input"), true);

$email = $data["email"] ?? "";
$password = $data["password"] ?? "";

$stmt = $db->prepare("SELECT name, email, password FROM users WHERE email = :email");
$stmt->bindValue(":email", $email,SQLITE3_TEXT);
$res = $stmt->execute();

$row = $res->fetchArray(SQLITE3_ASSOC);
if (($row)&&password_verify($password, $row["password"])) {
    echo json_encode(["login"=> "success",
                      "name"=> $row["name"],
                      "email"=> $row["email"]  ]);
    exit;                  
}
else {  
    echo json_encode(["login"=>"failed"]);
}
?>