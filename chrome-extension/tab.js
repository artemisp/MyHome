var data = {
  "users":
  {
    "artemis":{
    "password": "1234",
      "text": "hello",
      "background": "http://www.allwhitebackground.com/images/2/2273.jpg"
  },

    "poly":{
      "password": "123",
      "text": "mama",
      "background": "https://hdwallsource.com/img/2014/4/background-wallpaper-22928-23564-hd-wallpapers.jpg"
    }
  }
};
/*********************************************************************************************************************/
$(function updateClock(){
  var currentTime = new Date(),
      currentHours = currentTime.getHours(),
      currentMinutes = ('0'+currentTime.getMinutes()).slice(-2);
      $("#clock").html(currentHours + ':' + currentMinutes);
});


var isAuthenticated = false;
var currUser = null;
var background = '';


$(function authentication() {
  if (isAuthenticated) {
    $('#noteText').val(data.users[username]['text']);
    $('#body').css({background: 'url(' + data.users[username]['background'] + ')'});
  }
});


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
  var username = $('#username').val();
  var password = $('#password').val();
  var text = $('#noteText').val();
  $.ajax({
    url: 'http://localhost:3000/register',
    data: {username: username, password: password},
    type: 'POST',
    success: function (data) {
      if (data.isValid) {
        console.log('New user registered.');
      } else {
        showSignupError();
      }
    }
  })

    /*if (username && password) {
      data.users[username] = {
        "password": password,
        "text": text
      };
      isAuthenticated = true;
    } else {
      username = null;
      $('#signupErr').css({display: 'block'});
    }*/
  });


  $('#signInBtn').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({
      url: '/login',
      data: {username: username, password: password},
      type: 'POST',
      success: function (data) {
        if (data.isValid) {
          //TODO: update data instead
          currUser = username;
          isAuthenticated = true;
          console.log('User signed in.');
        } else {
          showAuthError();
        }
      }

    })


    /*var user_obj = data.users[username];
    if (user_obj && user_obj['password'] === password) {
      isAuthenticated = true;
      $('#noteText').val(user_obj['text']);
      $('#body').css({background: 'url('+data.users[username]['background']+')'});
    } else {
      username = null;
      $('#authErr').css({display: 'block'});
    }*/

  });

  $('#signOutBtn').click(function () {
    //update user
    $.ajax({
      url: '/logout',
      data: {username: currUser, background: background, notes: $('#noteText').val()},
      type: 'POST'
    });

    $('#noteText').val('');
    $('#body').css({background: 'url()'});
    currUser = null;
    isAuthenticated = false;
  });


  var showAuthError = function () {
    $('#authErr').css({display: 'block'});
  };

  var showSignupError = function () {
    $('#signupErr').css({display: 'block'});
  };


  $('#backgroundBtn').click(function () {
    $('#background-url').val('');
    var $popup = $('#background-popup');
    if ($popup.css('display') === 'none') $popup.css({display: 'block'});
    else if ($popup.css('display') === 'block') $popup.css({display: 'none'});
  });

  $('#uploadBtn').click(function () {
    var url = $('#background-url').val();
    if (url) {
      background = 'url(' + url + ')';
      $('#body').css({background: 'url(' + url + ')'});

      if (isAuthenticated) {
        //post an update user request
      }
    }

  });

