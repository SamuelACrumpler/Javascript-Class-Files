//Used variables
var idnum;
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
  
  document.getElementById("dfname").value = userObject.fname;
  document.getElementById("dlname").value = userObject.lname;
  document.getElementById("dpnumber").value = userObject.pnumber;
  document.getElementById("daddress").value = userObject.address;
}