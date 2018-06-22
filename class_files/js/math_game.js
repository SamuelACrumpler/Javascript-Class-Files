// JavaScript Document
// All variables used
var questionsRight = 0;
var questionsWrong = 0;
var first;
var second;
var answer;
var input;
var randOperator;
var operatorSign;
// Arrays declared
var ScoreNames;
var ScoreValue;

function randMathQuestion (){//randAddQuestion Start
   
//accept user input   
input = document.getElementById("calcAnswer").value;
//Then check if the input is correct or not
if (input == answer) {
   //If correct, add a point to the user's score
   window.alert("You got it right!");
   questionsRight += 1;
} 
else if (input === "" || input === undefined || true === isNaN(input)){
  window.alert("Please enter an answer!");
  return;
}
else if (input != answer) {
   //If wrong add a point to the user's wrong score
   window.alert("Sorry. Wrong answer!");
   questionsWrong += 1;
}

// Declare Variables and assign them random number
first = Math.floor((Math.random() * 10) + 1);
second = Math.floor((Math.random() * 10) + 1);
randOperator = Math.floor((Math.random()*4)+1);
   //Switch Statement that decides the operator.
   switch(randOperator) {
     case 1:
        answer = first + second;
        operatorSign = "+";
        break;
      case 2:
         answer = first - second;
         operatorSign = "-";
         break;
      case 3:
         answer = first * second;
         operatorSign = "x";
         break;
      case 4:
        answer = first / second;
        answer = Math.round(answer);
        operatorSign = "/";
        //Round up to thousandth place
        // Reroll if the second number is divided by zero
        break;
   }

// Push random numbers to html elements
document.getElementById("firstNumber").value = first;
document.getElementById("operatorSign").value = operatorSign;
document.getElementById("secondNumber").value = second;
document.getElementById("calcAnswer").value = "";
}

function resetInput(){
   //clear and reset the game back to the normal state
   first = Math.floor((Math.random() * 10) + 1);
   second = Math.floor((Math.random() * 10) + 1);
   randOperator = Math.floor((Math.random()*4)+1);
   //Switch Statement that decides the operator.
   switch(randOperator) {
     case 1:
        answer = first + second;
        operatorSign = "+";
        break;
      case 2:
         answer = first - second;
         operatorSign = "-";
         break;
      case 3:
         answer = first * second;
         operatorSign = "x";
         break;
      case 4:
        answer = first / second;
        answer = Math.round(answer);
        operatorSign = "/";
        //Round up to thousandth place
        // Reroll if the second number is divided by zero
        break;
   }
   questionsRight = 0;
   questionsWrong = 0;
   document.getElementById("firstNumber").value = first;
   document.getElementById("operatorSign").value = operatorSign;
   document.getElementById("secondNumber").value = second;
   document.getElementById("calcAnswer").value = "";
}

function scoreRequest(){
  window.alert("You got this many problems right: " + questionsRight + "\n you got this many problems wrong: " + questionsWrong);
}

// High Score Tracking
function highScoreRequest(){
// Pull Score names and scores
  for (i = 1; i = 5; i++) {
   ScoreNames[i] = localStorage.GetItem("Name_" + i);
   ScoreValues[i] = localStorage.GetItem("Score_"+ i);
  }
}