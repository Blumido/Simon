var buttonColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function() { 
    if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

function death(){
    $("body").addClass( "game-over" );
    setTimeout(function() {
        $("body").removeClass( "game-over" );
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
 }

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("suceess")
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }else{
        console.log("wrong")
        var audio1 = new Audio("sounds/wrong.mp3");
        audio1.play();  
        death();
    }
}


function nextSequence(){

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() *4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

  }
    
$(document).ready(function () {

    $ (".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);


        checkAnswer(userClickedPattern.length-1);

        function playSound(name) { 
            var audio = new Audio("sounds/" + userChosenColour + ".mp3");
            audio.play();    
         }

         function animatePress(currentColour){
            $("#" + currentColour).addClass( "pressed" );
            setTimeout(function() {
                $("#" + currentColour).removeClass( "pressed" );
            }, 100);
         }




         animatePress(userChosenColour);
         playSound();

        console.log(userClickedPattern);
    

    });

});





