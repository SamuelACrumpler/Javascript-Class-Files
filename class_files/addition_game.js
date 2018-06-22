// JavaScript Document
var questionsRight = 0;
var questionsWrong = 0;
var first;
var second;
var answer;
var input;

function randAddQuestion (){//randAddQuestion Start
   
//accept user input   
input = document.getElementById("calcAnswer").value;
//Then check if the input is correct or not
if (input == answer) {
   //If correct, add a point to the user's score
   window.alert("You got it right!");
   questionsRight += 1;
} 
else if (input == "" || input == undefined || input == NaN){
  window.alert("Please enter an answer!");
  return
}
else if (input != answer) {
   //If wrong add a point to the user's wrong score
   window.alert("Sorry. Wrong answer!");
   questionsWrong += 1;
}

// Declare Variables and assign them random number
first = Math.floor((Math.random() * 10) + 1);
second = Math.floor((Math.random() * 10) + 1);
answer = first + second;

// Push random numbers to html elements
document.getElementById("firstNumber").value = first;
document.getElementById("secondNumber").value = second;
document.getElementById("calcAnswer").value = "";
}

function resetInput(){
   //clear and reset the game back to the normal state
   first = Math.floor((Math.random() * 10) + 1);
   second = Math.floor((Math.random() * 10) + 1);
   answer = first + second;
   document.getElementById("calcAnswer").value = "";
   questionsRight = 0;
   questionsWrong = 0;
}

function scoreRequest(){
  window.alert("You got this many problems right: " + questionsRight + "\n you got this many problems wrong: " + questionsWrong);
}
