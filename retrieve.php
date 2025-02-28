<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "weather";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Past Weather Datas</title>
    <h1>SEARCH CITY TO VIEW PAST WEATHER DATA</h1>
    <link href="" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>


    <div class="container my-5">
        <form method="post">
            <input type="text" placeholder="Search City" name="search">
            <button class="btn btn-dark btn-sm" name="submit">Search</button>
        </form>
        <div class="container my-5">
            <table class="table">
                <?php 
                if(isset($_POST['submit'])){
                    $search=$_POST['search'];

                    $sql="Select * from weather_data where id='$search' or city='$search' or date='$search' ";
                    $result =mysqli_query($conn,$sql);
                    if($result){
                        if(mysqli_num_rows($result)>0){
                            echo'<thead>
                            <tr>
                            <th>Id </th>
                            <th>City</th>
                            <th>Date</th>
                            <th>Temperature</th>
                            <th>Description</th>
                            <th>Icon</th>
                            </tr>
                            </thead>';
                           while($row=mysqli_fetch_assoc($result)){
                            echo '<tbody>
                            <tr>
                            <td>'.$row['id'].'</td>
                            <td>'.$row['city'].'</td>
                            <td>'.$row['date'].'</td>
                            <td>'.$row['temperature'].'</td>
                            <td>'.$row['description'].'</td>
                            <td>'.$row['icon'].'</td>
                            </tr>
                            </tbody>';
                           }

                        }else{
                            echo'<h2 class=text-danger>Data Not Found</h2>';
                        }
                    }
                }

?>
            </table>
        </div>
    </div>
</body>
</html>

