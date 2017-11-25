var data = {
  "users":
  {
    "artemis":{
    "password": "1234",
      "text": "hello"
  },

    "poly":{
      "password": "123",
      "text": "mama"
    }
  }
};
/*********************************************************************************************************************/

function updateClock(){
  var currentTime = new Date(),
      currentHours = currentTime.getHours(),
      currentMinutes = ('0'+currentTime.getMinutes()).slice(-2);
  document.getElementById("clock").innerHTML = currentHours + ':' + currentMinutes;
}
updateClock();

$(function authentication() {

  var isAuthenticated = false;
  var username = null;


  if (isAuthenticated) {
    $('#noteText').val(data.users[username]['text']);
  }


  $('#accountBtn').click(function () {
    $('#authErr').css({display: 'none'});
    $('#signupErr').css({display: 'none'});
    $('#username').val('');
    $('#password').val('');
    if (isAuthenticated) {
      $('#username').css({display : 'none'});
      $('#password').css({display : 'none'});
      $('#signInBtn').css({display : 'none'});
      $('#signUpBtn').css({display : 'none'});
      $('#signOutBtn').css({display : 'block'});
    } else {
      $('#username').css({display : 'block'});
      $('#password').css({display : 'block'});
      $('#signInBtn').css({display : 'block'});
      $('#signUpBtn').css({display : 'block'});
      $('#signOutBtn').css({display : 'none'});
    }

    var $popup = $('#authentication-popup');
    if ($popup.css('display') === 'none') $popup.css({display : 'block'});
    else if ($popup.css('display') === 'block') $popup.css({display : 'none'});

  });

  $('#signUpBtn').click(function () {
    username = $('#username').val();
    var password = $('#password').val();
    var text = $('#noteText').val();
    if (username && password) {
      data.users[username] = {
        "password": password,
        "text": text
      };
      isAuthenticated = true;
    } else {
      username = null;
      $('#signupErr').css({display: 'block'});
    }
  });


$('#signInBtn').click(function () {
  username = $('#username').val();
  var password = $('#password').val();

  var user_obj = data.users[username];
  if (user_obj && user_obj['password'] === password) {
    isAuthenticated = true;
    $('#noteText').val(user_obj['text']);
  } else {
    username = null;
    $('#authErr').css({display: 'block'});
  }
});

  $('#signOutBtn').click(function () {
    data.users[username]['text'] = $('#noteText').val();
    $('#noteText').val('');
    username = null;
    isAuthenticated = false;
  });

});

