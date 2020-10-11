function getStyle(obj, name) {
    if(obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj,false)[name];
    }
}

function move(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        for (var a in json) {
            var target = json[a];
            if (a === "opacity") {
                var current = parseFloat(getStyle(obj, a)) * 100;
            } else {
                var current = parseInt(getStyle(obj, a));
            }

            var speed = (target - current) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (current === target) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            } else {
                if (a === "opacity") {
                    obj.style.opacity = (current + speed) / 100;
                } else {
                    obj.style[a] = (current + speed) + "px";
                }
            }
        }
    }, 30);
}

var apiData;

$(function () {
    var data = {
        resource_id: "1c8b4859-31a4-42e7-8e63-b7cf125d4321",
        limit:21000
    };

    $.ajax({
        url: "https://www.data.qld.gov.au/api/3/action/datastore_search",
        data: data,
        dataType: "jsonp",
        cache: true,
        success: function(data) {
            apiData = data.result.records;
        }
    });
});

window.onload = function () {
    var mark = temp = 0;
    var oBtn = document.getElementById("submit");
    var oDivQuestion = document.getElementById("question");
    var oBulb = document.getElementById("bulb");
    var boardBox = document.getElementById("board-box");
    var whiteBoard = document.getElementById("white-board");
    var process = document.getElementById("process");
    var oDivProcess = document.getElementById("processing-bar");
    var oDivEnergy = document.getElementById("energy");
    var options = document.getElementsByClassName("option");
    var black = document.getElementById("black");
    var white = document.getElementById("white");

    if (oBtn) {
        var data = userChoices.split(",");
        var whiteBoardHeight = Math.round(parseInt(getStyle(whiteBoard, "height")));
        var choseData = {};
        var speciesPicture;

        for (var a in apiData) {
            var commonName = apiData[a]["Common_name"];

            if (commonName === data[0]) {
                choseData = apiData[a];
            }
        }

        if (data[0] === "red fox") {
            speciesPicture = "images/red_fox.jpg";
        } else if (data[0] === "fallow deer") {
            speciesPicture = "images/fallow_deer.jpg";
        }

        for (var b in choseData) {
            if (choseData[b] === "") {
                choseData[b] = "N/A";
            }
        }

        whiteBoard.innerHTML = '<div id="record">'
            + "<div id='keys'>"
            + "<p class='key'>ID : </p>"
            + "<p class='key'>Taxon ID : </p>"
            + "<p class='key'>Kingdom : </p>"
            + "<p class='key'>Class : </p>"
            + "<p class='key'>Family : </p>"
            + "<p class='key'>Scientific Name : </p>"
            + "<p class='key'>Common Name : </p>"
            + "<p class='key'>Taxon Author : </p>"
            + "<p class='key'>NCA Status : </p>"
            + "<p class='key'>EPBC Status : </p>"
            + "<p class='key'>Significant : </p>"
            + "<p class='key'>Endemicity : </p>"
            + "</div>"
            + "<div id='values'>"
            + "<p class='value'>" + choseData['_id'] + "</p>"
            + "<p class='value'>" + choseData['Taxon_Id'] + "</p>"
            + "<p class='value'>" + choseData['Kingdom'] + "</p>"
            + "<p class='value'>" + choseData['Class'] + "</p>"
            + "<p class='value'>" + choseData['Family'] + "</p>"
            + "<p class='value'>" + choseData['Scientific_name'] + "</p>"
            + "<p class='value'>" + choseData['Common_name'] + "</p>"
            + "<p class='value'>" + choseData['Taxon_author'] + "</p>"
            + "<p class='value'>" + choseData['NCA_status'] + "</p>"
            + "<p class='value'>" + choseData['EPBC_status'] + "</p>"
            + "<p class='value'>" + choseData['Significant'] + "</p>"
            + "<p class='value'>" + choseData['Endemicity'] + "</p>"
            + "</div>"
            + "</div>";
        var record = document.getElementById("record");
        var speciesIMG = document.createElement("img");
        speciesIMG.src = speciesPicture;
        record.appendChild(speciesIMG);

        var questions = ["What's the Class of ", "What's the Scientific Name of ", "What's the Taxon Author of "];
        var num = 0;
        var randomNum01 = Math.ceil(Math.random() * 20564);
        var randomNum02 = Math.ceil(Math.random() * 20564);
        var randomNum03 = Math.ceil(Math.random() * 20564);
        var randomNum04 = Math.floor(Math.random() * 4);
        var randomNum05 = Math.floor(Math.random() * 4);
        var randomNum06 = Math.floor(Math.random() * 4);
        if (randomNum01 === 0) {
            randomNum01 = 1;
        }
        if (randomNum02 === 0) {
            randomNum02 = 1;
        }
        if (randomNum03 === 0) {
            randomNum03 = 1;
        }

        var wrongClass = [apiData[randomNum01]["Class"],
            apiData[randomNum02]["Class"],
            apiData[randomNum03]["Class"]];
        var wrongScience = [apiData[randomNum01]["Scientific_name"],
            apiData[randomNum02]["Scientific_name"],
            apiData[randomNum03]["Scientific_name"]];
        var wrongTaxon = [apiData[randomNum01]["Taxon_author"],
            apiData[randomNum02]["Taxon_author"],
            apiData[randomNum03]["Taxon_author"]];

        for (var w = 0; w < 3; w++) {
            while (wrongClass[w] === choseData["Class"]
            || wrongClass[w] === ""
            || wrongClass.indexOf(wrongClass[w]) !== w) {
                var ranNum = Math.ceil(Math.random() * 20564);
                wrongClass[w] = apiData[ranNum]["Class"];
            }
        }
        for (var w = 0; w < 3; w++) {
            while (wrongScience[w] === choseData["Scientific_name"]
            || wrongScience[w] === ""
            || wrongScience.indexOf(wrongScience[w]) !== w) {
                var ranNum = Math.ceil(Math.random() * 20564);
                wrongScience[w] = apiData[ranNum]["Scientific_name"];
            }
        }
        for (var w = 0; w < 3; w++) {
            while (wrongTaxon[w] === choseData["Taxon_author"]
            || wrongTaxon[w] === ""
            || wrongTaxon.indexOf(wrongTaxon[w]) !== w) {
                var ranNum = Math.ceil(Math.random() * 20564);
                wrongTaxon[w] = apiData[ranNum]["Taxon_author"];
            }
        }
        wrongClass.splice(randomNum04, 0, choseData["Class"]);
        wrongScience.splice(randomNum05, 0, choseData["Scientific_name"]);
        wrongTaxon.splice(randomNum06, 0, choseData["Taxon_author"]);
        var rightAnswer = [randomNum04, randomNum05, randomNum06];

        var answers = [wrongClass, wrongScience, wrongTaxon];

        for (var e = 0; e < 4; e++) {
            options[e].innerHTML = answers[num][e];
        }
        oDivQuestion.innerHTML = questions[num] + data[0] + "?";

        oBtn.onclick = function() {
            if (getStyle(process, "width") === "80px") {
                return;
            }
            oBulb.style.animation = 'none';
            move(boardBox,{"top":-200});
            move(oBulb, {"top": 0});
            move(whiteBoard, {"top": -whiteBoardHeight});
            whiteBoard.style.display = "none";
            var oRadio = document.getElementsByName("answer");
            for (var i = 0; i<oRadio.length; i++) {
                if (oRadio[i].checked && oRadio[i].value === "" + rightAnswer[num]){
                    mark++;
                }
            }

            if (mark === temp) {
                oBulb.style.animation = "sway 4s linear infinite,doorshadow 1s infinite alternate";
                oBulb.onclick = function() {
                    console.log(getStyle(oBulb, "top"));
                    if (getStyle(oBulb, "top") === "0px") {
                        oBulb.style.animation = "none";
                        var boxHeight = Math.round(parseInt(getStyle(boardBox, "height")));
                        oBulb.timer = null;
                        boardBox.timer = null;
                        whiteBoard.timer = null;
                        whiteBoard.style.display = "block";
                        move(boardBox,{"top":0});
                        move(oBulb, {"top": boxHeight + 400});
                        move(whiteBoard, {"top": boxHeight-2});
                        black.style.display = "block";
                    } else {
                        move(boardBox,{"top":-200});
                        move(oBulb, {"top": 0});
                        move(whiteBoard, {"top": -1000});
                        whiteBoard.style.display = "none";
                        black.style.display = "none";
                    }
                }
            } else {
                temp = mark;
                num++;
                if (num < data[1]) {
                    oDivQuestion.innerHTML = questions[num] + data[0] + "?";
                    for (var e = 0; e < 4; e++) {
                        options[e].innerHTML = answers[num][e];
                    }
                }
                oDivEnergy.style.opacity = 1;
                white.style.display = "block";
                oDivEnergy.onclick = function() {
                    white.style.display = "none";
                    var x = Math.round(parseInt(getStyle(oDivProcess, "left")));
                    var y = Math.round(parseInt(getStyle(oDivProcess, "top")));
                    move(oDivEnergy,{"top": y, "left": x, "opacity":0}, function() {
                        oDivEnergy.style.left = 600 + "px";
                        oDivEnergy.style.top = 400 + "px";
                    });
                    process.style.width = mark / data[1] * 80 + "px";
                    if (getStyle(process, "width") === "80px") {
                        oDivProcess.style.animation = "processingShadow 1s infinite alternate";
                        oDivProcess.style.zIndex = 20;
                        white.style.display = "block";
                        oDivProcess.onclick = function() {
                            window.location.replace("hatching.php?output=" + output + "&choice="+data[0] + "," + data[1]);
                        }
                    }
                }
            }
            for (var i = 0; i<oRadio.length; i++) {
                oRadio[i].checked = false;
            }
        }
    }
};

