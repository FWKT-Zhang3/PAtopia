<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Hatching!</title>
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet">
    </head>

    <body class="hatching-page">
        <div id="hatching-part">
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <?php $value = $_GET['choice']; ?>
        <?php $value2 = $_GET['output']; ?>
        <script>
            var userChoices = "<?php echo $value; ?>";
            var output = "<?php echo $value2; ?>";

        </script>
        <script src="js/script.js"></script>
    </body>
</html>