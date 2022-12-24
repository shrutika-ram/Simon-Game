var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level=0;
function nextSequence()
{
  userClickedPattern=[];
  level+=1;
  $("#level-title").text("level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function(event)
{
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
  var buttonSound=new Audio("sounds/"+name+".mp3");
  buttonSound.play();
}
function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function ()
  {
    $("#"+currentColour).removeClass("pressed")
  }, 100);
}

$(document).keypress(function ()
{
  if (!started)
  {
    $("#level-title").text("level "+level);
    started=true;
    nextSequence();
  }
});

function checkAnswer(currentLevel)
{
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("success");
    if (userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function ()
      {
        nextSequence();
      },1000);
    }
  }
  else
  {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function ()
    {
      $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart");
    startOver();
  }
}

function startOver()
{
  level=0;
  started=false;
  gamePattern=[];
}
