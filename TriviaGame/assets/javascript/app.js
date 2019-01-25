var number = setInterval(countDown, 1000);

var seconds = 5;

$("#timer").text(seconds);

function countDown() {
    $("#timer").text(seconds);
    seconds--;
    if (seconds <= 0) {
        clearInterval(number);
        $("#timer").text("Time's up! Next question...");
        $("#choices").children().unbind();
        seconds = 2;
        Host.position++;
        number = setInterval(awaitingQuestion, 1000);
    }
}

function awaitingQuestion() {
    seconds--;
    //$("#timer").text(seconds);
    if (seconds <= 0) {
        clearInterval(number);
        Host.next();
        if (Host.position < Host.theTest.length) {
            seconds = 5;
            number = setInterval(countDown, 1000);
        }
    }
}

function MultiChoice(question, choices, answer) {
    this.question = question;
    this.choices  = choices;
    this.answer   = answer;
    this.show     = function() {
        $("#questions").text(this.question);
        $("#choices").html("");
        for (i in choices) {
            $("#choices").append(   "<button type='button' class='btn btn-outline-primary' id='choice" + i +
                                    "' value='" + i +
                                    "'>" + 
                                    choices[i] +
                                    "</button>");
            var buttonID = "#choice" + i;
            $(buttonID).click(function() {
                clearInterval(number);
                $("#choices").children().unbind();
                seconds = 2;
                var myAnswer = $(this).attr("value");
                if (myAnswer == answer) {
                    $("#timer").text("You answered wisely.  Next question...");
                    Host.score++;
                } else {
                    $("#timer").text("You answered poorly.  Next question...");
                }
                Host.position++;
                number = setInterval(awaitingQuestion, 1000);
                //Host.next();

            });
        }
    }
}

var Host = {
    score: 0,
    position: 0,
    theTest:  [ new MultiChoice("What is 2 + 2?", ["Uhhh", "What?", "I dunno", "4"], 3),
                new MultiChoice("What color is the sky?", ["Something", "Blue", "Nothing", "Some color"], 1),
                new MultiChoice("What is the capitol of France?", ["Prussia", "Paris", "The Indian Ocean", "Gaul"], 1),
                new MultiChoice("What is the most commonly spoken language in China?", ["Mandarin", "Chinese", "Cantonese", "Shanghainese"], 0),
                new MultiChoice("Where in the world is Carmen Sandiego?", ["San Diego", "San Francisco", "Not enough information", "San Jose"], 2),
                new MultiChoice("Who is John Galt?", ["Some guy", "Frodo Baggins", "Doctor Who", "A character in Ayn Rand's 'Atlas Shrugged'"], 3)],
    next: function() {
        if (this.position >= this.theTest.length) {
            clearInterval(number);
            console.log(number);
            $("#timer").text("");
            $("#questions").text("End of quiz\nScore: " + this.score);
            $("#choices").html("");
        } else {
            this.theTest[this.position].show();
        }

    }
}

Host.next();