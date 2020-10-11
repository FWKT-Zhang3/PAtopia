<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Choose!</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet">
    <style>
        #choose-page-species {
            position: absolute;
            width: 100%;
            top: 220px;
            left: 350px;
            display: block;
        }
    </style>
</head>
<body>
<div id="choose-part">
    <div class="back"><a href="species2.php" id="choose-back"><img src="images/back.gif" alt="back"></a></div>
    <img src="images/choose.png" alt="choose">
    <div id="choose-page-species">
        <img src="images/fallow-deer.png" alt="deer" id="deer">
        <img src="images/red-fox.png" alt="fox" id="fox">
        <div id="choose-title01">Choose a Family!</div>
    </div>
    <div id="choose-page-difficulty">
        <img src="images/gold.png" alt="gold-egg" id="gold">
        <img src="images/silver.png" alt="silver-egg" id="silver">
        <img src="images/copper.png" alt="copper-egg" id="copper">
        <div id="choose-title02">Choose an Egg!</div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<?php $value = $_GET['output']; ?>
<script src="js/script2.js"></script>
<script>
    var output = "<?php echo $value; ?>";
    var deer = document.getElementById("deer");
    var fox = document.getElementById("fox");
    var species, difficulty;
    var title01 = document.getElementById("choose-title01");
    var oDivChooseSpecies = document.getElementById("choose-page-species");
    var oDivChooseDifficulty = document.getElementById("choose-page-difficulty");
    var gold = document.getElementById("gold");
    var silver = document.getElementById("silver");
    var copper = document.getElementById("copper");
    var aLink = document.getElementById("choose-back");
    aLink.href = "species2.php?output=" + output;

    deer.onclick = function () {
        oDivChooseSpecies.style.display = "none";
        title01.style.display = "none";
        deer.style.display = "none";
        fox.style.display = "none";
        oDivChooseDifficulty.style.display = "block";
        species="fallow deer";
    };

    fox.onclick = function () {
        oDivChooseSpecies.style.display = "none";
        title01.style.display = "none";
        deer.style.display = "none";
        fox.style.display = "none";
        oDivChooseDifficulty.style.display = "block";
        species="red fox";
    };

    gold.onclick = function() {
        difficulty = 3;
        window.location.replace("question2.php?output=" + output + "&choice="+species+","+difficulty);
    };
    silver.onclick = function() {
        difficulty = 2;
        window.location.replace("question2.php?output=" + output + "&choice="+species+","+difficulty);
    };
    copper.onclick = function() {
        difficulty = 1;
        window.location.replace("question2.php?output=" + output + "&choice="+species+","+difficulty);
    };
</script>
</body>
</html>