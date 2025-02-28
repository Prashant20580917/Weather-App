<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Define database connection parameters
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "weather";

    // Get JSON data from the POST request
    $data = json_decode(file_get_contents("php://input"));

    // Create a new PDO instance and connect to the database
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Extract data from the JSON object
        $city = $data->name;
        $date = date("Y-m-d");  // Use only the date portion
        $temperature = $data->main->temp;
        $description = $data->weather[0]->description;
        $icon = $data->weather[0]->icon;

        // Try to insert the data, which may fail if the entry already exists
        $stmt = $conn->prepare("INSERT INTO weather_data (city, date, temperature, description, icon) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$city, $date, $temperature, $description, $icon]);

        echo "Weather data inserted successfully.";
    } catch (PDOException $e) {
        if ($e->getCode() === '23000') {
            // Handle the case where the entry already exists (duplicate key)
            echo "Weather data for this city and date already exists. Updating...";
            
            // Update the existing entry with new data
            $stmt = $conn->prepare("UPDATE weather_data SET temperature = ?, description = ?, icon = ? WHERE city = ? AND date = ?");
            $stmt->execute([$temperature, $description, $icon, $city, $date]);
        } else {
            // Handle other PDO exceptions
            echo "Error: " . $e->getMessage();
        }
    }
    $conn = null;
}
?>

