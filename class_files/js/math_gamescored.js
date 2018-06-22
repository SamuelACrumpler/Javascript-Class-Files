// JavaScript Document
var questionsRight = 0;
var questionsWrong = 0;
var first;
var second;
var answer;
var input;
var randOperator;
var operatorSign;
var blnZeroCheck;
// Arrays declared
var ScoreNames = ["NoName", "NoName", "NoName", "NoName", "NoName"];
var ScoreValues = [0,0,0,0,0];

if(window.localStorage) {
 if (localStorage.rightAnswer || localStorage.wrongAnswer)
 {
   alert("Your score was saved");
 }
 else
 {
   localStorage.setItem("rightAnswer", 0);
   localStorage.setItem("wrongAnswer", 0);
 }

}
else {
  alert("You ain't got no local storage");
}

// Function that is used multiple times throughout the program
function StartProblem(){
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
}

function refreshBoxes(){
  document.getElementById("firstNumber").value = first;
  document.getElementById("operatorSign").value = operatorSign;
  document.getElementById("secondNumber").value = second;
  document.getElementById("calcAnswer").value = "";
}

function firstRun(){
  StartProblem();
  refreshBoxes();
}

function randMathQuestion (){//randAddQuestion Start
   
//accept user input   
input = document.getElementById("calcAnswer").value;
//Then check if the input is correct or not
if (input == answer) {
   //If correct, add a point to the user's score
   window.alert("You got it right!");
   localStorage.rightAnswer = Number(localStorage.rightAnswer) + 1;
} 
else if (input === "" || input === undefined || true === isNaN(input)){
  window.alert("Please enter an answer!");
  return;
}
else if (input !== answer) {
   //If wrong add a point to the user's wrong score
   window.alert("Sorry. Wrong answer!");
   localStorage.wrongAnswer = Number(localStorage.wrongAnswer) + 1;
}

// Declare Variables and assign them random number
StartProblem();

// Push random numbers to html elements
refreshBoxes();
}

function resetInput(){
   //clear and reset the game back to the normal state
   StartProblem();
   localStorage.rightAnswer = 0;
   localStorage.wrongAnswer = 0;
   refreshBoxes();
}

function scoreRequest(){
  window.alert("You got this many problems right: " + localStorage.rightAnswer + "\n you got this many problems wrong: " + localStorage.wrongAnswer);
}

function insertHighScore() {
  //Check if the high scores exist
 if(window.localStorage.name_1){
 // Check if there are zeros in the list.
  for (i = 1; i < 7; i++) {
      if (localStorage['score_' + i] == 0) {
        localStorage['name_' + i] = document.getElementById("userName").value;
        localStorage['score_' + i] = localStorage.rightAnswer;
        break;
      }
      else if (i == 6){
      blnZeroCheck = true;
      break;
      }
    }// Zero Check loop end.
    if (blnZeroCheck == true){
      for (i = 5; i > 0 ; i--) {
        console.log(i);
        if (localStorage.rightAnswer > localStorage['score_' + i])
        {
          for (q = 1; q < i+1 ; q++ ){
            //replaces all values in the array beneath the desired result
            localStorage['name_' + (q-1)] = localStorage['name_' + q];
            localStorage['score_' + (q-1)] = localStorage['score_' + q];
            console.log(q);
          }
        //Enter the player score in the proper place.
        localStorage['name_' + i] = document.getElementById("userName").value;
        localStorage['score_' + i] = localStorage.rightAnswer;
        break;
          
        }
      }// Score Replace Loop
    }// ZeroCheck Boolean
  }// Check if localStorage.name exists
  //Else Populate High Score with Empty Values
  else 
  {
    localStorage.name_1 = document.getElementById("userName").value;
    localStorage.score_1 = localStorage.rightAnswer;
    for (i = 2; i < 6; i++) 
    {
      localStorage['name_' + i] = "NoName";
       localStorage['score_' + i] = 0;
    }
  }// Else Poplate HighScore with empty values
  //Produce a window to display scores.
  alert("High Scores \n" + 
  localStorage.name_5 + " " + localStorage.score_5 + "\n" +
  localStorage.name_4 + " " + localStorage.score_4 + "\n" +
  localStorage.name_3 + " " + localStorage.score_3 + "\n" +
  localStorage.name_2 + " " + localStorage.score_2 + "\n" +
  localStorage.name_1 + " " + localStorage.score_1 + "\n"
  );
}// InsertHighScore Function

// High Score Tracking
function pullHighScore(){
// Pull Score names and scores
  for (i = 1; i == 5; i++) {
    if(window.localStorage.GetItem("Name_" + i)) {
     ScoreNames[i] = localStorage.GetItem("Name_" + i);
     ScoreValues[i] = localStorage.GetItem("Score_"+ i);
    }
  }
}