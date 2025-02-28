\<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather App</title>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
  <script src="future.js" defer></script>
</head>

<body>
  <div class="card">
    <div class="search">
      <input type="text" class="search-bar" placeholder="Search">
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
      </button>
    </div>
    <div class="weather loading">
      <h2 class="city">Weather in Gedling</h2>
      <h1 class="temp">Loading...</h1>
      <div class="flex">
        <img src="https://openweathermap.org/img/wn/04n.png" alt="" class="icon" />
        <div class="description">Loading...</div>
      </div>
      <div class="humidity">Humidity: Loading....</div>
      <div class="wind">Wind speed:  Loading...</div>
    </div>

    <!-- 7-Day Forecast Section -->
    <div class="forecast">
      <h2 class="forecast-title">7-Day Forecast of Gedling</h2>
      <div class="forecast-days">
        <!-- Forecast cards adding section -->
      </div>
    </div>
    <!-- <div class="history">
      <a href="http://localhost/WeatherApp/search.php" class="btn2">Explore History &#8594;</a>
    </div> -->
  </div>
  
  <!-- <div class="fetch">
    <h1>7 Days Future Update (Forecast) of Gedling</h1>
    <br>
    <table class="table">
      
        <thead>
            <tr>
                <th>id</th>
                <th>city</th>
                <th>date</th>
                <th>temperature</th>
                <th>description</th>
                <th>icon</th>
            </tr>
        </thead>
        <tbody>
          <?php
          include ("retrieve.php")?>
        </div> -->
  
</body>
</html>

