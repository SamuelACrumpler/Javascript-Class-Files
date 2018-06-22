/**
Problem: Produce time tracker software. The program will track the tasks inputed by the user then evaluate the percentage until goal is complete

solution: Pull data in from specific columns, and take the hours, minutes, and seconds from those fields.
The data should be split using an array, then converted completely into seconds alone.
The function will divide the time spent by the goal time to figure out the percentage of time until the user hits the goal

function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 2;   // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 2)
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (i in data) {
    var row = data[i];
    var emailAddress = row[0];  // First column
    var message = row[1];       // Second column
    var subject = "Sending emails from a Spreadsheet";
    MailApp.sendEmail(emailAddress, subject, message);
  }
}

http://stackoverflow.com/questions/11334296/google-docs-script-set-cell-value
**/
function convertHours(conHours){
  return conHours * 3600;
}

function convertMinutes(conMinutes){
  return conMinutes * 60; 
}

function completeStatus() {
  //Pulls the current sheet
  var sheet = SpreadsheetApp.getActiveSheet();
  //Pull Ranges
  var range = sheet.getRange("B2:C1000");
  var progressRange = sheet.getRange("D2:D1000");
  var data = range.getValues();
  var progressData = range.getValue();
  sheet.setActiveRange(range);
  //variables
   //Variables for the time spent
  var spentBreak = [];
  var spentHours;
  var spentMinutes;
  var spentSeconds;
  var spentSumSeconds;
  //Variables for the goal time
  var goalBreak = [];
  var goalHours;
  var goalMinutes;
  var goalSeconds;
  var goalSumSeconds;
  // variables for converted times
  var spentConHours;
  var spentConMinutes;
  
  var goalConHours;
  var goalConMinutes;
  // variable to hold the completion percentage
  var completePercentage;
  //convert all values into seconds
  //hours
  spentConHours = convertHours(spentHours);
  goalConHours = convertHours(goalHours);
  //Minutes
  spentConMinutes = convertMinutes(spentMinutes);
  goalConMinutes = converMinutes(goalMinutes);
  //Add all the seconds together to convert the time properly
  spentSumSeconds = spentConHours + spentConMinutes + spentSeconds;
  goalSumSeconds = goalConHours + goalConMinutes + goalSeconds;
  // Calculate the percentage relative to the set goal, and how much time was spent on it.
  completePercentage = spentSumSeconds / goalSumSeconds;
  //Rounds up to 1 decimal point
  completePercentage = Math.round(completePercentage* 100) / 100;
  
  
   for (var i in data) {
    var row = data[i];
    var timeSpent = row[0];  // First column
    var timeGoal = row[1];   // Second column
    //Split the times
    spentBreak = timeSpent.split(":");
    spentHours = spentBreak[0];
    spentMinutes = spentBreak[1];
    spentSeconds = spentBreak[2];
     
    goalBreak = timeGoal.split(":");
    goalHours = goalBreak[0];
    goalMinutes = goalBreak[1];
    goalSeconds = goalBreak[2];
     
    spentConHours = convertHours(spentHours);
  goalConHours = convertHours(goalHours);
  //Minutes
  spentConMinutes = convertMinutes(spentMinutes);
  goalConMinutes = converMinutes(goalMinutes);
  //Add all the seconds together to convert the time properly
  spentSumSeconds = spentConHours + spentConMinutes + spentSeconds;
  goalSumSeconds = goalConHours + goalConMinutes + goalSeconds;
  // Calculate the percentage relative to the set goal, and how much time was spent on it.
  completePercentage = spentSumSeconds / goalSumSeconds;
  //Rounds up to 1 decimal point
  completePercentage = Math.round(completePercentage* 100) / 100;
   //concat D + i to push data to the proper space
   // var progRow = progData[i]
     
   var cellConcat = "D" + i+1;
   sheet.getRange(cellConcat).setValue(completePercentage);  
    
     
  }
  
  
}

