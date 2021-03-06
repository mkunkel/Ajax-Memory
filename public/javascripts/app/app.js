$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('.parentRow:not(:nth-of-type(1)), #game').hide();
  $('#loginButton').on('click', clickLogin);
  $('#registerButton').on('click', clickRegister);
  $('#loginForm').on('submit', submitLogin);
  $('#registerForm').on('submit', submitRegister);
  $('#gameForm').on('submit', submitGame);
  $('#game').on('click', '.card:not(.guess, .correct)', clickCard);
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//----------AJAX-FUNCTIONS-----------------------------------------------------


function submitAjaxForm(event, form, fn) {
  // debugger;
  console.log(event);
  console.log(form);
  var url = $(form).attr('action');
  var data = $(form).serialize();

  var options = {};
  options.url = url;
  options.type = 'POST';
  options.data = data;
  console.log('data = ' + options.data);
  options.success = function(data, status, jqXHR){
    console.log('success');
    fn(data, form);
  };
  options.error = function(jqXHR, status, error){
    console.log(error);
  };
  $.ajax(options);

  event.preventDefault();

}

function sendGenericAjaxRequest(url, data, verb, altVerb, event, fn, form){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = function(data, status, jqXHR){
    fn(data, form);
  };
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb;
  $.ajax(options);
  if(event) event.preventDefault();
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//----------HANDLERS-----------------------------------------------------------

function clickLogin(event) {
  sendGenericAjaxRequest('/player/list', {}, 'POST', null, event, populateUsers, this);
  hideParentRow(this);
  showParentRow('#loginForm');
}
function clickRegister(event) {
  hideParentRow(this);
  showParentRow('#registerForm');
}

function submitLogin(event) {
  // $('#loginPwd').val(sha3($('#loginPwd').val()));
  submitAjaxForm(event, this, showGameForm);
}

function submitRegister(event) {
  // $('#registerPwd').val(sha3($('#registerPwd').val()));
  // debugger;
  submitAjaxForm(event, this, showGameForm);
}

function submitGame(event) {
  console.log('submitGame');

  submitAjaxForm(event, this, startGame);

}

function clickCard(event) {
  var index = $(this).data('position');
  console.log('click card ' + index);
  sendGenericAjaxRequest('/card/' + index, {id: $('#game').data('id')}, 'POST', null, event, receiveCard, this);
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//----------VIEW-FUNCTIONS-----------------------------------------------------

function hideParentRow(element) {
  $(element).closest('.parentRow').hide();
}

function showParentRow(element) {
  $(element).closest('.parentRow').fadeIn();
  if ($('input[type=text]').length) {
    $('input[type=text]:nth-of-type(1)').focus();
  }
}

function showGameForm(data, form) {
  hideParentRow(form);
  console.log('Data = ' + data);
  $('#gameForm input[name=player]').val(data._id);
  showParentRow('#gameForm');
}

function receiveCard(data, card) {
  if ($('.guess').length === 1) {
    //second guess, flip card and check for match

    $(card).addClass('guess').text(data.number);
    if ($($('.guess')[0]).text() === $($('.guess')[1]).text()) {
      $('.guess').addClass('correct').removeClass('guess');
    }
  } else {
    // either very first guess or first guess on new set
    // remove text from guesses, hide all guessed cards, flip new card
    $('.guess').text('');
    $('.card').removeClass('guess');
    $(card).addClass('guess').text(data.number);
  }
}

function populateCards(squares) {
  for (var i = 0; i < squares * 2; i++) {
    $('#game').append($('<div>').addClass('card').data('position', i));
  }
}

function populateUsers(users, form) {
  for (var i = 0; i < users.length; i++) {
    $('#userSelect').append($('<option>').val(users[i]._id).text(users[i].name));
  }
}

function startGame(data, form) {
  hideParentRow(form);
  $('#game').data('id', data._id).show();
  populateCards(data.numSquares);
}
