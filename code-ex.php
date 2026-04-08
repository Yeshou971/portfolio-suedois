<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tp2";

// Créer la connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connection
if ($conn->connect_error) {
  die("Connection échouée: " . $conn->connect_error);
}

// Récupérer les données du fomulaire
$name = $_POST['Name'];
$email = $_POST['Email'];
$message = $_POST['Message'];

// Préparer et exécuter la requète SQL
$stmt = $conn->prepare("INSERT INTO contact (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
  echo "Message envoyé avec succès !";
} else {
  echo "Erreur : " , $stmt->error;
}

$stmt->close();
$conn->close();
?>