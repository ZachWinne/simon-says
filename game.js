var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;



function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  userClickedPattern = [];

  var randomNumber = Math.floor( Math.random() * 4 )
  var randomChosenColor = buttonColors[randomNumber];
  
  gamePattern.push(randomChosenColor)

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100)

  var soundFile = ("./sounds/" + randomChosenColor + ".mp3")
  playSound(soundFile)
  
}



function playSound(name) {
  var colorSound = new Audio(name)
  colorSound.play()
}



function animatePress(currentColor) {
  $("#" + currentColor).toggleClass("pressed")
   setTimeout( () => {
    $("#" + currentColor).toggleClass("pressed")
   } , 100)
}



function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence()
      }, 1000)
    }
  }
  else {
    var gameOverSound = new Audio("./sounds/wrong.mp3")
    gameOverSound.play()

    $("body").toggleClass("game-over")
    setTimeout( () => {
      $("body").toggleClass("game-over")
    } , 200)

    $("#level-title").text("Game Over, Pres Any Key to Restart");

    startOver()
  }
}



function startOver() {
  started = false
  gamePattern = []
  level = 0
}



$(".btn").on("click", (event) => {
  var userChosenColor = event.currentTarget.id
  userClickedPattern.push(userChosenColor)
  
  var soundFile = ("./sounds/" + userChosenColor + ".mp3")
  playSound(soundFile)

  animatePress(userChosenColor)

  checkAnswer(userClickedPattern.length - 1)
})


$(document).on('keypress', () => {
  if (!started) {
    started = true;
    setTimeout(() => {
      nextSequence()
    }, 1000)
  }
  
})