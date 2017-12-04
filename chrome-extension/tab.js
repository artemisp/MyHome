$(function updateClock(){
  var currentTime = new Date(),
      currentHours = currentTime.getHours(),
      currentMinutes = ('0'+currentTime.getMinutes()).slice(-2);
      $("#clock").html(currentHours + ':' + currentMinutes);
});


var isAuthenticated = false;
var currUser = null;
var url = '';


$.ajax({
  url: 'http://localhost:3000/',
  type: 'GET',
  success: function (res) {
    if (res.isValid) {
      isAuthenticated = true;
      currUser = res.username;
      url = res.background;

      $('#noteText').val(res.notes);
      $('#body').css({background: 'url('+url+')'});

      if (res.wN) {
        console.log(res.wN)
        $('#notes').css({display: 'block'});
        $('#notepadSelector').attr('checked', true);
      }
      else {
        $('#notes').css({display: 'none'});
        $('#notepadSelectorSelector').attr('checked', false);
      }
      if (res.wTD) {
        $('#todo').css({display: 'block'});
        $('#todoSelector').attr('checked', true);
      }
      else {
        $('#todo').css({display: 'none'});
        $('#todoSelector').attr('checked', false);
      }

    }
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
  else  $popup.css({display : 'none'});
});

$('#signUpBtn').click(function () {
  var username = $('#username').val();
  var password = $('#password').val();
  $.ajax({
    url: 'http://localhost:3000/register',
    data: {username: username, password: password, notes: $('#noteText').val(), background: url,
      wTD: $('#todoSelector').is(':checked'), wN: $('#notepadSelector').is(':checked') },
    type: 'POST',
    success: function (data) {
      if (data.isValid) {
        console.log('New user registered.');
        $('#authentication-popup').css({display: 'none'});
      } else {
        showSignupError();
      }
    }
  })
});


$('#signInBtn').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({
      url: 'http://localhost:3000/login',
      data: {username: username, password: password},
      type: 'POST',
      success: function (data) {
        if (data.isValid) {
          isAuthenticated = true;
          currUser = username;
          url = data.background;
          $('#noteText').val(data.notes);
          $('#body').css({background: 'url('+data.background+')'});
          /*if (res.wN) {
            $('#notes').css({display: 'block'});
            $('#notepadSelector').attr('checked', true);
          }
          else {
            $('#notes').css({display: 'none'});
            $('#notepadSelectorSelector').attr('checked', false);
          }
          if (res.wTD) {
            $('#todo').css({display: 'block'});
            $('#todoSelector').attr('checked', true);
          }
          else {
            $('#todo').css({display: 'none'});
            $('#todoSelector').attr('checked', false);
          }*/

          $('#authentication-popup').css({display: 'none'});
        } else {
          showAuthError();
        }
      }

    })
  });

  $('#signOutBtn').click(function () {
    //update user
    $.ajax({
      url: 'http://localhost:3000/logout',
      data: {username: currUser, background: url, notes: $('#noteText').val(),
        wTD: $('#todoSelector').is(':checked'), wN: $('#notepadSelector').is(':checked')},
      type: 'POST'
    });

    $('#noteText').val('');
    $('#body').css({background: 'url()'});
    $('#todo').css({display: 'block'});
    $('#notes').css({display: 'block'});
    currUser = null;
    url = '';
    isAuthenticated = false;

    $('#authentication-popup').css({display: 'none'});
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

  if ($popup.css('display') === 'none') $popup.css({display : 'block'});
  else  $popup.css({display : 'none'});
});

$('#uploadBtn').click(function () {
  url = $('#background-url').val();
  $('#body').css({background: 'url(' + url + ')'});
  $('#background-popup').css({display: 'none'});
});

$('#widgetsBtn').click(function () {
  var $popup = $('#widgets-popup');

  if ($popup.css('display') === 'none') $popup.css({display : 'block'});
  else  $popup.css({display : 'none'});
});

$('#SubmitWidgetsBtn').click(function () {
  $.ajax({
    url: 'http://localhost:3000/logout',
    data: {username: currUser, background: url, notes: $('#noteText').val(),
      wTD: $('#todoSelector').is(':checked'), wN: $('#notepadSelector').is(':checked')},
    type: 'POST'
  });
  if ($('#notepadSelector').is(':checked')) $('#notes').css({display: 'block'});
  else $('#notes').css({display: 'none'});
  if ($('#todoSelector').is(':checked')) $('#todo').css({display: 'block'});
  else $('#todo').css({display: 'none'});

  $('#widgets-popup').css({display: 'none'});
});




