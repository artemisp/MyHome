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
    $('#body').css({background: 'url('+data.users[username]['background']+')'});
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

  $('#backgroundBtn').click(function () {
    $('#background-url').val('');
    var $popup = $('#background-popup');
    if ($popup.css('display') === 'none') $popup.css({display : 'block'});
    else if ($popup.css('display') === 'block') $popup.css({display : 'none'});
  });

  $('#uploadBtn').click(function () {
    var url = $('#background-url').val();
    if (url) {
      $('#body').css({background: 'url('+url+')'});

      if (isAuthenticated) {
        data.users[username]['background'] = url;
      }
    }

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
    $('#body').css({background: 'url('+data.users[username]['background']+')'});
  } else {
    username = null;
    $('#authErr').css({display: 'block'});
  }
});

  $('#signOutBtn').click(function () {
    data.users[username]['text'] = $('#noteText').val();
    $('#noteText').val('');
    $('#body').css({background: 'url()'});
    username = null;
    isAuthenticated = false;
  });

});

