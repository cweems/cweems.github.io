var firstNameLength = firstNames.length;
var lastNamesLength = lastNames.length;

// Generate Initial List
var searchTypesArray = [
  {key: "ssn", fullName: "Social Security Number", className: "ssn", score: 5},
  {key: "ln", fullName: "Last Name", className: "last-name", score: 4},
  {key: "fn", fullName: "First Name", className: "first-name", score: 3},
  {key: "adr", fullName: "Addresss", className: "address", score: 2},
  {key: "aid", fullName: "Agency Identifier", className: "agency-id", score: 1}
];

var renderList = function(searchTypesArray){
  $('.search-options').empty();
  for(var item in searchTypesArray) {
    $('.search-options').append('<li id=' + searchTypesArray[item]['className'] + '>' + searchTypesArray[item]['fullName'] + '</li>');
  }
};

renderList(searchTypesArray);

// Highlight search option in green if we're 100% sure
var changeSelected = function(idName){
  console.log($('li'));
  $('li').removeClass('confirmed');
  $('#' + idName).addClass('confirmed');
};

var updateList = function(key, score){
  // Update Score
  for (var data in searchTypesArray) {
    if(key === searchTypesArray[data]['key']){
      searchTypesArray[data]['score'] = score;
    }
  }

  function compare(a, b) {
    if (a.score > b.score)
      return -1;
    else if (a.score < b.score)
      return 1;
    else
      return 0;
  }

  searchTypesArray.sort(compare);
  renderList(searchTypesArray);
  console.log(searchTypesArray);

};

// Classify on each Keyup
var isNumber = function(bool){
  if (bool === true) {
    updateList('ssn', 50);
    updateList('adr', 50);
    updateList('aid', 50);

    updateList('fn', 0);
    updateList('ln', 0);
  } else {
    updateList('fn', 50);
    updateList('ln', 50);

    updateList('ssn', 0);
    updateList('adr', 0);
    updateList('aid', 0);
  }
};

$('#main').keyup(function(){
  var value = $('#main').val();
  var firstCharacter = value[0];

  //Is First digit a number?
  var firstDigitAsNumber = Number(firstCharacter);
  if(isNaN(firstDigitAsNumber)) {
    isNumber(false);

    capitalizedValue = value.toUpperCase();

    //Check First Name
    var firstNameCounter = 0;
    for (var i in firstNames){
      if(firstNames[i].indexOf(capitalizedValue) === 0){
        firstNameCounter++;
      }
    }
    if(firstNames.indexOf(capitalizedValue) != -1){
      changeSelected('first-name');
    }
    var firstNameMatchPercent = (firstNameCounter/firstNameLength) * 100;
    console.log("Matching First Names: " + firstNameMatchPercent);

    //Check Last Name
    var lastNameCounter = 0;
    for (var j in lastNames){
      if(lastNames[j].indexOf(capitalizedValue) === 0){
        lastNameCounter++;
      }
    }
    if(lastNames.indexOf(capitalizedValue) != -1){
      changeSelected('last-name');
    }
    var lastNameMatchPercent = (lastNameCounter/lastNamesLength) * 100;
    console.log("Matching Last Names: " + lastNameMatchPercent);

  } else {
    isNumber(true);
    //Check if SSN

    if(parseInt(firstCharacter) === 0) {
      changeSelected('ssn');
    } else if(/^\d{3}[-]+/.test(value) === true) {
      changeSelected('ssn');
    }

    //Check if Address
    else if(/\d{1,5} /.test(value) === true){
      changeSelected('address');
    }

    //Check if Agency ID
    else if(/\d{6,}/.test(value) === true){
      changeSelected('agency-id');
    } else {
      changeSelected('');
    }
  }
});
