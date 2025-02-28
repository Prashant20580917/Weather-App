<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "weather";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$apiKey = "fd680a4b1b783e9f27e4177aeb18d1fa";
$city = "Gedling"; // Default city name

// Get today's date
$currentDate = date('Y-m-d');

// Calculate the date for 7 days from today
$endDate = date('Y-m-d', strtotime($currentDate . ' + 7 days'));

$response = file_get_contents("https://api.openweathermap.org/data/2.5/forecast?q=$city&units=metric&appid=$apiKey");
$data = json_decode($response, true);

if (isset($data['list'])) {
    foreach ($data['list'] as $forecast) {
        $date = date('Y-m-d', $forecast['dt']);

        // Check if the date is within the 7-day range
        if ($date >= $currentDate && $date <= $endDate) {
            $temperature = $forecast['main']['temp'];
            $description = $forecast['weather'][0]['description'];
            $icon = $forecast['weather'][0]['icon'];

            // Check if a record with the same date already exists in the database
            $checkSql = "SELECT * FROM forecast_data WHERE city = '$city' AND date = '$date'";
            $result = $conn->query($checkSql);

            if ($result->num_rows == 0) {
                // Insert the data if no record exists for this date
                $sql = "INSERT INTO forecast_data (city, date, temperature, description, icon) VALUES ('$city', '$date', '$temperature', '$description', '$icon')";
                $conn->query($sql);
            }
        }
    }
}

$conn->close();
?>
