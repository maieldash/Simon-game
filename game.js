var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var userChosenColour;
var userClickedPattern = [];
var gameOver = false;
var gameStarted = false;
function animateBtn(btnColor) {
    //alert("animate " + btnColor);
    // animate the button
    $("#" + btnColor).fadeOut(100).fadeIn(100);
    // play sound of the color
    var audio = new Audio("./sounds/" + btnColor + ".mp3");
    audio.play();
}
function disableButtons() {
    $("btn").disabled = true;
    
    setTimeout(function(){
      button.disabled = false
    }, 200 * level);
  }
function nextSequence() {
   // alert("new Level");
    level++;
    $("#level-title").text("Level "+ level);
    var rand = Math.floor(Math.random() * 4);
    //add color to the current sequence
    var nextColor = buttonColours[rand];
    gamePattern.push(nextColor);
    disableButtons();
    displayPattern(0);
}
function displayPattern(x) {
    if (x < level){
        animateBtn(gamePattern[x]);
        setTimeout(() => {
            displayPattern(x + 1);
        }, 200);
    }
}
function gameOver() {
    
    
    

}

$(".btn").on("click", function () {
    if (gameStarted && !gameOver) {
        userChosenColour = $(this).attr('id');
        $(this).addClass("pressed");
        setTimeout(() => {
            $(this).removeClass("pressed");
        }, 50);
        userClickedPattern.push(userChosenColour);
        if (userChosenColour != gamePattern[userClickedPattern.length - 1]) {
            gameOver = true;
            $("#level-title").text("Game Over !");
            animateBtn("wrong");
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over"); 
            }, 200);
        }
        else if (userClickedPattern.length == gamePattern.length) {
            userClickedPattern = [];
            nextSequence();
        }
    }
});




$(document).on("keydown", function () {
    if (!gameStarted || gameOver) {
        gameStarted = true;
        gameOver = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        nextSequence();   
    }    });


