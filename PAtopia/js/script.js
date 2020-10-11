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
var species;
var difficulty;

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

window.onload = function() {
    var oDivWelcome = document.getElementById("welcome-page");
    var oGarner = this.document.getElementById("garner");
    var oDivStrawMan = this.document.getElementById("home-page-strawman");
    var oDivmill = document.getElementById("mill");
    var strawmanTarget = 340;
    var oDivGuide = this.document.getElementById("home-guide");

    if (oGarner) {
       
        oDivStrawMan.timer = null;

        oDivWelcome.onclick = function() {
            oDivWelcome.style.display = 'none';
            move(oDivStrawMan, {"top": strawmanTarget});
        };
        
        var aGuideText = ["Hellooooooo~~~~! Welcome to PAtopia!",
            "My name is Thomas. Now, I'm your guide.",
            "Here is your farm, it's beautiful, right?",
            "But it looks empty now. Let's raise some animals!",
            "If you want to do a research before we start, click the windmill, there are lots of animals' information.",
            "Click the <strong>Barn</strong> to choose an animal. Come on! Let's go!"
        ];
        var index = 0;
        oDivGuide.innerHTML = aGuideText[index++];
    
        setTimeout(function() {
            oDivGuide.style.display = "block";
            
            document.onclick = function () {
                if (index === aGuideText.length) {
                    oGarner.style.filter = "drop-shadow(2px 2px 10px rgb(255, 251, 0))";
                    oGarner.style.animation = "garnershadow 0.5s infinite alternate";
                    oDivmill.style.filter = "drop-shadow(2px 2px 10px rgb(255, 251, 0))";
                    oDivmill.style.animation = "garnershadow 0.5s infinite alternate";
                    oGarner.onclick = function () {
                        window.location.replace("species.php");
                    };
                    oDivmill.onclick = function () {
                        window.location.replace("data.php?output=");
                    };
                    oGarner.style.zIndex = 10;
                    oDivmill.style.zIndex = 10;
                    return;
                }
                oDivGuide.innerHTML = aGuideText[index++];
            }
        }, 3000);
    }
    
    var speciesStrawman = this.document.getElementById("species-page-strawman");
    var oDivSpeciesGuide = this.document.getElementById("species-guide");
    var oDoor = this.document.getElementById("door");
    var oLadder = this.document.getElementById("ladder");

    if (speciesStrawman) {
        speciesStrawman.timer = null;
         
        var aGuideText = [
            "Lalala~ It's me, again! Now we are in the barn, don't know what to do next, right?",
            "Don't worry, I'm here, let me tell you.",
            "You can click the ladder to go to second floor to choose your own animal family and egg.",
            "Or you can click the door to go back to the farm.",
            "Ah! Just remind you, be careful when going up the stairs!",
            "Now, it's your time."
        ];

        var index = 0;

        setTimeout(() => {
            speciesStrawman.style.display = "block";
            move(speciesStrawman, {"top": 400});
            setTimeout(() => {
                oDivSpeciesGuide.innerHTML = aGuideText[index++];
                oDivSpeciesGuide.style.display = "block";
                this.document.onclick = function () {
                    if (index === aGuideText.length) {
                        oDoor.style.filter = "drop-shadow(2px 2px 5px rgb(255, 251, 0))";
                        oDoor.style.animation = "doorshadow 1s infinite alternate";
                        oLadder.style.filter = "drop-shadow(2px 2px 5px rgb(255, 251, 0))";
                        oLadder.style.animation = "doorshadow 1s infinite alternate";
                        oDoor.onclick = function () {
                            window.location.replace("index2.php");
                        };
                        oLadder.onclick = function() {
                            window.location.replace("choose.php");
                        };
                        return;
                    }
                    oDivSpeciesGuide.innerHTML = aGuideText[index++];
                }
            }, 1000);
        }, 500);
    }

    var oChooseStraw = this.document.getElementById("choose-page-strawman");
    var oDivChooseGuide = this.document.getElementById("choose-guide");
    var oDivChooseSpecies = this.document.getElementById("choose-page-species");
    var deer = this.document.getElementById("deer");
    var fox = this.document.getElementById("fox");

    var oDivChooseDifficulty = this.document.getElementById("choose-page-difficulty");
    var gold = this.document.getElementById("gold");
    var silver = this.document.getElementById("silver");
    var copper = this.document.getElementById("copper");
    var title01 = document.getElementById("choose-title01");

    if (oChooseStraw) {
        oChooseStraw.timer = null;
         
        var aGuideText = [
            "Congratulations on entering the nest. Now, I will give you some tips for this part.",
            "Try clicking the shadow of the animal you want to pick. They look black, but they are cute! Believe me! Maybe......?",
            "Then is the eggs, the smaller the easier to hatching. Ha, I know you understand!",
            "My advice is, the BIGGEST one! It's gold! Maybe there is something good inside... hee... hee...",
            "If you want to leave, try clicking the arrow in the upper left corner."
        ];

        var index = 0;

        setTimeout(() => {
            oChooseStraw.style.display = "block";
            move(oChooseStraw, {"top": 450});
            setTimeout(() => {
                oDivChooseGuide.innerHTML = aGuideText[index++];
                oDivChooseGuide.style.display = "block";
                this.document.onclick = function () {
                    if (index === aGuideText.length) {
                        oDivChooseSpecies.style.display = "block";
                        oDivChooseGuide.style.display = "none";
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
                            window.location.replace("question.php?choice="+species+","+difficulty);
                        };
                        silver.onclick = function() {
                            difficulty = 2;
                            window.location.replace("question.php?choice="+species+","+difficulty);
                        };
                        copper.onclick = function() {
                            difficulty = 1;
                            window.location.replace("question.php?choice="+species+","+difficulty);
                        };
                        return;
                    }
                    oDivChooseGuide.innerHTML = aGuideText[index++];
                }
            }, 500);
        }, 500);
    }

    var mark = temp = 0;
    var oBtn = document.getElementById("submit");
    var oDivQuestion = document.getElementById("question");
    var oBulb = document.getElementById("bulb");
    var boardBox = this.document.getElementById("board-box");
    var whiteBoard = this.document.getElementById("white-board");
    var process = document.getElementById("process");
    var oDivProcess = document.getElementById("processing-bar");
    var oDivEnergy = document.getElementById("energy");
    var answerStrawman = this.document.getElementById("answer-page-strawman");
    var answerGuide = this.document.getElementById("answer-guide");
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

        var aGuideText = [
            "Welcome to the quiz.  Don't be afraid！Thomas will give you some tips to help you.",
            "Every time you answer a question, you will get a lightning bolt.",
            "When the battery in the upper right corner is fully charged, you can hatch your eggs.",
            "If you are stuck by the quiz, try clicking the light in the upper left corner to get a hint.",
            "Now, Let's start!"
        ];
        var questions = ["What's the Class of ", "What's the Scientific Name of ", "What's the Taxon Author of "];
        var index = 0;
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

        setTimeout(() => {
            answerStrawman.style.display = "block";
            move(answerStrawman, {"top": 400});
            setTimeout(() => {
                answerGuide.innerHTML = aGuideText[index++];
                answerGuide.style.display = "block";
                this.document.onclick = function () {
                    if (index === aGuideText.length) {
                        answerGuide.style.display = "none";
                        move(answerStrawman, {"top": 1000});
                        setTimeout(() => {
                            answerStrawman.style.display = "none";
                        }, 500);
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
                                            window.location.replace("hatching.php?output=&choice="+data[0] + "," + data[1]);
                                        }
                                    }
                                }
                            }
                            for (var i = 0; i<oRadio.length; i++) {
                                oRadio[i].checked = false;
                            }
                        }
                    } else if (index < aGuideText.length) {
                        answerGuide.innerHTML = aGuideText[index++];
                        if (index === 2) {
                            oBulb.style.animation = "sway 2s linear 1,doorshadow 1s 2 alternate";
                        }
                        if (index === 3) {
                            oDivEnergy.style.opacity = 1;
                            setTimeout(() => {
                                oDivEnergy.style.opacity = 0
                            }, 2000);
                        }
                        if (index === 4) {
                            oDivProcess.style.animation = "silverEggShadow 1s 2 alternate";
                        }
                    }
                }
            }, 1000);
        }, 1000);
    }

    var hatchingAni = document.getElementById("hatching-part");
    if (hatchingAni) {
        var outputGIF, outputPNG, discribe;
        switch (userChoices) {
            case "fallow deer,1":
                outputGIF = "fallow-deer-copper.gif";
                outputPNG = "fallow-deer-copper.png";
                discribe = "copper-fallow-deer";
                break;
            case "fallow deer,2":
                outputGIF = "fallow-deer-silver.gif";
                outputPNG = "fallow-deer-silver.png";
                discribe = "silver-fallow-deer";
                break;
            case "fallow deer,3":
                outputGIF = "fallow-deer-gold.gif";
                outputPNG = "fallow-deer-gold.png";
                discribe = "gold-fallow-deer";
                break;
            case "red fox,1":
                outputGIF = "red-fox-copper.gif";
                outputPNG = "red-fox-copper.png";
                discribe = "copper-red-fox";
                break;
            case "red fox,2":
                outputGIF = "red-fox-silver.gif";
                outputPNG = "red-fox-silver.png";
                discribe = "silver-red-fox";
                break;
            case "red fox,3":
                outputGIF = "red-fox-gold.gif";
                outputPNG = "red-fox-gold.png";
                discribe = "gold-red-fox";
                break;
            default :
                outputGIF = "red-fox-copper.gif";
                outputPNG = "red-fox-copper.png";
                discribe = "copper-red-fox";
        }

        var aImg = document.createElement("img");
        aImg.src = "images/" + outputGIF;
        hatchingAni.appendChild(aImg);

        var outputs = output.split(",");
        outputPNG = "images/"+outputPNG;
        outputs.push(outputPNG);
        setTimeout(function () {
            window.location.replace("index2.php?output=" + outputs);
        }, 6000);
    }
};