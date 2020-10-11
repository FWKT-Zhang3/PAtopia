<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>PAtopia Database</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:700" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            font-family: 'Patrick Hand', cursive;
        }

        #hintBody {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: url('images/wall.png');
            background-size: 100%;
            padding-bottom: 5%;
        }

        #backLink {
            width: 10%;
            position: fixed;
            left:30px;
            top: 30px;
            text-decoration: none;
            font-family: 'Patrick Hand', cursive;
            font-size: 2em;
        }

        #backButton {
            width: 60%;
        }

        #hintTitle {
            text-align: center;
        }

        .button{
            overflow: hidden;
            font: 900 2em/2em 'Montserrat';
            width: 300px;
            perspective:400px;
            border-radius: 10px;
            background-color: transparent;
            -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(50%, transparent), to(rgba(255,255,255,0.3)));

        }
        .button span{
            display: block;
            transition:0.3s ease-in-out all;
            transform-origin:50% 0;
            transform-style:preserve-3d;
            background-color: white;
            border-radius: 10px;
            color:  #c47135;
            width: 100%;
        }
        .button span:after{
            display: block;
            content: attr(data-title);
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 10px;
            transition:0.3s ease-in-out all;
            transform-origin:50% 0;
            transform:translate3d(0px,105%,0px) rotateX(-90deg);
            text-shadow: 0 1px 1px rgba(0,0,0,.3);
            box-shadow: 0 1px 2px rgba(0,0,0,.2);
            background-color:  #c47135;
            color: white;
            width: 100%;
        }

        .button:hover span{
            transform:translate3d(0px,0px,-30px) rotateX(90deg);
        }

        #filter {
            padding: 1%;
            text-align: center;
        }

        #filter-text {
            outline-style: none;
            border: 1px solid #ccc;
            border-radius: 3px;
            padding: 13px 14px;
            width: 620px;
            font-size: 14px;
            font-weight: 700;
            font-family: 'Patrick Hand', cursive;
        }

        #filter-text:focus {
            border-color: #66afe9;
            outline: 0;
            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
        }

        #records {
            display: flex;
            display: -webkit-flex;
            flex-direction: column;

        }

        .record {
            display: flex;
            display: -webkit-flex;
            flex-direction: row;
            padding: 1em;
            margin: 1em;
            width: 500px;
            border-radius: 10px;
            background-color: #c46800;
            border: none;
            color: #ffffff;
            outline: none;
            position: relative;
        }

        @keyframes shine {
            0% {background-position: -1px -1px;}
            100% {background-position: -12px -12px;}
        }


        .record .keyColumn {
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            align-items: flex-start;
            flex-grow: 1;
        }

        .record .valueColumn {
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            align-items: flex-start;
            flex-grow: 1;
        }

        .record .animals {
            border-radius: 10px;
            width: 50%;
        }

        .record:before,
        .record:after {
            border: 0 solid transparent;
            transition: all 0.25s;
            content: '';
            height: 24px;
            position: absolute;
            width: 24px;
        }

        .record:before {
            border-top: 2px solid #c47135;
            left: 0px;
            top: -5px;
        }

        .record:after {
            border-bottom: 2px solid #c47135;
            bottom: -5px;
            right: 0px;
        }
        .button:hover:before,
        .button:hover:after {
            height: 100%;
            width: 100%;
        }

        .record:hover {
            transition: 0.5s;
            transform: scale(1.05);
        }

        .record .animals:hover {
            animation-iteration-count: infinite;
            animation-duration: 2s;
            animation-name: aroundAnimation;
            transform-origin: center bottom;
        }

        @keyframes aroundAnimation{
            0%,
            100%,
            20%,
            50%,
            80% {
                transition-timing-function: cubic-bezier(0.215,.61,.355,1);
                transform: translate3d(0,0,0);
            }
            40%,
            43%{
                transition-timing-function: cubic-bezier(0.755,0.50,0.855,0.060);
                transform: translate3d(-20px,0,0);
            }
            70%{
                transition-timing-function: cubic-bezier(0.755,0.050,0.855,0.060);
                transform: translate3d(-10px,0px,0);
            }
            90%{
                transform: translate3d(20px,0,0);
            }
        }
    </style>
</head>
<body id="hintBody">
<a href="index2.php" id="backLink"><img src="images/back.gif" alt="back" id="backButton"></a>
<form id="filter" onsubmit="return preventSubmit()">
    <div class="form-group">
        <input id="filter-text" type="text" placeholder="Search Animal Information by Keywords" value="">
    </div>
</form>
<h1 id="hintTitle">Animal Information</h1>
<section id="records"></section>
<button class="button" onclick="loadMore()">
    <span data-title="Click to Load More!">ROLL ME</span>
