<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Garner</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet">
    <style>
        #door:hover {
            filter: drop-shadow(2px 2px 10px rgb(255, 251, 0));
        }

        #ladder:hover {
            filter: drop-shadow(2px 2px 10px rgb(255, 251, 0));
        }
    </style>
</head>

<body class="species-page">
<div id="species-part">
    <img src="images/garner-inside.jpg" alt="garner inside">
    <img src="images/door.png" alt="door" id="door">
    <img src="images/ladder.png" alt="ladder" id="ladder">
</div>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<?php $value = $_GET['output']; ?>
<script src="js/script2.js"></script>
<script>
    var output = "<?php echo $value; ?>";
    var door = document.getElementById("door");
    var ladder = document.getElementById("ladder");
    door.onclick = function () {
        window.location.replace("index2.php?output=" + output);
    };
    ladder.onclick = function () {
        window.location.replace("choose2.php?output=" + output);
    }
</script>
</body>
</html>