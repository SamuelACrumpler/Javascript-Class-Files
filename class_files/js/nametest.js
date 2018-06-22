// add local display
if(window.localStorage) {
  localStorage.setItem("name1", "NoFace");
  localStorage.setItem("name2", "Someface");
  var name1 = localStorage.getItem("name1");
  var name2 = localStorage.getItem("name2");
  alert("Your name is : " + name1 );
  alert("Your name is also : " + name2);
}
else {
  alert("You ain't got no local storage");
}