</button>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<?php $value = $_GET['output']; ?>
<script>
    var output = "<?php echo $value; ?>";
    var aLink = document.getElementById("backLink");

    aLink.href = "index2.php?output=" + output;

    var page = 1970;


    function loadMore() {

        append(apiData[page++]);
        append(apiData[page++]);
        append(apiData[page++]);
        append(apiData[page++]);
        append(apiData[page++]);
    }

    function append(recordValue) {

        var id = recordValue["_id"];
        var taxonId = recordValue["Taxon_Id"];
        var kingdom = recordValue["Kingdom"];
        var aniClass = recordValue["Class"];
        var family = recordValue["Family"];
        var scienName = recordValue["Scientific_name"];
        var commonName = recordValue["Common_name"];
        var taxonAuthor = recordValue["Taxon_author"];
        var ncaStatus = recordValue["NCA_status"];
        var epbcStatus = recordValue["EPBC_status"];
        var significant = recordValue["Significant"];
        var endemicity = recordValue["Endemicity"];

        var img = "";

        if (!ncaStatus) {
            ncaStatus = "Not available";
        }

        if (!epbcStatus) {
            epbcStatus = "Not available";
        }

        if (!significant) {
            epbcStatus = "Not available";
        }

        if (!endemicity) {
            endemicity = "Not available";
        }

        if (id == '1952') {
            img = $('<img id="leopardSeal" class="animals">').attr("src", "images/leopard_seal.jpg");
        }
        //https://www.flickr.com/photos/dioptrica/6980060573

        if (id == '1953') {
            img = $('<img id="dingo" class="animals">').attr("src", "images/dingo.jpg");
        }
        // http://jeremiahblatz.com/personal/pics/Australia_Travel_Pictures_2009/day10/137_Dingo_at_Rainforestation_Kuranda.html

        if (id == '1954') {
            img = $('<img id="CanisLupusFamiliaris" class="animals">').attr("src", "images/Canis_lupus_familiaris.jpg");
        }
        // https://commons.wikimedia.org/wiki/File:Dog_(Canis_lupus_familiaris)_(1).jpg

        if (id == '1955') {
            img = $('<img id="redFox" class="animals">').attr("src", "images/red_fox.jpg");
        }
        // https://www.flickr.com/photos/145574498@N03/45195339322

        if (id == '1956') {
            img = $('<img id="felisCatus" class="animals">').attr("src", "images/Felis_catus.jpeg");
        }
        // https://zh.wikipedia.org/wiki/File:Felis_catus-cat_on_snow.jpg

        if (id == '1957') {
            img = $('<img id="europeanBrownHare" class="animals">').attr("src", "images/european_brown_hare.jpeg");
        }
        // https://pxhere.com/en/photo/191099

        if (id == '1958') {
            img = $('<img id="oryctolagusCuniculu" class="animals">').attr("src", "images/Oryctolagus_cuniculus.jpeg");
        }
        // https://commons.wikimedia.org/wiki/File:Oryctolagus_cuniculus_1a.JPG

        if (id == '1959') {
            img = $('<img id="equusAsinus" class="animals">').attr("src", "images/Equus_asinus.jpg");
        }
        // https://en.wikipedia.org/wiki/File:Equus_asinus_Kadzid%C5%82owo_001.jpg

        if (id == '1960') {
            img = $('<img id="equusCaballus" class="animals">').attr("src", "images/Equus_caballus.jpg");
        }
        // https://en.wikipedia.org/wiki/Horse#/media/File:Biandintz_eta_zaldiak_-_modified2.jpg

        if (id == '1961') {
            img = $('<img id="susScrofa" class="animals">').attr("src", "images/Sus_scrofa.jpg");
        }
        //https://commons.wikimedia.org/wiki/File:Sus_scrofa_3_-_Otter,_Owl,_and_Wildlife_Park.jpg

        if(id && taxonId && kingdom && aniClass && family && scienName
            && commonName) {

            $("#records").append(
                $('<article class="record">').append(
                    $('<div class="keyColumn">').append(
                        // $('<p class="key">').text("ID: "),
                        $('<p class="key">').text("Common Name: "),
                        $('<p class="key">').text("Scientific Name: "),
                        $('<p class="key">').text("Family: "),
                        $('<p class="key">').text("Class: "),
                        $('<p class="key">').text("Kingdom: "),
                        $('<p class="key">').text("Taxon Author: "),
                        $('<p class="key">').text("NCA Status: "),
                        $('<p class="key">').text("EPBC Status: "),
                        $('<p class="key">').text("Significant: "),
                    ),
                    $('<div class="valueColumn">').append(
                        // $('<p class="value">').text(id),
                        $('<p class="value">').text(commonName),
                        $('<p class="value">').text(scienName),
                        $('<p class="value">').text(family),
                        $('<p class="value">').text(aniClass),
                        $('<p class="value">').text(kingdom),
                        $('<p class="value">').text(taxonAuthor),
                        $('<p class="value">').text(ncaStatus),
                        $('<p class="value">').text(epbcStatus),
                        $('<p class="value">').text(significant),
                        $('<p class="value">').text(endemicity),
                    ),
                    img
                )

            );
        }
    }

    $(document).ready(function () {
        var data = {
            resource_id: "1c8b4859-31a4-42e7-8e63-b7cf125d4321",
            limit: 21000,
        };

        $.ajax({
            url: "https://www.data.qld.gov.au/api/3/action/datastore_search",
            data: data,
            dataType: "jsonp",
            cache: true,
            success: function(data) {
                apiData = data.result.records;
                append(apiData[1965]);
                append(apiData[1966]);
                append(apiData[1967]);
                append(apiData[1968]);
                append(apiData[1969]);
            }
        });
    });

    function preventSubmit() {
        return false;
    }

    $("#filter-text").submit(function(e) {
        e.preventDefault();
        return false;
    });

    $("#filter-text").keyup(function(event) {

        if (event.keyCode === 13) {
            var searchTerm = $(this).val();
            var targetCard;

            $(".record").hide();

            if (searchTerm !== "") {
                for (var record in apiData) {
                    if (apiData[record]["Common_name"].includes(searchTerm)) {
                        targetCard = apiData[record];
                        append(apiData[record]);
                    }
                }
            }
        }
    });

</script>
</body>
</html>