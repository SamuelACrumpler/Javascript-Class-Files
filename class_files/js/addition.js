//Script for addition

function addition(){
  
   var first = document.getElementById("firstNumber").value;
   var second = document.getElementById("secondNumber").value;
   //parseInt('first');
   //parseInt('second');
   var answer = Number(first) + Number(second);
   
   document.getElementById("calcAnswer").value = answer;
}

function clearInput(){
   
   document.getElementById("firstNumber").value = "";
   document.getElementById("secondNumber").value = "";
   document.getElementById("calcAnswer").value = "";
}