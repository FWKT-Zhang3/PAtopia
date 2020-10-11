<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PAtopia</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        #garner:hover {
            filter: drop-shadow(2px 2px 10px rgb(255, 251, 0));
        }

        #mill:hover {
            filter: drop-shadow(2px 2px 10px rgb(255, 251, 0));
        }
        #animals {
            position: absolute;
            width: 50%;
            height: 40%;
            bottom: 0;
            right: 0;
        }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet">
</head>

<body class="home-page">
<div id='sun'>
    <img src="images/sun01.png" alt="sun">
    <img src="images/sun02.png" alt="sun">
</div>
<div id="clouds">
    <img src="images/cloud.png" alt="cloud">
    <img src="images/cloud.png" alt="cloud">
    <img src="images/cloud.png" alt="cloud">
    <img src="images/cloud.png" alt="cloud">
</div>
<div id="main-part">
    <img src="images/farm.png" alt="farm" id="farm">
    <img src="images/garner.png" alt="garner" id="garner">
    <img src="images/fan.png" alt="fan" id="fan">
    <img src="images/windmill.png" alt="windmill" id="mill">
</div>
<div id="animals"></div>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<?php $value = $_GET['output']; ?>
<script src="js/script2.js"></script>
<script>
    var output = "<?php echo $value; ?>";
    var outputs = output.split(",");
    var oDivAnimal = document.getElementById("animals");
    var aniWidth = Math.round(parseInt(getStyle(oDivAnimal, "width")))-100;
    var aniHeight = Math.round(parseInt(getStyle(oDivAnimal, "height")))-100;
    for (var a in outputs) {
        var imgWidth;
        var aImg = document.createElement("img");
        switch (outputs[a]){
            case "images/red-fox-gold.png":
                imgWidth = 180;
                break;
            case "images/red-fox-silver.png":
                imgWidth = 140;
                break;
            case "images/red-fox-copper.png":
                imgWidth = 100;
                break;
            case "images/fallow-deer-gold.png":
                imgWidth = 180;
                break;
            case "images/fallow-deer-silver.png":
                imgWidth = 140;
                break;
            case "images/fallow-deer-copper.png":
                imgWidth = 100;
                break;
            default:
                imgWidth = 100;
        }
        aImg.src = outputs[a];
        var imgTop = Math.floor(Math.random() * aniHeight);
        var imgLeft = Math.floor(Math.random() * aniWidth);

        aImg.style.width = imgWidth + "px";
        aImg.style.position = "absolute";
        aImg.style.top = imgTop + "px";
        aImg.style.left = imgLeft + "px";
        oDivAnimal.appendChild(aImg)
    }
    var garner = document.getElementById("garner");
    var windmill = document.getElementById("mill");
    garner.onclick = function () {
        window.location.replace("species2.php?output="+output);
    };
    windmill.onclick = function () {
        window.location.replace("data.php?output="+output);
    };
</script>
</body>
</html>