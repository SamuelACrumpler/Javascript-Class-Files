var doctors = [
  'smith',
  'jones',
  'adams',
  'james'
];

locaStorage.doctors = JSON.stringify(doctors);
var html5docs = JSON.parse(localStorage.doctors);
alert ('there are ' + html5docs.length + 'doctor in the house');