$(document).ready(function() {
    $('#submit-button').on('click', postData);

    getData();

});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#animalForm').serializeArray(), function(i, field) {
        values[field.name] = field.value;
        values.qty = randomNumber(1, 100);
        //I would make this equal to the random number from the module if I could get it!
    });

    //clear out form
    $('#animalForm').find('input[type=text]').val('');

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/animals',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/animals',
        success: function(data) {
            console.log(data);
            $('.output-container').empty();
            appendDom(data);
        }
    });
}

function appendDom(animalData){
      $('.results').empty();
  for(var i=0; i < animalData.length; i++){
    $('.results').append('<div class="eachAnimal"><div>');
    var $el = $('.eachAnimal').children().last();
  $el.append('<p>' + animalData[i].animal_type + ', ' + animalData[i].qty + '<p>');
  }
}


//get a random number here for now to keep going...
function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min); }


// //get the random number from module
// //TODO TODO not working, will come back to it TODO
// function getRandomNumber() {
//   $.ajax( {
//     type: "GET",
//     url: "/theNumber",
//     success: function(data){
//       console.log(data);
//     }
//   });
// }
//
// getRandomNumber();
