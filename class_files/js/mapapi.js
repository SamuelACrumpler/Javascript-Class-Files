/*
Map API

Take file. Run a loop for each line of the file (Use two of them to start)

run loop for each line in the file
  split for each line, push into in an array
  
run loop for each line in the array
  split using a comma
  push into object??


Use this loop to place the pins on the map. 

http://stackoverflow.com/questions/21080605/parse-a-text-file-into-an-array

github/funjs/book-source

hack reactor: underscore.js

AIzaSyAHjdydgRU5RpWqoC6Ewiv7_5mEsuqcLkE

content_copy


*/

var parseLines = [];
var lineHold = [];
var finalArray = [];
var ipHold = "";
var latHold = "";
var longHold = "";
var modLoc = {};
var mapMark = {};


var rawFile = new XMLHttpRequest();
rawFile.open("GET", "http://jmkll.net/access_log.txt", false);
rawFile.onreadystatechange = function ()
{
    if(rawFile.readyState === 4)
    {
        if(rawFile.status === 200 || rawFile.status === 0)
        {
            var allText = rawFile.responseText;

            var textLines = allText.split('\n');
            for(i = 0; i < textLines.length; i++)
            {
              console.log(textLines[i]);
              parseLines.push(textLines[i]);
              lineHold = textLines[i].split(",");
              ipHold = lineHold[0];
              latHold = parseFloat(lineHold[1]);
              longHold = parseFloat(lineHold[2]);
              finalArray.push({ip: ipHold, lat: latHold, long: longHold});
            }
            
        }
    }
};
rawFile.send(null);


function initMap() {
        var modLoc = {lat: 37.6391, lng: -120.9969};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: modLoc
        });
        for(i = 0; i < parseLines.length; i++) {
        mapMark = {lat: finalArray[i].lat, lng: finalArray[i].long};
        var marker = new google.maps.Marker({
          position: mapMark,
          map: map
        });
        }
      }

