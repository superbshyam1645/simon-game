var level = 0;
var started = false;
$(document).keydown(function(event){
    if (!started)
    {   $("h1").html("level"+level);
    console.log(event.key);
        started = true;
        $("#level-title").text("level "+level);
    nextSequence();}
})

var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").html("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(randomChosenColour) {
    var path = "sounds\\"+randomChosenColour+".mp3";
    var audio = new Audio(path);
    audio.play();
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    if (userClickedPattern.length == level) checkAnswer(level);
    else {
        console.log("Passed1");
        if (userClickedPattern[userClickedPattern.length-1] != gamePattern[userClickedPattern.length-1]) {console.log("Passed2");gameOver();return;}
    }
    playSound(userChosenColour);
    animatePress(userChosenColour);
})

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (equality(gamePattern,userClickedPattern)) winner();
    else gameOver();
}

function winner() {
    userClickedPattern = [];
    setTimeout(nextSequence,1000);
}

function gameOver() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    },200)
    started = false;
    userClickedPattern = [];
    level = 0;
    gamePattern = [];
    $("h1").html("Game Over, Press Any Key to restart");
}

function equality(a,b) {
    for (var i = 0;i<a.length;i++)
    if (a[i] != b[i]) return false;
    return true;
}