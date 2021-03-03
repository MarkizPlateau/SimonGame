const buttonColours = ["red", "blue", "green", "yellow"];
const wrong = new Audio("sounds/wrong.mp3");

let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;



$(".btn").on("click", function(){

  userClickedPattern.push(this.id);
  playSound(this.id);
  $("#" + this.id).fadeOut(100).fadeIn(100);
  animatePress(this.id);

  if (userClickedPattern.length === gamePattern.length){
    checkAnswer();
  }

});


function nextSequence(){

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  level++
  $("#level-title").text("Level " + level);
}


function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(){
  let answer = true;
  for (let i = 0; i < gamePattern.length; i++){
    if(gamePattern[i] !== userClickedPattern[i]){

        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        wrong.play();
        answer = false;
        startOver();
      }
    }
  if (answer){

    setTimeout(function () {
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  }
}


$(document).on("keypress",function(){
  if (!started){

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;

  }
})

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
