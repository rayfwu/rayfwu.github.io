$(document).ready(function(){

    function Character(pChar, pColor, pHP, hitPoints, attackPower, counterAttackPower) {
        // pointers to access html elements
        this.pChar       = pChar,
        this.pColor      = pColor,
        this.pHP         = pHP,
        this.pID         = pChar.attr('id'),

        // variables for each character's attributes
        this.hitPoints          = hitPoints,
        this.attackPower        = attackPower,
        this.levelUp            = attackPower,
        this.counterAttackPower = counterAttackPower,

        this.updateHP = function() {
            this.pHP.text(this.hitPoints);
        }

        this.updateHP();

        // functions to move character to other locations
        this.enemySelect = function() {
            pChar.appendTo("#enemy-area");
            pColor.removeClass("bg-white");
            pColor.removeClass("bg-dark");
            pColor.addClass("bg-danger");
        }

        this.enemyFight = function() {
            pChar.appendTo("#defender-area");
            pChar.addClass("text-light");
            pColor.removeClass("bg-white");
            pColor.removeClass("bg-danger");
            pColor.addClass("bg-dark");
        }
    }

    var kenobi    = new Character($("#btn-kenobi"), $("#btn-kenobi-back"), $("#kenobi-hp"), 120, 8, 6);
    var skywalker = new Character($("#btn-skywalker"), $("#btn-skywalker-back"), $("#skywalker-hp"), 100, 10, 5);
    var sidious   = new Character($("#btn-sidious"), $("#btn-sidious-back"), $("#sidious-hp"), 150, 8, 20);
    var maul      = new Character($("#btn-maul"), $("#btn-maul-back"), $("#maul-hp"), 180, 3, 25);

    var players = [kenobi, skywalker, sidious, maul];

    var score = 0;

    var PlayerSelect = {
        // Present a bunch of characters to choose from
        // First set an onclick listener to each of them.
        // When the player clicks, move the other characters to the enemy area.
        // Remove the listeners and then set new listeners to the enemy characters.

        thePlayer: "",
        select: function(thePlayer, players) {
            this.thePlayer = thePlayer;
            for (let i = 0; i < players.length; i++) {
                players[i].pChar.off();
                if (thePlayer != players[i]) {
                    players[i].enemySelect();
                    players[i].pChar.click(function() {
                        for (let j = 0; j < players.length; j++) {
                            players[j].pChar.off();
                        }
                        Fight.clash(thePlayer, players[i], players);
                    })
                }
            }
        }
    }

    var Fight = {
        clash: function(thePlayer, theEnemy, players) {
            theEnemy.enemyFight();
            $("#fightBtn").click(function() {
                $("#actions").text("");
                theEnemy.hitPoints -= thePlayer.attackPower;
                theEnemy.updateHP();
                $("#actions").append("<p>You attacked for " + thePlayer.attackPower + " damage.</p>");
                thePlayer.attackPower += thePlayer.levelUp;
                if (theEnemy.hitPoints <= 0) {
                    score++;
                    if (score >= players.length-1) {
                        $("#actions").html("<p>You won!...GAME OVER</p>");
                        $("#fightBtn").off();
                    } else {
                        $("#actions").html("<p>The enemy has been defeated, choose another enemy</p>");
                        theEnemy.pChar.hide();
                        $("#fightBtn").off();
                        PlayerSelect.select(thePlayer, players);
                    }
                } else {
                    thePlayer.hitPoints -= theEnemy.counterAttackPower;
                    thePlayer.updateHP();
                    if (thePlayer.hitPoints <=0) {
                        $("#actions").html("<p>You've been defeated...GAME OVER</p>");
                        $("#fightBtn").off();
                    } else {
                        $("#actions").append("<p>The enemy counterattacked with " + theEnemy.counterAttackPower + " damage.</p>");
                    }
                }
            })
        }
    }

    for (let i = 0; i < players.length; i++) {
        players[i].pChar.click(function() {
            PlayerSelect.select(players[i], players);
            console.log("click");
        })
    }
});