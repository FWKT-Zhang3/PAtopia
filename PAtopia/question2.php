<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Q&A</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet">
</head>
<body class="qa-page">
<div class="back"><a href="choose2.php" id="question-back"><img src="images/back.gif" alt="back"></a></div>
<section id="board">
    <h1 id="title">ANSWER QUESTIONS!</h1>
    <img src="images/quiz.png" alt="quiz board">
    <div id="question-area">
        <div id="question"></div>
        <div>
            <form id="answers">
                <input type="radio" name="answer" value="0"><label class="option">answer01</label><br>
                <input type="radio" name="answer" value="1"><label class="option">answer02</label><br>
                <input type="radio" name="answer" value="2"><label class="option">answer03</label><br>
                <input type="radio" name="answer" value="3"><label class="option">answer04</label><br>
            </form>
        </div>
        <div id="buttons">
            <button id="submit">submit</button>
        </div>
    </div>
</section>
<div id="hint-board">
    <img src="images/whiteboard.png" alt="boardbox" id="board-box">
    <img src="images/bulb.png" alt="bulb" id="bulb">
    <div id="white-board"></div>
</div>
<div id="processing-bar">
    <img src="images/battery.png" alt="battery">
    <div id="process"></div>
</div>
<div id="energy">
    <img src="images/energy.png" alt="energy" id="lightning">
</div>
<div id="black"></div>
<div id="white"></div>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<?php $value = $_GET['choice']; ?>
<?php $value2 = $_GET['output']; ?>
<script>
    var userChoices = "<?php echo $value; ?>";
    var output = "<?php echo $value2; ?>";
    var aLink = document.getElementById("question-back");
    aLink.href = "choose2.php?output=" + output;
</script>
<script src="js/script2.js"></script>
</body>
</html>