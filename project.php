<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
$db = new SQLite3("test.db");
$raw = file_get_contents("php://input");
file_put_contents("zmz.txt", $raw);

$data = json_decode($raw, true);
$email = $data["email"] ?? "";

$stmt = $db->prepare("
  UPDATE users SET
    linkedin = :linked,
    facebook = :face,
    skills_embedded = :embedded,
    skills_ai = :ai,
    skills_pcb = :pcb
  WHERE email = :email
");


$stmt->bindValue(":linked", $data["linkedIn"] ?? "");
$stmt->bindValue(":face", $data["facebook"] ?? "");
$stmt->bindValue(":embedded", (int)($data["Embedded"] ?? 0));
$stmt->bindValue(":ai",(int) ($data["ai"] ?? 0));
$stmt->bindValue(":pcb",(int) ($data["PCB"] ?? 0));
$stmt->bindValue(":email", $email);
//each course with 300 pound
$counter=(int)($data["PCB"] ?? 0)+(int)($data["ai"] ?? 0)+(int)($data["Embedded"] ?? 0);
$stmt->execute();
if ($db->changes() > 0) {
    echo json_encode(["status" => "updated","budget"=>(300*($counter)),"email"=>$email]);
} 
else {
    echo json_encode(["status" => "failed","email"=>$email]);
}
?>
