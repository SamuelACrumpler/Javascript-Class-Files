//Randomized addition


function randAdd (){
// Declare Variables and assign them random numbers
var first = Math.floor((Math.random() * 10) + 1);
var second = Math.floor((Math.random() * 10) + 1);
var answer = first + second;


// Push random numbers to html elements

document.getElementById("firstNumber").value = first;
document.getElementById("secondNumber").value = second;

// Add and push the final added number to a html element

document.getElementById("calcAnswer").value = answer;
}//randAdd end

function clearInput(){
   //Clear all input boxes
   document.getElementById("firstNumber").value = "";
   document.getElementById("secondNumber").value = "";
   document.getElementById("calcAnswer").value = "";
}//clearInput end
