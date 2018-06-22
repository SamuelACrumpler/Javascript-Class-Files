//Used variables
var fname;
var lname;
var pnumber;
var address;

function objectUse() {
  //pull data for the javascript object.
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  pnumber = document.getElementById("pnumber").value;
  address = document.getElementById("address").value;
  
  var userObject = {
    'fname' : fname,
    'lname' : lname,
    'pnumber': pnumber,
    'address': address
  };
  
  
   var client = new Dropbox.Client({ key: 'cwjpujgfs4hgavy' });
 
        function doHelloWorld() {
            client.writeFile('user.txt', JSON.stringify(userObject), function (error) {
                if (error) {
                    alert('Error: ' + error);
                } else {
                    alert('File written successfully!');
                }
            });
        }
 
        // Try to complete OAuth flow.
        client.authenticate({ interactive: false }, function (error, client) {
            if (error) {
                alert('Error: ' + error);
            }
        });
 
        if (client.isAuthenticated()) {
            doHelloWorld();
        }
 
        document.getElementById('objectUse').onclick = function () {
            client.authenticate(function (error, client) {
                if (error) {
                    alert('Error: ' + error);
                } else {
                    doHelloWorld();
                }
            });
        };
  
}