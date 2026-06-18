<?php
$db = new SQLite3("test.db");

$db->exec("
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    linkedin TEXT,
    facebook TEXT,
    skills_embedded INTEGER DEFAULT 0,
    skills_ai INTEGER DEFAULT 0,
    skills_pcb INTEGER DEFAULT 0
)
");

echo "table done";
?>
